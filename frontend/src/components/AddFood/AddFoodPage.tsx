import { styled } from "@mui/system";
import { Box, CssBaseline } from "@mui/material";
import AddFood from "./AddFood";
import MainBackground from "../Utils/MainBackground";
import CustomAppBar from "../Utils/CustomAppBar";



const Hero = styled("div")({
  backgroundImage: `url(${
    import.meta.env.VITE_PUBLIC_URL + "/assets/background.jpg"
  })`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh"
});

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
