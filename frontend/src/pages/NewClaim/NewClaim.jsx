// import React from 'react';
import { Navigate } from "react-router-dom";
import BackButtonContainer from "../../components/BackButtonContainer/BackButtonContainer";
import NewClaimFormField from "../../components/NewClaimFormField/NewClaimFormField";
import { useAuthContext } from "../../contexts/AuthContext";
import styles from "./newclaim.module.css";

const NewClaim = () => {
  const { authUser } = useAuthContext();

  // console.log(authUser);
  console.log(authUser);

  if (!authUser) return <Navigate to={"/login"} />;

  return (
    <div className={`${styles.body}`}>
      <BackButtonContainer />
      <div className={`flex items-center justify-center p-4`}>
        <NewClaimFormField />
      </div>
    </div>
  );
};

export default NewClaim;
