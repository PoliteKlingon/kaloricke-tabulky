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
