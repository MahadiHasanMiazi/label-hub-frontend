import React from "react";
import { Breadcrumb } from "react-bootstrap";
interface BreadCrumbsProps {
  crumbsLinks: any;
}

export const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ crumbsLinks }) => {
  return (
    <Breadcrumb>
      {crumbsLinks.map((crumb: any, index: number) => {
        return (
          <Breadcrumb.Item href={crumb.path} active={crumb.active} key={index}>
            {crumb.name}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};
