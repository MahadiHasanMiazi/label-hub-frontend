import { NavLink } from "react-router-dom";
import links, { managerLink } from "../../utils/links";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
interface NavLinkProps {
  isOpen: boolean;
}
const NavLinks: React.FC<NavLinkProps> = ({ isOpen }) => {
  const { logedinUser } = useSelector((state: RootState) => state.user);
  let navLinks;
  if (logedinUser.role === 3) {
    navLinks = managerLink;
  } else {
    navLinks = links;
  }
  return (
    <div className="nav-links">
      {navLinks.map((link) => {
        const { text, path, id, icon } = link;
        return (
          <NavLink
            to={path}
            className={({ isActive }) => {
              return isActive
                ? isOpen
                  ? "nav-link active"
                  : "nav-link-smallbar active-smallbar"
                : isOpen
                ? "nav-link"
                : "nav-link-smallbar";
            }}
            key={id}
          >
            <span className="icon">{icon}</span>
            {isOpen && text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
