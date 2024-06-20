// import React from 'react';
import { Navigate } from "react-router-dom";
import BackButtonContainer from "../../components/BackButtonContainer/BackButtonContainer";
import DeleteClaimFormField from "../../components/DeleteClaimFormField/DeleteClaimFormField";
import { useAuthContext } from "../../contexts/AuthContext";
import styles from "./deleteclaim.module.css";

const DeleteClaim = () => {
  const { authuser } = useAuthContext();

  if (!authuser) return <Navigate to={"/login"} />;

  return (
    <div className={`${styles.body}`}>
      <BackButtonContainer />
      <div className={`flex items-center justify-center p-4`}>
        <DeleteClaimFormField />
      </div>
    </div>
  );
};

export default DeleteClaim;
