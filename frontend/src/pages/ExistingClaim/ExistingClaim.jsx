// import React from 'react';
import { Navigate } from "react-router-dom";
import BackButtonContainer from "../../components/BackButtonContainer/BackButtonContainer";
import ExistingClaimFormField from "../../components/ExistingClaimFormField/ExistingClaimFormField";
import { useAuthContext } from "../../contexts/AuthContext";
import styles from "./existingclaim.module.css";

const ExistingClaim = () => {
  const { authuser } = useAuthContext();

  if (!authuser) return <Navigate to={"/login"} />;

  return (
    <div className={`${styles.body}`}>
      <BackButtonContainer />
      <div className={`flex items-center justify-center p-4`}>
        <ExistingClaimFormField />
      </div>
    </div>
  );
};

export default ExistingClaim;
