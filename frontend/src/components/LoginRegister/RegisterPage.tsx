import Register from "./Register";
import { CssBaseline } from "@mui/material";
import { FC } from "react";

interface IRegisterPageProps {}
const RegisterPage: FC<IRegisterPageProps> = () => {
  return (
    <>
      <CssBaseline />
      <Register />
    </>
  );
};

export default RegisterPage;
