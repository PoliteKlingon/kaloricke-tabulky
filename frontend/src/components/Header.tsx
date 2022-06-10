import {
  AppBar,
  Button,
  Collapse,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      <AppBar elevation={0} sx={{ background: "none", pt: 5 }}>
        <Toolbar sx={{ width: "80%", margin: "0 auto" }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{ flexGrow: "1", fontFamily: "Nunito" }}
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
        </Toolbar>
      </AppBar>
      <Container>
        <Collapse in={collapsed} {...{ timeout: 2000 }} collapsedSize="5px">
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
