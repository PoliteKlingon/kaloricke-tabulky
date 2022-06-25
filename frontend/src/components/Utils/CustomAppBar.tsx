import { Link } from "react-router-dom";
import {
  AppBar,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

import AuthContext from "../../context/AuthProvider";
import AnimatedButton from "./AnimatedButton";
import HideOnScroll from "./HideOnScroll";

import { useEffect, useContext, useState, FC } from "react";
import { logout } from "../../utils/Utils";

import SearchIcon from "@mui/icons-material/Search";

interface ICustomAppBarProps {
  withSearch?: boolean;
}

const CustomAppBar:FC<ICustomAppBarProps> = ({withSearch}) => {
  // @ts-ignore
  const { auth, setAuth } = useContext(AuthContext);
  const [authState, setAuthState] = useState<Boolean>();

  useEffect(() => {
    setAuthState(!(Object.keys(auth).length === 0 || auth === undefined));
  }, [auth]);
  const onLogout = async () => {
    if (await logout()) {
      setAuth({});
    }
  };

  return (
    <>
      <HideOnScroll>
        <AppBar
          elevation={0}
          sx={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.8) 90%, transparent 100%);",
          }}
          position="sticky"
        >
          <Toolbar sx={{ width: "100%", px: { xs: "auto", md: 5, lg: 10 } }}>
            <Grid
              container
              justifyContent={{ xs: "center", md: "space-between" }}
              direction={{ xs: "column", md: "row" }}
              alignItems={{ xs: "center", md: "center" }}
            >
              <Link
                to="/home"
                style={{ textDecoration: "none", accentColor: "none" }}
                color="white"
              >
                <Typography
                  sx={{
                    flexGrow: "1",
                    fontFamily: "Nunito",
                    fontSize: { xs: "2.5rem", sm: "3.5rem" },
                    fontWeight: 600,
                  }}
                  textAlign={{ xs: "center", md: "left" }}
                >
                  <span style={{ color: "#edc69f" }}>Kalorické</span>{" "}
                  <span style={{ color: "white" }}>tabulky</span>
                </Typography>
              </Link>
              {withSearch && (
                <InputBase
                  sx={{
                    ml: 0,
                    flex: 1,
                    background: "white",
                    borderRadius: "10px",
                    pl: 2,
                    fontSize: "1.5rem",
                    maxWidth: { xs: "100%", sm: "35%" },
                    maxHeight: { xs: "100%", sm: "35%" },
                  }}
                  placeholder="Vyhledej jídlo"
                  inputProps={{
                    "aria-label": "vyhledej jídlo",
                  }}
                  endAdornment={
                    <InputAdornment position="start">
                      <IconButton
                        type="submit"
                        sx={{ color: "black" }}
                        aria-label="search"
                      >
                        <SearchIcon sx={{ fontSize: 40 }} />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              )}
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={{ xs: 0, md: 5 }}
                sx={{ alignItems: "center" }}
              >
                {authState ? (
                  <>
                    <Link
                      to="/"
                      style={{ textDecoration: "none", textAlign: "center" }}
                    >
                      <AnimatedButton
                        variant="text"
                        sx={{
                          color: "#edc69f",
                          ":active": {
                            color: "#edd9be",
                          },
                          textAlign: "center",
                          fontSize: { xs: "1.5rem", sm: 30 },
                        }}
                        disableRipple
                      >
                        {auth.username}
                      </AnimatedButton>
                    </Link>
                    <Link
                      to="/"
                      style={{ textDecoration: "none", textAlign: "center" }}
                    >
                      <AnimatedButton
                        variant="text"
                        sx={{
                          color: "#eb9b34",
                          ":active": {
                            color: "#edc48c",
                          },
                          fontSize: { xs: "1.5rem", sm: 30 },
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
    </>
  );
};

export default CustomAppBar;
