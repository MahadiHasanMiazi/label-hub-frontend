import "./Navbar.css";
import { useEffect, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import propic from "../../assets/images/profile-picture.svg";
import { currentUser, resetUser } from "../../features/user/userSlice";
import Spinner from "./../Spinner/Spinner";
import { logout, resetAuth } from "../../features/auth/authSlice";
import { roleCheck } from "../../utils/userRoles";

const Navbar = () => {
  const dispatch = useDispatch();
  const { logedinUser, isLoading } = useSelector(
    (state: RootState) => state.user
  );
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);
  const onLogout = () => {
    dispatch(logout());
    dispatch(resetAuth());
    dispatch(resetUser());
  };
  if (isLoading) {
    return <Spinner></Spinner>;
  }


  return (
    <div className="navbar-wrapper">
      <div className="nav-center">
        <div className="btn-container">
          <div className="btn" onClick={() => setShowLogout(!showLogout)}>
            <img src={propic} alt="profile pic" className="user-logo"></img>
            <div className="username-role">
              {logedinUser && <span>{logedinUser?.full_name}</span>}
              <span className="user-role">{roleCheck(logedinUser?.role)}</span>
            </div>
            {showLogout ? <BsChevronUp /> : <BsChevronDown />}
          </div>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button type="button" className="dropdown-btn" onClick={onLogout}>
              <FiLogOut></FiLogOut> logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
