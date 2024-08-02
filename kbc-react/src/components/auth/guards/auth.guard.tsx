import { Outlet, useNavigate } from "react-router-dom";
import { authStore } from "../../../service/store/auth";
import { useEffect } from "react";
import { ROUTES } from "../../../utils/constants/routes";

export const AuthGuard = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = authStore((state) => state);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(ROUTES.signIn, { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? <Outlet /> : <h6>Loading</h6>;
};
