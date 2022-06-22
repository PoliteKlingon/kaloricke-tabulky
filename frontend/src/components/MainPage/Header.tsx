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
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import AuthContext from "../../context/AuthProvider";
import { logout } from "../../utils/Utils";

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

  const [authState, setAuthState] = useState<Boolean>();
    // @ts-ignore
  const { auth, setAuth } = useContext(AuthContext);
  useEffect(() => {
    setAuthState(!(Object.keys(auth).length === 0 || auth === undefined));
  }, [auth]);
  //console.log("Header" , auth);

  const onLogout = async () => {
    if (await logout()) {
      setAuth({});
    }
  }

  return (
    <Root id="header">
      <HideOnScroll>
        <AppBar elevation={0} sx={{ background: "none", pt: 5 }}>
          <Toolbar sx={{ width: "100%", px: { xs: "auto", md: 5, lg: 10 } }}>
            <Grid
              container
              justifyContent={{ xs: "center", md: "space-between" }}
              direction={{ xs: "column", md: "row" }}
              alignItems={{ xs: "center", md: "normal" }}
            >
              <Link
                to="/home"
                style={{ textDecoration: "none", accentColor: "none" }}
                color="white"
              >
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{ flexGrow: "1", fontFamily: "Nunito" }}
                  textAlign={{ xs: "center", md: "left" }}
                >
                  <span style={{ color: "#edc69f" }}>Kalorické</span>{" "}
                  <span style={{ color: "white" }}>tabulky</span>
                </Typography>
              </Link>

              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={{ xs: 0, md: 5 }}
              >
                {authState ? (
                  <>
                    <Link to="/" style={{ textDecoration: "none" }}>
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
                        {auth.username}
                      </AnimatedButton>
                    </Link>
                    <Link to="/" style={{ textDecoration: "none" }}>
                      <AnimatedButton
                        variant="text"
                        sx={{
                          color: "#eb9b34",
                          ":active": {
                            color: "#edc48c",
                          },
                        }}
                        disableRipple
                        onClick={onLogout}
                      >
                        Odhlásit
                      </AnimatedButton>
                    </Link>
                  </>
                ) : (
                  <>
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
                        Přihlášení
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
                        Registrace
                      </AnimatedButton>
                    </Link>
                  </>
                )}
              </Stack>
            </Grid>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Container sx={{ pt: { xs: 60, sm: 30 } }}>
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
            fontSize={{ xs: "3rem", sm: "6rem" }}
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
