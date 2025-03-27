import { useEffect, useState } from "react";
import formClient from "../api/form-axios";

export default function useAuthCheck() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("no token");
        const response = await formClient.get("/auth", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) setIsAuth(true);
      } catch (e) {
        setIsAuth(false);
      }
    };

    verify();
  }, []);

  return { isAuth };
}
