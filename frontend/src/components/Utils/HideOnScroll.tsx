import { Slide } from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";

const HideOnScroll = ({ children }: any) => {
  const trigger = useScrollTrigger({ disableHysteresis: true });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

export default HideOnScroll
