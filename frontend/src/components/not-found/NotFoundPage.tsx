import { styled } from "@mui/system";
import { CssBaseline } from "@mui/material";
import NotFoundHeader from "./NotFoundHeader";




const Hero = styled("div")({
  backgroundImage: `url(${
    import.meta.env.VITE_PUBLIC_URL + "/assets/background.jpg"
  })`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh"
});

const NotFoundPage = () => {
  return (
    <Hero>
      <CssBaseline />
      <NotFoundHeader />
    </Hero>
  );
};

export default NotFoundPage;
