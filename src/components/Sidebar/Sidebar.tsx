import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FiAlignJustify } from "react-icons/fi";
import { Link } from "react-router-dom";
import corpus_logo from "../../assets/images/corpus-logo.svg";
import { Image } from "../Image/Image";
import NavLinks from "./NavLinks";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <aside className="sidebar-wrapper">
      <div
        className={
          isOpen ? "sidebar-container show-sidebar" : "small-sidebar-container"
        }
      >
        <div className="content">
          <header>
            {isOpen ? (
              <>
                <Link to="/dashboard">
                  <Image
                    src={corpus_logo}
                    alt="Label Hub"
                    className="sidebar-logo"
                  ></Image>
                </Link>
                <FiAlignJustify
                  className="toggle-icon"
                  onClick={toggle}
                ></FiAlignJustify>
              </>
            ) : (
              <AiOutlineClose
                className="toggle-close"
                onClick={toggle}
              ></AiOutlineClose>
            )}
          </header>
          <NavLinks isOpen={isOpen} />
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
