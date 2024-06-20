import styles from "./navbar.module.css";
import LumiqLogo from "../../assets/images/Lumiq.jpg";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className={`${styles.body} flex items-center bg-[#e6e6e6]`}>
      <div className={`w-2/5`}>
        <Link to={"/"}>
          <img className={`w-[30%]`} src={LumiqLogo} alt="logo-img" />
        </Link>
      </div>
      <div className={`flex justify-between items-center w-3/5 px-6`}>
        <div>
          <h1 className={`text-xl`}>Lumiq Claims Management System</h1>
        </div>
        <div className={`flex gap-8`}>
          <Link to={"/login"}>Login</Link>
          <Link to={"/signup"}>Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
