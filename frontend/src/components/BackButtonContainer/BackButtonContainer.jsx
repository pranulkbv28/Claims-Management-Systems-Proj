import useLogout from "../../hooks/useLogout";
import styles from "./backbuttoncontainer.module.css";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const BackButtonContainer = () => {
  const { logout, loading } = useLogout();

  const handleClick = async (e) => {
    e.preventDefault();
    await logout();
  };

  return (
    <div className={`flex gap-6`}>
      <div className={`${styles.body} p-3`}>
        <IoArrowBackCircleOutline onClick={() => window.history.back()} />
      </div>
      <button
        onClick={handleClick}
        className={`border border-black border-solid p-3`}
      >
        {loading ? "Logging Out" : "Login With a Different Account"}
      </button>
    </div>
  );
};

export default BackButtonContainer;
