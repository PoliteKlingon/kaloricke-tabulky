import { CssBaseline } from "@mui/material";
import UserDetails from "./UserDetails";
import MainBackground from "../Utils/MainBackground";
import CustomAppBar from "../Utils/CustomAppBar";

const MainPage = () => {
  return (
    <MainBackground>
      <CssBaseline />
      <CustomAppBar />
      <UserDetails />
    </MainBackground>
  );
};

export default MainPage;
