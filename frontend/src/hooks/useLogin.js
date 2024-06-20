import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../contexts/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({ fullname, password }) => {
    const success = handleInputErrors({ fullname, password });

    if (!success) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname,
          password,
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

      toast.success("Login Successfull!!");

      console.log(data);
    } catch (error) {
      console.log("Error in Submitting the Login Data:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;

function handleInputErrors({ fullname, password }) {
  if (!fullname || !password) {
    toast.error("Please fill out all the fields");
    // console.log("false");
    return false;
  }

  //   console.log("true");
  return true;
}
