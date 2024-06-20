// import React from 'react';
import { useState } from "react";
import styles from "./signup.module.css";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullname: "",
    password: "",
    phoneNumber: "",
  });

  const { signup, loading } = useSignup();

  const submitHandler = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className={`${styles.body} mt-6`}>
      <h1 className="text-2xl">Signup to place your claims</h1>
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
          <label htmlFor="fullname">Enter your Phone Number: </label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="phoneNumber"
            value={inputs.phoneNumber}
            onChange={(e) =>
              setInputs({ ...inputs, phoneNumber: e.target.value })
            }
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
          {/* <button type="submit">Login</button> */}
        </div>
        <div className={styles.linkContainer}>
          If you have an account, <Link to={"/login"}>Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
