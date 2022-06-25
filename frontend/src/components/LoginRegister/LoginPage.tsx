import Login from "./Login";
import { CssBaseline } from "@mui/material";
import { FC } from "react";

interface ILoginPageProps {}

const LoginPage: FC<ILoginPageProps> = () => {
  return (
    <>
      <CssBaseline />
      <Login />
    </>
  );
};

export default LoginPage;
