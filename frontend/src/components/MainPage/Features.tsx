import { styled } from "@mui/system";
import ImageCard from "./ImageCard";
import tips from "../../static/tips";
import useWindowPosition from "../../hooks/useWindowposition";
import { Grid } from "@mui/material";

const Root = styled("div")({
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});


const Features = () => {
  const checked = useWindowPosition("header", 0.4);
  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        pt: { xs: 50, sm: 0 },
      }}
    >
      <Grid item>
        <ImageCard props={tips[0]} checked={checked} />
      </Grid>
      <Grid item>
        <ImageCard props={tips[1]} checked={checked} />
      </Grid>
    </Grid>
  );
}

export default Features;