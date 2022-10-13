/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addNewtask } from "../../../../features/projectCreate/projectCreateSlice";

interface AnnotationTypeProps {
  annotationTypes: any;
  tagList: any;
  setTaskNameForTag?: any;
  setTaskTagList?: any;
}

export const AnnotationType: React.FC<AnnotationTypeProps> = ({
  annotationTypes,
  tagList,
  setTaskTagList,
  setTaskNameForTag,
}) => {
  const dispatch = useDispatch();
  const handleEyeClick = (taskid: number): any => {
    if (tagList.length > 0) {
      const { currentTags, name } = tagList.find(
        (annotation: any) => annotation.id === taskid
      );
      setTaskNameForTag(name);
      setTaskTagList(currentTags);
    }
  };
  const handleTaskListChange = (annotationType: any): any => {
    const { id, name, tags } = annotationType;
    dispatch(
      addNewtask({
        id,
        name,
        tags: [],
        currentTags: tags,
      })
    );
  };

  useEffect(() => {
    tagList.length > 0 && setTaskNameForTag(tagList[tagList.length - 1]?.name);
  }, [tagList, setTaskNameForTag]);
  return (
    <>
      <div className="col-lg ">
        <span className="form-label ">Annotation Type</span>
        <div className="create-project-annotation">
          {annotationTypes?.map((annotationType: any) => {
            const { name, id } = annotationType;
            return (
              <span key={id} className="mx-3 form-check">
                <div>
                  {" "}
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={id}
                    onChange={() => {
                      handleTaskListChange(annotationType);
                    }}
                    id={id}
                  />
                  <label className="form-check-label mx-1" htmlFor={id}>
                    {name}
                  </label>
                </div>
                {tagList?.map((singleTask: any) => {
                  if (singleTask.id === id) {
                    return (
                      <span
                        key={singleTask.id}
                        className="eye-icon-task"
                        onClick={() => handleEyeClick(id)}
                      >
                        <AiOutlineEye className="mx-1"></AiOutlineEye>
                      </span>
                    );
                  } return;
                })}
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
};
