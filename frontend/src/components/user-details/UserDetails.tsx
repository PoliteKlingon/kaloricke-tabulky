import React from 'react'

import {
    AppBar,
    Button,
    Collapse,
    Grid,
    IconButton,
    Slider,
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
import internal from 'stream';
  
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

  
  export default function UserDetails() {
    const [expanded, setExpanded] = React.useState<string | false>(false);
    

    const {
      register: registerEmail,
      formState: { errors: errorsEmail },
      handleSubmit: handleSubmitEmail,
    } = useForm();
  
    const {
      register: registerHeight,
      formState: { errors: errorsHeight },
      handleSubmit: handleSubmitHeight,
    } = useForm();

    const {
      register: registerWeight,
      formState: { errors: errorsWeight },
      handleSubmit: handleSubmitWeight,
    } = useForm();

    const {
      register: registerBirthDate,
      formState: { errors: errorsBirthDate },
      handleSubmit: handleSubmitBirthDate,
    } = useForm();

    const {
      register: registerDesiredWeight,
      formState: { errors: errorsDesiredWeight },
      handleSubmit: handleSubmitDesiredWeight,
    } = useForm();
    
    // @ts-ignore
    const onSubmitEmail = (data) => {
      setEmail(data.email);
      setChangeEmail(false);
    };
  
    // @ts-ignore
    const onSubmitHeight = (data) => {
      setHeight(data.height);
      setChangeHeight(false);
    };

    // @ts-ignore
    const onSubmitWeight = (data) => {
      setWeight(data.weight);
      setChangeWeight(false);
    };

    // @ts-ignore
    const onSubmitBirthDate = (data) => {
      setBirthDate(data.birthDate);
      setChangeBirthDate(false);
    };

    // @ts-ignore
    const onSubmitDesiredWeight = (data) => {
      setDesiredWeight(data.desiredWeight);
      setChangeDesiredWeight(false);
    };
    
    




    const [changeEmail, setChangeEmail] = useState<Boolean>(false);
    const [email, setEmail] = useState<String>("puvodni-email");
    
    const [changeSex, setChangeSex] = useState<Boolean>(false);
    const [sex, setSex] = useState<number>(50);
    const [newSex, setNewSex] = useState<number>(50);
    
    const [changeHeight, setChangeHeight] = useState<Boolean>(false);
    const [height, setHeight] = useState<number>(180);

    const [changeWeight, setChangeWeight] = useState<Boolean>(false);
    const [weight, setWeight] = useState<number>(75);

    const [changeBirthDate, setChangeBirthDate] = useState<Boolean>(false);
    const [birthDate, setBirthDate] = useState<string>("ahoj");

    const [changeDesiredWeight, setChangeDesiredWeight] = useState<Boolean>(false);
    const [desiredWeight, setDesiredWeight] = useState<number>(75);
    
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
            

          {/* EMAIL */}
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
               <Typography>{email}</Typography>
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
              <form onSubmit={handleSubmitEmail(onSubmitEmail)}>
              <Grid
                container
                spacing={0}
                direction="row"
                //alignItems="center"
                justifyContent="center"
              >

                <Grid item xs={4} />
                
                <Grid item xs={4}>
                <TextField id="outlined-basic" label="Nový e-mail" variant="outlined" {...registerEmail("email")}/>
                </Grid>   
                <Grid item xs={4}>
                <Button type="submit">Uložit</Button>
                </Grid>
              </Grid>
              </form> 
            }   

            {/* SEX */}

            <Grid
              container
              spacing={0}
              direction="row"
              //alignItems="center"
              justifyContent="center"
            >

              <Grid item xs={4}>
               <Typography>Pohlaví</Typography>
              </Grid>   
              <Grid item xs={4}>
              <Slider disabled value={sex} />
              </Grid>   
              <Grid item xs={4}>
               {changeSex ?
               <CloseIcon onClick={() => setChangeSex(!changeSex)}/>
               :
               <SettingsIcon onClick={() => setChangeSex(!changeSex)}/>
               }
              </Grid>   

            </Grid> 
            {changeSex &&
              <Grid
                container
                spacing={0}
                direction="row"
                //alignItems="center"
                justifyContent="center"
              >

                <Grid item xs={4} />
                
                <Grid item xs={4}>
                <Slider onChange={(e, data) => setNewSex(data)}/>
                </Grid>   
                <Grid item xs={4}>
                <Button onClick={()=> {setChangeSex(!changeSex); setSex(newSex)}}>Save</Button>
                </Grid>
              </Grid> 
            }

            {/* HEIGHT */}

            <Grid
              container
              spacing={0}
              direction="row"
              //alignItems="center"
              justifyContent="center"
            >

              <Grid item xs={4}>
               <Typography>Výška</Typography>
              </Grid>   
              <Grid item xs={4}>
              <Typography>{height}</Typography>
              </Grid>   
              <Grid item xs={4}>
               {changeHeight ?
               <CloseIcon onClick={() => setChangeHeight(!changeHeight)}/>
               :
               <SettingsIcon onClick={() => setChangeHeight(!changeHeight)}/>
               }
              </Grid>   

            </Grid> 
            {changeHeight &&
              <form onSubmit={handleSubmitHeight(onSubmitHeight)}>
              <Grid
                container
                spacing={0}
                direction="row"
                //alignItems="center"
                justifyContent="center"
              >

                <Grid item xs={4} />
                
                <Grid item xs={4}>
                <TextField id="outlined-basic" label="Nová výška" variant="outlined" {...registerHeight("height")} />
                </Grid>   
                <Grid item xs={4}>
                <Button type="submit">Save</Button>
                </Grid>
              </Grid> 
              </form>
            }

            {/* WEIGHT */}

            <Grid
              container
              spacing={0}
              direction="row"
              //alignItems="center"
              justifyContent="center"
            >

              <Grid item xs={4}>
               <Typography>Hmotnost</Typography>
              </Grid>   
              <Grid item xs={4}>
              <Typography>{weight}</Typography>
              </Grid>   
              <Grid item xs={4}>
               {changeWeight ?
               <CloseIcon onClick={() => setChangeWeight(!changeWeight)}/>
               :
               <SettingsIcon onClick={() => setChangeWeight(!changeWeight)}/>
               }
              </Grid>   

            </Grid> 
            {changeWeight &&
              <form onSubmit={handleSubmitWeight(onSubmitWeight)}>
              <Grid
                container
                spacing={0}
                direction="row"
                //alignItems="center"
                justifyContent="center"
              >

                <Grid item xs={4} />
                
                <Grid item xs={4}>
                <TextField id="outlined-basic" label="Nová hmotnost" variant="outlined" {...registerWeight("weight")} />
                </Grid>   
                <Grid item xs={4}>
                <Button type="submit">Save</Button>
                </Grid>
              </Grid> 
              </form>
            }

            



            {/* DESIRED WEIGHT */}

            <Grid
              container
              spacing={0}
              direction="row"
              //alignItems="center"
              justifyContent="center"
            >

              <Grid item xs={4}>
               <Typography>Cílová hmotnost</Typography>
              </Grid>   
              <Grid item xs={4}>
              <Typography>{desiredWeight}</Typography>
              </Grid>   
              <Grid item xs={4}>
               {changeDesiredWeight ?
               <CloseIcon onClick={() => setChangeDesiredWeight(!changeDesiredWeight)}/>
               :
               <SettingsIcon onClick={() => setChangeDesiredWeight(!changeDesiredWeight)}/>
               }
              </Grid>   

            </Grid> 
            {changeDesiredWeight &&
              <form onSubmit={handleSubmitDesiredWeight(onSubmitDesiredWeight)}>
              <Grid
                container
                spacing={0}
                direction="row"
                //alignItems="center"
                justifyContent="center"
              >

                <Grid item xs={4} />
                
                <Grid item xs={4}>
                <TextField id="outlined-basic" label="Nová cílová hmotnost" variant="outlined" {...registerDesiredWeight("desiredWeight")} />
                </Grid>   
                <Grid item xs={4}>
                <Button type="submit">Save</Button>
                </Grid>
              </Grid> 
              </form>
            }



        </Container>
      </Root>
    );
  };