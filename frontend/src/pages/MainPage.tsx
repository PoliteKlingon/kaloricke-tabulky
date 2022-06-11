import { styled } from "@mui/system";
import { CssBaseline } from "@mui/material";
import Header from "../components/Header";
import Features from "../components/Features";


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
      <Header />
      <Features />
    </Hero>
  );
};

export default MainPage;
