<<<<<<< HEAD

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
=======
import { styled } from "@mui/system";
import { CssBaseline } from "@mui/material";
import AddFood from "./AddFood";



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
    <Hero>
      <CssBaseline />
      <AddFood />
    </Hero>
  );
};

export default AddFoodPage;
>>>>>>> 70ab42ff68abf67ae3e5df5e77b179b707f0b7cc
