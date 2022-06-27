import { Box, CssBaseline } from "@mui/material";
import AddFood from "./AddFood";
import MainBackground from "../Utils/MainBackground";
import CustomAppBar from "../Utils/CustomAppBar";

const AddFoodPage = () => {
  return (
    <MainBackground>
      <Box height={"100vh"} overflow={"auto"}>
        <CustomAppBar withSearch={true} />
        <CssBaseline />
        <AddFood />
      </Box>
    </MainBackground>
  );
};

export default AddFoodPage;
