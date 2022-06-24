import { CssBaseline } from "@mui/material";
import Header from "./Header";
import Features from "./Features";
import MainBackground from "../Utils/MainBackground";


const MainPage = () => {
  return (
    <MainBackground>
      <CssBaseline />
      <Header />
      <Features />
    </MainBackground>
  );
};

export default MainPage;
