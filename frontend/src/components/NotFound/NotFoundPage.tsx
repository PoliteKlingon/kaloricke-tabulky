
import { Box, CssBaseline } from "@mui/material";
import NotFound from "./NotFound";
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
        <NotFound />
      </Box>
    </MainBackground>
  );
};

export default NotFoundPage;
