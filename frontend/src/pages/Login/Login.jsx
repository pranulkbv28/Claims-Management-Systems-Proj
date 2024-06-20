import React from "react";
import styles from "./login.module.css";
import { Link, Navigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { useAuthContext } from "../../contexts/AuthContext";

const Login = () => {
  const [inputs, setInputs] = React.useState({
    fullname: "",
    password: "",
  });

  const { loading, login } = useLogin();
  const { authUser } = useAuthContext();

  const submitHandler = async (e) => {
    e.preventDefault();
    await login(inputs);
  };

  // console.log(window.history.back.apply);
  // const prevPage = window.history.back();
  if (authUser) return <Navigate to={"/"} />;

  return (
    <div className={`${styles.body} mt-6`}>
      <h1 className="text-2xl">Login to place your claims</h1>
      <form onSubmit={submitHandler} className="w-1/2 mx-auto mt-4">
        <div className={styles.labelContainer}>
          <label htmlFor="fullname">Enter your fullname: </label>
          <input
            type="text"
            name="fullname"
            id="fullname"
            placeholder="fullname"
            value={inputs.fullname}
            onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })}
          />
        </div>
        <div className={styles.labelContainer}>
          <label htmlFor="fullname">Enter your Password: </label>
          <input
            type="text"
            name="password"
            id="password"
            placeholder="password"
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />
        </div>
        <div className={styles.btnContainer}>
          <button type="submit">{loading ? "Loggin In...." : "Login"}</button>
        </div>
        <div className={styles.linkContainer}>
          If you do not have an account, <Link to={"/signup"}>Signup</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
