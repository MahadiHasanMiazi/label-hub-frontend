import { PillBadge } from "../../../components/PillBadge/PillBadge";
import "./ViewUser.css";
import { OverlayTrigger, Row, Tooltip, Col } from "react-bootstrap";
import Moment from "react-moment";
import { ViewUserGroups } from "./ViewUserGroups/ViewUserGroups";
import { useParams } from "react-router-dom";
import Spinner from "../../../components/Spinner/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../app/store";
import { useEffect } from "react";
import { getSingleUser } from "../../../features/userList/userListSlice";
import { statusCheck, roleCheck } from "../../../utils/userRoles";
import { BreadCrumbs } from "../../../components/BreadCrumbs/BreadCrumbs";

export const ViewUser = () => {
  const { singleUser, isLoading } = useSelector(
    (state: RootState) => state.userList
  );
  const dispatch = useDispatch();
  const { userId } = useParams();
  const crumbsLinks = [
    {
      path: "/dashboard",
      name: "Dashboard",
      active: false,
    },
    {
      path: "/users",
      name: "Users",
      active: false,
    },
    {
      path: "#",
      name: `${singleUser.full_name}`,
      active: true,
    },
  ];
  useEffect(() => {
    dispatch(getSingleUser(parseInt(userId)));
  }, [dispatch, userId]);

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <>
      <section>
        <section className="user-view-header">
          <BreadCrumbs crumbsLinks={crumbsLinks}></BreadCrumbs>
          <div className="user-header-group">
            <div className="user-heading">
              <h4 className="mr-2 view-user-title">{singleUser.full_name}</h4>

              <span className=" user-header-status">
                {statusCheck(singleUser.status)}
              </span>
            </div>
          </div>
          <div className="user-email my-2">{singleUser?.email}</div>
        </section>
        <section className="py-3">
          <Row>
            <Col xl={4}>
              <div className="user-details">
                <p>
                  User Type : <span>{roleCheck(singleUser?.role)}</span>
                </p>
                <p>
                  Age:{" "}
                  {singleUser.dob ? (
                    <Moment fromNow ago>
                      {singleUser?.dob}
                    </Moment>
                  ) : (
                    <span>N/A</span>
                  )}
                </p>
                <p>
                  Assigned Project :{" "}
                  <span>{singleUser?.assigned_data_count}</span>
                </p>
                <p>
                  Completed Data :{" "}
                  <span>{singleUser?.validated_data_count}</span>
                </p>
              </div>
            </Col>
            <Col xl={4}>
              <div className="user-details">
                <p>
                  Gender : <span>{singleUser?.gender || "N/A"}</span>
                </p>
                <p>
                  Mobile : <span>{singleUser?.phone_number || "N/A"}</span>
                </p>
                <p>
                  Assigned Group : <span>12</span>
                </p>
              </div>
            </Col>
            <Col xl={4}>
              <div className="user-details">
                <p>
                  On-boarding Date : <span>N/A</span>
                </p>
                <p>
                  Degree : <span>{singleUser?.qualification || "N/A"}</span>
                </p>
                <p>
                  Institutions :{" "}
                  <span>{singleUser?.institution_name || "N/A"}</span>
                </p>
              </div>
            </Col>
          </Row>
        </section>
        <section className="py-3 mx-2">
          <Row>
            <Col>
              <div className="user-annotation-with-tags row">
                {[1].map((annotation: any) => {
                  return (
                    <Col lg={4} key={annotation.id}>
                      <div className="single-annotation-type-tags ">
                        <h6 className="single-annotation-type-title mx-2">
                          Working Tasks
                        </h6>
                        <div className="selected-tags-badge">
                          {[1, 2, 3].map((tag: any) => {
                            return (
                              <PillBadge
                                key={tag}
                                name="NNC"
                                className="mx-2"
                              ></PillBadge>
                            );
                          })}
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </div>
            </Col>
          </Row>
        </section>

        <section className="py-3">
          <h4 className="group-list-heading">Groups</h4>
          <ViewUserGroups></ViewUserGroups>
        </section>
      </section>
    </>
  );
};
