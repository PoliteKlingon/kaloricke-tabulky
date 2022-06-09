import { styled } from "@mui/system";
import ImageCard from "./ImageCard";
import tips from "../static/tips";
import useWindowPosition from "../hooks/useWindowposition";

const Root = styled("div")({
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});


const Features = () => {
  const checked = useWindowPosition("header");
  return (
    <Root>
      <ImageCard props={tips[0]} checked={checked} />
      <ImageCard props={tips[1]} checked={checked} />
    </Root>
  );
}

export default Features;