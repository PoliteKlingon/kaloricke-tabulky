import { Box, CssBaseline } from "@mui/material";
import MainBackground from "../Utils/MainBackground";
import CustomAppBar from "../Utils/CustomAppBar";
import AdminHome from "./AdminHome";

const AdminHomepage = () => {
  return (
    <MainBackground>
      <Box height={"100vh"} overflow={"auto"}>
        <CssBaseline />
        <CustomAppBar withSearch={true} />
        <AdminHome />
      </Box>
    </MainBackground>
  );
};

export default AdminHomepage;
