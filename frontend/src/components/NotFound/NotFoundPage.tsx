
import { Box, CssBaseline } from "@mui/material";
import NotFoundHeader from "./NotFoundHeader";
import CustomAppBar from "../Utils/CustomAppBar";
import MainBackground from "../Utils/MainBackground";

const NotFoundPage = () => {
  return (
    <MainBackground>
      <Box
        sx={{
          height: "100vh", 
          overflow: "auto"
        }}>
        <CssBaseline />
        <CustomAppBar withSearch={true} />
        <NotFoundHeader />
      </Box>
    </MainBackground>
  );
};

export default NotFoundPage;
