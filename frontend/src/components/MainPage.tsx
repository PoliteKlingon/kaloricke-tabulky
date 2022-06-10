import { styled } from "@mui/system";
import { CssBaseline } from "@mui/material";
import Header from "./Header";
import Features from "./Features";


const Hero = styled("div")({
  minHeight: "100vh",
  backgroundImage: `url(${
    import.meta.env.VITE_PUBLIC_URL + "/assets/background.jpg"
  })`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
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
