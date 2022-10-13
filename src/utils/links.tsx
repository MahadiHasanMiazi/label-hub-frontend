import { BiUser } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { SiDatabricks } from "react-icons/si";

const links = [
  { id: 1, text: "Dashboard", path: "dashboard", icon: <MdDashboard /> },
  { id: 2, text: "Profile", path: "profile", icon: <BiUser /> },
  { id: 3, text: "Users", path: "users", icon: <HiOutlineUserGroup /> },
  { id: 4, text: "Data", path: "data", icon: <SiDatabricks /> },
  { id: 5, text: "Configuration", path: "profile2", icon: <FiSettings /> },
];
export const managerLink = [
  { id: 1, text: "Dashboard", path: "dashboard", icon: <MdDashboard /> },
  { id: 2, text: "Profile", path: "profile", icon: <FaUser /> },
];
export default links;
