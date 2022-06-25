import { CssBaseline } from "@mui/material";
import Header from "./Header";
import Features from "./Features";
import MainBackground from "../Utils/MainBackground";
import { FC } from "react";

interface IMainPageProps {}

const MainPage:FC<IMainPageProps> = () => {
  return (
    <MainBackground>
      <CssBaseline />
      <Header />
      <Features />
    </MainBackground>
  );
};

export default MainPage;
