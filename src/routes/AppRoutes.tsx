import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { AllUserList } from "../containers/AllUser/AllUserList";
import { ViewUser } from "../containers/AllUser/ViewUser/ViewUser";
import { DashboardOverview } from "../containers/DashboardOverview/DashboardOverview";
import { ForgetPassword } from "../containers/ForgetPassword/ForgetPassword";
import { LoginForm } from "../containers/login/LoginForm";
import { AnnotatorNer } from "../containers/NerService/AnnotatorNer/AnnotatorNer";
import { UserProfile } from "../containers/Profile/UserProfile";
import { ViewGroup } from "../containers/Projects/Group/ViewGroup/ViewGroup";
import { ProjectList } from "../containers/Projects/ProjectList";
import { ResetPassword } from "../containers/ResetPassword/ResetPassword";
import { SignupForm } from "../containers/Signup/SignupForm";
import { ChangePassword } from "./../containers/ChangePassword/ChangePassword";
import { AdminNer } from "./../containers/NerService/AdminNer/AdminNer";
import { ViewProject } from "./../containers/Projects/viewProject/ViewProject";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        {/* ----------------------- Shared layout -------------------- */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard">
            <Route index element={<DashboardOverview />} />
            <Route path="projects/*" element={<ProjectList />}></Route>
            <Route path="projects/:projectId" element={<ViewProject />}></Route>
            <Route
              path="projects/:projectId/group/:groupId"
              element={<ViewGroup />}
            ></Route>

            <Route path="ner" element={<AnnotatorNer />} />
            <Route path="ner-admin" element={<AdminNer />} />
          </Route>

          <Route index element={<DashboardOverview />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="users" element={<AllUserList></AllUserList>} />
          <Route path="users/:userId" element={<ViewUser></ViewUser>} />
          <Route path="change_password" element={<ChangePassword />} />
        </Route>
        {/* ----------------------- Auth Routes -------------------- */}
        <Route path="/login" element={<LoginForm></LoginForm>} />
        <Route path="/signup" element={<SignupForm></SignupForm>} />
        <Route
          path="/forgot_password"
          element={<ForgetPassword></ForgetPassword>}
        />
        <Route
          path="/reset_password"
          element={<ResetPassword></ResetPassword>}
        />
        <Route path="*" element={<Navigate to="/dashboard" />}></Route>
      </Routes>
    </>
  );
}
