import { Badge, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";

interface SelectedTypeWithTagsProps {
  checkTagByname: any;
}

export const SelectedTypeWithTags: React.FC<SelectedTypeWithTagsProps> = ({
  checkTagByname,
}) => {
  const { tagList } = useSelector((state: RootState) => state.projectCreate);

  return (
    <>
      {tagList.map((task: any, indexNum: number) => {
        return (
          <Col lg={6} key={task.id}>
            <h6 className="selected-annotation-type-title mx-3">
              {indexNum + 1 + ". "}
              {task.name}
            </h6>
            <div className="selected-annotation-type-tags">
              {task.tags.map((tag: number, indexN: any) => {
                return (
                  <span key={indexN}>
                    <Badge
                      className="mx-2 my-1 annotation-tag-badge-selected "
                      bg="none"
                      key={tag}
                    >
                      {checkTagByname(tag)}
                    </Badge>
                  </span>
                );
              })}
            </div>
          </Col>
        );
      })}
    </>
  );
};
