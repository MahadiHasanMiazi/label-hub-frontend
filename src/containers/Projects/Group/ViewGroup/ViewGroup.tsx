/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FiDownloadCloud } from "react-icons/fi";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { RootState } from "../../../../app/store";
import { BreadCrumbs } from "../../../../components/BreadCrumbs/BreadCrumbs";
import { ActionButton } from "../../../../components/Button/ActionButton";
import Spinner from "../../../../components/Spinner/Spinner";
import { UserRole } from "../../../../enums/UserRole";
import { unassignNerData } from "../../../../features/nerData/nerDataSlice";
import {
  allGroupOfProject,
  resetGroup,
  viewGroup,
} from "../../../../features/projectGroup/projectGroupSlice";
import {
  getAProject,
  resetProject,
} from "../../../../features/projectList/projectListSlice";
import { AdminNer } from "../../../NerService/AdminNer/AdminNer";
import { AssignNerData } from "./AssignNerData/AssignNerData";
import { ExportGroup } from "./ExportGroup/ExportGroup";
import { MemberInfo } from "./MemberInfo/MemberInfo";
import "./ViewGroup.css";

export const ViewGroup = () => {
  const { isProjectLoading, projectMessage, isProjectError } = useSelector(
    (state: RootState) => state.projectList
  );
  const { groupInformation, groupMessage, isGroupLoading, isGroupError } =
    useSelector((state: RootState) => state.projectGroupList);
  const { unassignedData, isNerError, nerMessage } = useSelector(
    (state: RootState) => state.nerData
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [assignDataShow, setAssignDataShow] = useState(false);
  const [exportDataShow, setExportDataShow] = useState(false);
  const [projectGroupId, setProjectGroupId] = useState<number>();
  const [pageNo, setPageNo] = useState(1);

  const handleShowUploadModal = () => setAssignDataShow(true);
  const handleShowExportModal = () => setExportDataShow(true);
  const { projectId, groupId } = useParams();
  //get group data
  useEffect(() => {
    const groupData = {
      currentProjectId: projectId,
      groupId: groupId,
    };
    dispatch(viewGroup(groupData));
  }, [projectId, groupId]);

  //get unassigned ner data
  useEffect(() => {
    dispatch(unassignNerData(parseInt(projectId)));
  }, [dispatch, projectId]);

  //set project id into state
  const projectIdGroupSet = () => {
    setProjectGroupId(parseInt(projectId));
  };
  //getting a project
  useEffect(() => {
    dispatch(getAProject(parseInt(projectId)));
  }, [dispatch, projectId]);
  //getting all groups of a project
  useEffect(() => {
    const groupPayload = {
      currentProjectId: parseInt(projectId),
      currentPage: pageNo,
    };
    dispatch(allGroupOfProject(groupPayload));
  }, [dispatch, projectId, pageNo]);
  //total page count for pagination
  const crumbsLinks = [
    {
      path: "/dashboard",
      name: "Dashboard",
      active: false,
    },
    {
      path: "/dashboard/projects",
      name: "Projects",
      active: false,
    },
    {
      path: `/dashboard/projects/${projectId}`,
      name: `project-${projectId}`,
      active: false,
    },
    {
      path: `#`,
      name: `${groupInformation?.name}`,
      active: true,
    },
  ];
  const percentageOfAnnotatedData = (assignData: any, annotatedData: any) => {
    return (annotatedData * 100) / assignData;
  };

  //redirect if group not found
  useEffect(() => {
    if (isGroupError) {
      dispatch(resetGroup());
      //return navigate("/dashboard/projects");
    }
  }, [dispatch, groupMessage, isGroupError]);
  //redirect if project not found
  useEffect(() => {
    if (isProjectError) {
      toast.error(projectMessage);
      dispatch(resetProject());
      return navigate("/dashboard/projects");
    }
  }, [dispatch, projectMessage, isGroupError]);

  if (isProjectLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <>
      <AssignNerData
        show={assignDataShow}
        setShow={setAssignDataShow}
        projectId={parseInt(projectId)}
        groupId={parseInt(groupId)}
        unassignedData={unassignedData}
      ></AssignNerData>
      <ExportGroup
        show={exportDataShow}
        setShow={setExportDataShow}
        unassignedData={unassignedData}
      ></ExportGroup>
      <section>
        <section className="project-view-header">
          <BreadCrumbs crumbsLinks={crumbsLinks}></BreadCrumbs>
          <div className="project-header-group">
            <div className="group-heading">
              <h4 className="">{groupInformation?.name}</h4>
              <span className="group-header-status mx-2">Running</span>
            </div>
            <div>
              <ActionButton
                onClick={() => {
                  handleShowUploadModal();
                  projectIdGroupSet();
                }}
                className="assign-data-btn mx-2"
              >
                Assign Data
              </ActionButton>
              <ActionButton
                onClick={() => {
                  handleShowExportModal();
                }}
                className="group-export-btn mx-2"
              >
                <FiDownloadCloud></FiDownloadCloud> Export data
              </ActionButton>
            </div>
          </div>
        </section>
        <section className="py-3">
          <Row>
            <Col xl={8}>
              <div className="creator-details">
                <div className="d-flex justify-content-between">
                  <p className="mr-5 group-info-content">
                    Created by: <span>{groupInformation?.creator_name}</span>
                  </p>
                  <p className="mr-5 group-info-content">
                    Created date:{" "}
                    <span>
                      <Moment format="DD-MM-YYYY">
                        {groupInformation?.created_at}
                      </Moment>{" "}
                    </span>
                  </p>
                  <p className="mr-5 group-info-content">
                    Annotation Type:
                    <span>POS</span>
                  </p>
                </div>
                <div className="d-flex ">
                  <p className="mr-5">
                    Complete Annotation:{" "}
                    <span>
                      {groupInformation?.assigned_data_count}/
                      {groupInformation?.assigned_data_count}
                    </span>
                  </p>

                  <p className="mr-5 group-info-content">
                    Inter Annotator Agreement: <span>0</span>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </section>
        <section className="py-3">
          <h6 className="annotator-validator-section-title ">Annotators</h6>
          <Row>
            <Col lg={10}>
              <div className=" row my-2">
                {groupInformation?.members?.map((member: any) => {
                  return member.role === UserRole.ANNOTATOR ? (
                    <MemberInfo
                      key={member.id}
                      member={member}
                      percentageOfAnnotatedData={percentageOfAnnotatedData}
                    ></MemberInfo>
                  ) : (
                    ""
                  );
                })}
              </div>
            </Col>
          </Row>
          <br />
        </section>
        <section className="py-3">
          <h6 className="annotator-validator-section-title ">Validators</h6>
          <Row>
            <Col lg={10}>
              <div className="group-annotation-with-tags row">
                {groupInformation?.members?.map((member: any) => {
                  return member.role === UserRole.VALIDATOR ? (
                    <MemberInfo key={member.id} member={member}></MemberInfo>
                  ) : (
                    ""
                  );
                })}
              </div>
            </Col>
          </Row>
        </section>
        <section className="py-3">
          <AdminNer></AdminNer>
        </section>
      </section>
    </>
  );
};
