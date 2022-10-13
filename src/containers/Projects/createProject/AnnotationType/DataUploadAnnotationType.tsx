import React from "react";

interface AnnotationTypeProps {
  annotationTypes: any;
  selectedTasks: any;
  changeAnnotation: any;
  className?: string;
  isAnnotatedData?: boolean;
  disableTasks?: any;
}

export const DataUploadAnnotationType: React.FC<AnnotationTypeProps> = ({
  annotationTypes,
  selectedTasks,
  changeAnnotation,
  className,
  isAnnotatedData,
  disableTasks,
}) => {
  const handleDisableItem = (name: any) => {
    let isTrue = false;
    disableTasks.map((item: any) => {
      if (name.toLowerCase() === item.toLowerCase()) {
        isTrue = true;
        return true;
      } else {
        return false;
      }
    });
    return isTrue;
  };
  return (
    <>
      <div className={`col-lg ${className}`}>
        <span className="form-label">Annotation Type</span>
        <div className="">
          {annotationTypes.map((annotationType: any, index: number) => {
            const { name, id } = annotationType;
            return (
              <span key={index} className="mx-3 form-check">
                <input
                  className="form-check-input"
                  type={isAnnotatedData ? "radio" : "checkbox"}
                  value={id}
                  name={isAnnotatedData ? "task" : name}
                  onChange={() => changeAnnotation(id)}
                  id={id}
                  disabled={handleDisableItem(name)}
                />
                <label className="form-check-label mx-2" htmlFor={id}>
                  {name}
                </label>
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
};
