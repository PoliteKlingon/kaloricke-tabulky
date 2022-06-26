<<<<<<< HEAD
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
=======
import { styled } from "@mui/system";
import { CssBaseline } from "@mui/material";
import Header from "../Header";
import Features from "../Features";
import UserDetails from "./UserDetails";



const Hero = styled("div")({
  backgroundImage: `url(${
    import.meta.env.VITE_PUBLIC_URL + "/assets/background.jpg"
  })`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh"
});

const MainPage = () => {
  return (
    <Hero>
      <CssBaseline />
      <UserDetails />
    </Hero>
>>>>>>> 70ab42ff68abf67ae3e5df5e77b179b707f0b7cc
  );
};

export default MainPage;
