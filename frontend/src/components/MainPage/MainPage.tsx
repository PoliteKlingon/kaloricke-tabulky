import { FC } from "react";

import { CssBaseline } from "@mui/material";

import Header from "./Header";
import Features from "./Features";
import MainBackground from "../Utils/MainBackground";
import CustomAppBar from "../Utils/CustomAppBar";

interface IMainPageProps {}

const MainPage:FC<IMainPageProps> = () => {
  return (
    <MainBackground>
      <CssBaseline />
      <CustomAppBar/>
      <Header />
      <Features />
    </MainBackground>
  );
};

export default MainPage;
