import React from 'react'

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
  import TextField from '@mui/material/TextField';
  import { styled } from "@mui/system";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import { useContext, useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  import useScrollTrigger from "@mui/material/useScrollTrigger";
  import Slide from "@mui/material/Slide";
  import AuthContext from "../../context/AuthProvider";
  import Accordion from '@mui/material/Accordion';
  import AccordionDetails from '@mui/material/AccordionDetails';
  import AccordionSummary from '@mui/material/AccordionSummary';
  import SettingsIcon from '@mui/icons-material/Settings';
  import CloseIcon from '@mui/icons-material/Close';
  import { useForm, SubmitHandler } from "react-hook-form";
  
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
    //alignItems: "center",
    height: "100vh",
  });
  
  const Container = styled("div")({
    textAlign: "center",
  });
  
  export interface formInput {
    email: string
    }

  export default function UserDetails() {
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [changeEmail, setChangeEmail] = useState<Boolean>(false);
    //const [email, setEmail] = useState<String>("tvojemamka@gmail.com");
    const [data, setData] = useState<formInput>({email:"tvojemamka@gmail.com"});

    const {
      register,
      formState: { errors },
      handleSubmit,
      } = useForm<formInput>();
      const onSubmit: SubmitHandler<formInput> = (data: formInput) => {setData(data)};
    
    const handleChange =
      (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
      };

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
        <HideOnScroll>
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
        </HideOnScroll>
        <Container
            sx={{
                backgroundColor: "white",
                marginTop: 20,
                width: "90%"
        }}
        >
            


            <Grid
              container
              spacing={0}
              direction="row"
              //alignItems="center"
              justifyContent="center"
            >

              <Grid item xs={4}>
               <Typography>E-mail</Typography>
              </Grid>   
              <Grid item xs={4}>
               <Typography>{data.email}</Typography>
              </Grid>   
              <Grid item xs={4}>
               {changeEmail ?
               <CloseIcon onClick={() => setChangeEmail(!changeEmail)}/>
               :
               <SettingsIcon onClick={() => setChangeEmail(!changeEmail)}/>
               }
              </Grid>   

            </Grid> 
            {changeEmail &&
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid
                container
                spacing={0}
                direction="row"
                //alignItems="center"
                justifyContent="center"
              >

                <Grid item xs={4} />
                
                <Grid item xs={4}>
                <TextField id="outlined-basic" label="Nový e-mail" variant="outlined" {...register("email", {})}/>
                </Grid>   
                <Grid item xs={4}>
                <Button type="submit" /*onClick={()=> {setChangeEmail(!changeEmail)}}*/>Save</Button>
                </Grid>
              </Grid> 
            </form>}
        





        </Container>
      </Root>
    );
  };