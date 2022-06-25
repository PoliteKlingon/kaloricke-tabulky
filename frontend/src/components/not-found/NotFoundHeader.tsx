import {
    AppBar,
    Box,
    Button,
    CardMedia,
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
  import './NotFound.css'
  import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
  
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

    let theme = createTheme();
    theme = responsiveFontSizes(theme);

  
  
  
  const NotFoundHeader = () => {
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
  
    return (
      <Root id="header">
          <AppBar elevation={0} sx={{ background: "none", pt: 5 }}>
            <Toolbar sx={{ width: "100%", px: { xs: "auto", md: 5, lg: 10 } }}>
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
                          onClick={() => {
                            localStorage.removeItem("auth");
                            setAuth({});
                          }}
                        >
                          Odhlásit
                        </AnimatedButton>
                      </Link>{" "}
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
          
          <ThemeProvider theme={theme}>
            <Grid
                    container
                    justifyContent={{ xs: "center", md: "space-between" }}
                    direction={{ xs: "column", md: "column", lg: "row" }}
                    alignItems={{ xs: "center", md: "normal" }}
                    sx={{
                        backgroundColor: "white", 
                        width: "75%",
                    }}
                    marginTop={{xs: 70, sm: 35, md: 25, lg: 25}}
                    paddingTop={{xs: 3, md: 5, lg: 0}}
                    paddingX={{xs: 1, md: 2, lg: 2}}
                >
                <Grid item xs={6}>
                    <Grid 
                        container
                        justifyContent={"space-evenly"}
                        direction={"column"}
                        alignItems={"center"}
                        sx={{height: "100%"}}
                        >
                        <Grid item>
                            <Typography
                            component="h2"
                            variant="h2"
                            sx={{
                                fontFamily: "Nunito",
                            }}
                            textAlign={"center"}
                            >
                                Nic takového jsme nenašli...
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                            variant="h4"
                            component="h3"
                            sx={{
                                fontFamily: "Nunito",
                                marginTop: 3 
                            }}
                            textAlign="center">
                                Jste si jistí, že hledáte něco, <br />
                                co by tu mělo být?
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Box textAlign={"center"}>
                                <Link to="/" style={{ textDecoration: "none" }}>
                                <Button
                                    variant="contained"
                                    disableRipple
                                    sx={{
                                        backgroundColor: "orange",
                                        marginY: 3,
                                        fontWeight: "bold",
                                        transition: "transform 0.5s",
                                        ":hover": {
                                            transform: "scale(1.1)",
                                            backgroundColor: "#f29830",
                                        },
                                    }}
                                >
                                    Zpět na hlavní stránku
                                </Button>
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>  
                <Grid item xs={6}>
                    <img className="fridge" src="https://img.freepik.com/free-vector/opened-wider-empty-refrigerator_1284-23309.jpg?w=2000" alt=""/>
                </Grid>
            </Grid>
          </ThemeProvider>
      </Root>
    );
  };
  
  export default NotFoundHeader;
  