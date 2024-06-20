import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../contexts/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({ fullname, password, phoneNumber }) => {
    const success = handleInputErrors({ fullname, password, phoneNumber });

    if (!success) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname,
          password,
          phoneNumber,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "An unknown error occurred.");
      }

      const data = await res.json();

      localStorage.setItem("claimantUser", JSON.stringify(data));
      localStorage.setItem("expiresAt", data.expiresAt);

      setAuthUser(data);

      toast.success("SignUp Successfull!!");

      console.log(data);
    } catch (error) {
      console.log("Error in Submitting the Signup Data:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading };
};

export default useSignup;

function handleInputErrors({ fullname, password, phoneNumber }) {
  if (!fullname || !password || phoneNumber) {
    toast.error("Please fill out all the fields");
    // console.log("false");
    return false;
  }

  //   console.log("true");
  return true;
}
