import { Container, Row } from "react-bootstrap";
import { AnottedData } from "../../components/Dashboard/AnottedData/AnottedData";
import { AvailableAnottedData } from "../../components/Dashboard/AvailableAnottedData/AvailableAnottedData";
import { OverviewCard } from "../../components/Dashboard/OverviewCard/OverviewCard";
import "./DashboardOverview.css";

export const DashboardOverview = () => {
  return (
    <section className="dashboard-section">
      
      <Container className="dashboard-overview p-0">
      <h1 className="dashboard-header">Dashboard</h1>
        <Row>
          <OverviewCard
            heading="Projects"
            count={455}
            path="projects"
          ></OverviewCard>
          <OverviewCard heading="Admins" count={5}></OverviewCard>
          <OverviewCard heading="Annotators" count={53}></OverviewCard>
          <OverviewCard heading="Validators" count={523}></OverviewCard>
          <OverviewCard heading="Guest" count={53}></OverviewCard>
        </Row>
        <Row className="py-5"><AvailableAnottedData></AvailableAnottedData></Row>
      </Container>
    </section>
  );
};
