import { Box, CssBaseline } from "@mui/material";
import UserDetails from "./UserDetails";
import MainBackground from "../Utils/MainBackground";
import CustomAppBar from "../Utils/CustomAppBar";

const MainPage = () => {
  return (
    <MainBackground>
      <Box
        sx={{
          height: "100vh", 
          overflow: "auto"
        }}>
        <CssBaseline />
        <CustomAppBar withSearch={true}/>
        <UserDetails />
      </Box>
    </MainBackground>
  );
};

export default MainPage;
