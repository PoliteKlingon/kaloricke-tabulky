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
  );
};

export default MainPage;
