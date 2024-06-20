// import React from 'react';
import { Navigate } from "react-router-dom";
import BackButtonContainer from "../../components/BackButtonContainer/BackButtonContainer";
import GetClaimFormField from "../../components/GetClaimFormField/GetClaimFormField";
import { useAuthContext } from "../../contexts/AuthContext";
import styles from "./getclaim.module.css";

const GetClaim = () => {
  const { authUser } = useAuthContext();

  if (!authUser) return <Navigate to={"/login"} />;

  return (
    <div className={`${styles.body}`}>
      <BackButtonContainer />
      <div className={`flex items-center justify-center p-4`}>
        <GetClaimFormField />
      </div>
    </div>
  );
};

export default GetClaim;
