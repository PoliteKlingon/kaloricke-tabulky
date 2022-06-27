import { useEffect, useContext, useState, FC } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  AppBar,
  Avatar,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";

import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";

import AnimatedButton from "./AnimatedButton";
import AuthContext from "../../context/AuthProvider";
import { logout } from "../../utils/Utils";

interface ICustomAppBarProps {
  withSearch?: boolean;
}

const CustomAppBar: FC<ICustomAppBarProps> = ({ withSearch }) => {

  const navigate = useNavigate();
  // @ts-ignore
  const { auth, setAuth } = useContext(AuthContext);
  const [authState, setAuthState] = useState<Boolean>();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setAuthState(!(Object.keys(auth).length === 0 || auth === undefined));
  }, [auth]);
  const onLogout = async () => {
    if (await logout()) {
      setAuth({});
      navigate("/");
    }
  };

  return (
    <>
      <AppBar
        elevation={0}
        sx={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,1) 90%, transparent 100%);"
        }}
        position="sticky"
      >
        <Toolbar
          sx={{
            width: "100%",
            px: { xs: "auto", md: 5, lg: 10 },
          }}
        >
          <Grid
            container
            direction={{ xs: "column", md: "row" }}
            alignItems={{ xs: "center", md: "center" }}
          >
            <Grid
              container
              direction={"row"}
              xs={12}
              md={4}
              justifyContent={{ xs: "space-around", md: "left" }}
            >
              <Grid item sx={{width: {xs: "70vw", md: "auto"}}}>
                <Link
                  to="/home"
                  style={{ textDecoration: "none", accentColor: "none" }}
                  color="white"
                >
                  <Typography
                    sx={{
                      flexGrow: "1",
                      fontFamily: "Nunito",
                      fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
                      fontWeight: 600,
                      paddingRight: 1
                    }}
                    textAlign={{ xs: "center", md: "left" }}
                  >
                    <span style={{ color: "#edc69f" }}>Kalorické</span>{" "}
                    <span style={{ color: "white" }}>tabulky</span>
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Avatar sx={{
                  marginY: {xs: 1.5, sm: 2.5},
                  display: {xs: "", md:"none"},
                  border: "none"
                  }} 
                  component={"button"}
                  onClick={handleClick}
                  />
              </Grid>
            </Grid>

            <Grid container xs={12} md={4} justifyContent="center">
              {withSearch && (
                <InputBase
                  sx={{
                    ml: 0,
                    flex: 1,
                    background: "white",
                    borderRadius: "10px",
                    marginBottom: {xs: 3, md: 0},
                    pl: 2,
                    fontSize: "1.25rem",
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
                        <SearchIcon sx={{ fontSize: 30 }} />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              )}
            </Grid>
            <Grid
              container
              xs={12}
              md={4}
              justifyContent={{ xs: "center", md: "right" }}
            >
              {authState ? (
                <>
                  <AnimatedButton
                    variant="text"
                    sx={{
                      display: {xs: "none", md: "unset"},
                      color: "#edc69f",
                      ":active": {
                        color: "#edd9be",
                      },
                      fontSize: { xs: "1.5rem", sm: 30 },
                    }}
                    disableRipple
                    onClick={handleClick}
                  >
                    {auth.username}
                  </AnimatedButton>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                          background: "black",
                        },
                        background: "black",
                        color: "white",
                        borderRadius: "10px",
                      },
                    }}
                    keepMounted
                    disableScrollLock
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem>
                      <Avatar />
                      <Link
                        to="/user-details"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Správa Profilu
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={onLogout}>
                      <ListItemIcon>
                        <Logout fontSize="medium" sx={{ color: "white" }} />
                      </ListItemIcon>
                      Odhlásit se
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={{ xs: 0, md: 5 }}
                  sx={{ alignItems: "center" }}
                >
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
                </Stack>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default CustomAppBar;
