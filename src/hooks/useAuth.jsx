import { useContext, useEffect, useState } from "react";
import apiClient from "../utils/apiClient";
import { AuthContext } from "../providers/AuthProvider";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  // useState -> для созадния переменных реакта

  useEffect(() => {
    const verifyMe = async () => {
      setIsLoading(true);
      try {
        const response = await apiClient.post("/auth/me");
        const { data } = response;
        setUser(data?.user);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!user) {
      verifyMe();
    } else {
      setIsLoading(false);
    }
  }, [user, setUser]);

  return { user, isLoading };
};

export default useAuth;
