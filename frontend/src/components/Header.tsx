import {
  AppBar,
  Button,
  Collapse,
  Grid,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";

const HideOnScroll = ({children}:any) => {
  const trigger = useScrollTrigger({ disableHysteresis: true });
  return <Slide appear={false} direction="down" in={!trigger}>{children}</Slide>;
}

const AnimatedButton = styled(Button)({
  fontSize: 30,
  fontFamily: "Nunito",
  fontWeight: "bold",
  transition: "transform 0.5s",
  ":hover": {
    backgroundColor: "transparent",
    transform: "scale(1.3)",
  },
});

const Root = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});

const Container = styled("div")({
  textAlign: "center",
});

const Header = () => {
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    setCollapsed(true);
  }, []);

  return (
    <Root id="header">
      <HideOnScroll>
        <AppBar elevation={0} sx={{ background: "none", pt: 5 }}>
          <Toolbar sx={{ width: "100%", px: { xs: "auto", md: 5, lg: 10} }}>
            <Grid
              container
              justifyContent={{ xs: "center", md: "space-between" }}
              direction={{ xs: "column", md: "row" }}
              alignItems={{ xs: "center", md: "normal" }}
            >
              <Typography
                variant="h2"
                component="h1"
                sx={{ flexGrow: "1", fontFamily: "Nunito" }}
                textAlign={{ xs: "center", md: "left" }}
              >
                <span style={{ color: "#edc69f" }}>Kalorické</span> tabulky
              </Typography>
              <Stack direction="row" spacing={5}>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <AnimatedButton
                    variant="text"
                    sx={{
                      color: "#edc69f",
                      ":active": {
                        color: "#edd9be",
                      },
                    }}
                    disableRipple
                  >
                    Login
                  </AnimatedButton>
                </Link>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <AnimatedButton
                    variant="text"
                    sx={{
                      color: "#eb9b34",
                      ":active": {
                        color: "#edc48c",
                      },
                    }}
                    disableRipple
                  >
                    Register
                  </AnimatedButton>
                </Link>
              </Stack>
            </Grid>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Container sx={{ pt: { xs: 80, sm: 15 } }}>
        <Collapse in={collapsed} {...{ timeout: 2000 }} collapsedSize="0px">
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontFamily: "Nunito",
              fontWeight: 600,
              color: "white",
              textAlign: "center",
            }}
          >
            Začněte svou <br />
            cestu za hubnutím <br />
            ještě dnes!
          </Typography>
          <IconButton>
            <ExpandMoreIcon sx={{ color: "white", fontSize: 70 }} />
          </IconButton>
        </Collapse>
      </Container>
    </Root>
  );
};

export default Header;
