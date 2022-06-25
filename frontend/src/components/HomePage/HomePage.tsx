import HomeContent from "./HomeContent";
import AuthContext from "../../context/AuthProvider";

import { CssBaseline } from "@mui/material";
import { FC, useContext } from "react";
import { Navigate } from "react-router-dom";
import MainBackground from "../Utils/MainBackground";

import CustomAppBar from "../Utils/CustomAppBar";

interface IHomePageProps {}

const HomePage:FC<IHomePageProps> = () => {
    // @ts-ignore
    const { auth } = useContext(AuthContext);

    return (
      <>
        {Object.keys(auth).length === 0 || auth == null ? (
          <Navigate to="/" />
        ) : (
          <MainBackground>
            <CssBaseline />
            <CustomAppBar withSearch={true}/>
            <HomeContent />
          </MainBackground>
        )}
      </>
    );
}

export default HomePage;