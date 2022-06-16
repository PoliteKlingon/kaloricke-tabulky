import React from 'react'

import {
    AppBar,
    Button,
    Collapse,
    Grid,
    IconButton,
    InputAdornment,
    Slider,
    Stack,
    Switch,
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
import { DesktopDatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import { setDate } from 'date-fns';
import { date } from 'yup';
  
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

  export interface Nutrients {
    proteins: number,
    carbohydrates: number,
    fats: number,
    fiber: number,
    salt: number
  }

  export interface Passwords {
    oldPassword: String,
    password: String,
    passwordAgain: String
  }

  const marks = [
    {
      value: 5,
      label: "Žena",
    },
    {
      value: 95,
      label: "Muž",
    },
  ];

  
  export default function UserDetails() {
    const [expanded, setExpanded] = React.useState<string | false>(false);
    

    const {
      register: registerEmail,
      formState: { errors: errorsEmail },
      handleSubmit: handleSubmitEmail,
    } = useForm();
    
    // @ts-ignore
    const onSubmitEmail = (data) => {
      setEmail(data.email);
      setChangeEmail(false);
    };

    const {
      register: registerNick,
      formState: { errors: errorsNick },
      handleSubmit: handleSubmitNick,
    } = useForm();
    
    // @ts-ignore
    const onSubmitNick = (data) => {
      setNick(data.nick);
      setChangeNick(false);
    };

    const {
      register: registerName,
      formState: { errors: errorsName },
      handleSubmit: handleSubmitName,
    } = useForm();
    
    // @ts-ignore
    const onSubmitName = (data) => {
      setName(data.name);
      setChangeName(false);
    };

    const {
      register: registerSurname,
      formState: { errors: errorsSurname },
      handleSubmit: handleSubmitSurname,
    } = useForm();
    
    // @ts-ignore
    const onSubmitSurname = (data) => {
      setSurname(data.surname);
      setChangeSurname(false);
    };

    const {
      register: registerHeight,
      formState: { errors: errorsHeight },
      handleSubmit: handleSubmitHeight,
    } = useForm();
  
    // @ts-ignore
    const onSubmitHeight = (data) => {
      setHeight(data.height);
      setChangeHeight(false);
    };

    const {
      register: registerWeight,
      formState: { errors: errorsWeight },
      handleSubmit: handleSubmitWeight,
    } = useForm();

    // @ts-ignore
    const onSubmitWeight = (data) => {
      setWeight(data.weight);
      setChangeWeight(false);
    };

    /*const {
      register: registerBirthDate,
      formState: { errors: errorsBirthDate },
      handleSubmit: handleSubmitBirthDate,
    } = useForm();

    // @ts-ignore
    const onSubmitBirthDate = (data) => {
      setBirthDate(data.newBirthDate);
      setChangeBirthDate(false);
    };*/

    const {
      register: registerDesiredWeight,
      formState: { errors: errorsDesiredWeight },
      handleSubmit: handleSubmitDesiredWeight,
    } = useForm();

    // @ts-ignore
    const onSubmitDesiredWeight = (data) => {
      setDesiredWeight(data.desiredWeight);
      setChangeDesiredWeight(false);
    };

    const {
      register: registerNutrients,
      formState: { errors: errorsNutrients },
      handleSubmit: handleSubmitNutrients,
    } = useForm();

    // @ts-ignore
    const onSubmitNutrients = (data) => {
      setNutrients(data);
      console.log()
    };

    const {
      register: registerPasswords,
      formState: { errors: errorsPasswords },
      handleSubmit: handleSubmitPasswords,
      getValues,
    } = useForm();

    // @ts-ignore
    const onSubmitPasswords = (data) => {
      setPasswords(data);
      console.log()
    };




    const [changeEmail, setChangeEmail] = useState<Boolean>(false);
    const [email, setEmail] = useState<String>("tvojemamka@gmail.com");

    const [changeNick, setChangeNick] = useState<Boolean>(false);
    const [nick, setNick] = useState<String>("debílek");

    const [changeName, setChangeName] = useState<Boolean>(false);
    const [name, setName] = useState<String>("Pepa");

    const [changeSurname, setChangeSurname] = useState<Boolean>(false);
    const [surname, setSurname] = useState<String>("Novák");
    
    const [changeSex, setChangeSex] = useState<Boolean>(false);
    const [sex, setSex] = useState<number>(50);
    const [newSex, setNewSex] = useState<number>(50);
    
    const [changeHeight, setChangeHeight] = useState<Boolean>(false);
    const [height, setHeight] = useState<number>(180);

    const [changeWeight, setChangeWeight] = useState<Boolean>(false);
    const [weight, setWeight] = useState<number>(75);

    const [changeBirthDate, setChangeBirthDate] = useState<Boolean>(false);
    const [birthDate, setBirthDate] = useState<Date | null>(new Date());
    const [newBirthDate, setNewBirthDate] = useState<Date | null>(new Date());

    const [changeDesiredWeight, setChangeDesiredWeight] = useState<Boolean>(false);
    const [desiredWeight, setDesiredWeight] = useState<number>(75);

    const [customNutrients, setCustomNutrients] = useState<Boolean>(false);
    const [nutrients, setNutrients] = useState<Nutrients>({proteins: 30, carbohydrates: 30, fats: 30, fiber: 30, salt: 30});

    const [changePasswords, setChangePasswords] = useState<Boolean>(false);
    const [Passwords, setPasswords] = useState<Passwords>({oldPassword: "", password: "", passwordAgain: ""});
    
    const [authState, setAuthState] = useState<Boolean>();
    const [isDesktop, setDesktop] = useState(window.innerWidth > 800);
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
                <TextField id="outlined-basic" label="Nový e-mail" variant="outlined" 
                  {...registerEmail("email", 
                    {
                      required: "Položka je povinná",
                      pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "Chybný email",
                      },
                    })}
                  error={!!errorsEmail?.email}
                  helperText={errorsEmail?.email ? errorsEmail.email.message : null}/>
                </Grid>   
                <Grid item xs={4}>
                <Button type="submit">Uložit</Button>
                </Grid>
              </Grid>
              </form> 
            }   

            {/* NICK */}
            <Grid
              container
              spacing={0}
              direction="row"
              //alignItems="center"
              justifyContent="center"
            >

              <Grid item xs={4}>
               <Typography>Přezdívka</Typography>
              </Grid>   
              <Grid item xs={4}>
               <Typography>{nick}</Typography>
              </Grid>   
              <Grid item xs={4}>
               {changeNick ?
               <CloseIcon onClick={() => setChangeNick(!changeNick)}/>
               :
               <SettingsIcon onClick={() => setChangeNick(!changeNick)}/>
               }
              </Grid>   

            </Grid> 
            {changeNick &&
              <form onSubmit={handleSubmitNick(onSubmitNick)}>
              <Grid
                container
                spacing={0}
                direction="row"
                //alignItems="center"
                justifyContent="center"
              >

                <Grid item xs={4} />
                
                <Grid item xs={4}>
                <TextField id="outlined-basic" label="Nová přezdívka" variant="outlined" 
                  {...registerNick("nick", {
                    required: "Položka je povinná",
                  })}
                  error={!!errorsNick?.nick}
                  helperText={errorsNick?.nick ? errorsNick.nick.message : null}/>
                </Grid>   
                <Grid item xs={4}>
                <Button type="submit">Uložit</Button>
                </Grid>
              </Grid>
              </form> 
            } 

            {/* NAME */}
            <Grid
              container
              spacing={0}
              direction="row"
              //alignItems="center"
              justifyContent="center"
            >

              <Grid item xs={4}>
               <Typography>Jméno</Typography>
              </Grid>   
              <Grid item xs={4}>
               <Typography>{name}</Typography>
              </Grid>   
              <Grid item xs={4}>
               {changeName ?
               <CloseIcon onClick={() => setChangeName(!changeName)}/>
               :
               <SettingsIcon onClick={() => setChangeName(!changeName)}/>
               }
              </Grid>   

            </Grid> 
            {changeName &&
              <form onSubmit={handleSubmitName(onSubmitName)}>
              <Grid
                container
                spacing={0}
                direction="row"
                //alignItems="center"
                justifyContent="center"
              >

                <Grid item xs={4} />
                
                <Grid item xs={4}>
                <TextField id="outlined-basic" label="Nové jméno" variant="outlined" 
                  {...registerName("name", {
                    required: "Položka je povinná",
                  })}
                  error={!!errorsName?.name}
                  helperText={errorsName?.name ? errorsName.name.message : null}/>
                </Grid>   
                <Grid item xs={4}>
                <Button type="submit">Uložit</Button>
                </Grid>
              </Grid>
              </form> 
            } 

            {/* SURNAME */}
            <Grid
              container
              spacing={0}
              direction="row"
              //alignItems="center"
              justifyContent="center"
            >

              <Grid item xs={4}>
               <Typography>Příjmení</Typography>
              </Grid>   
              <Grid item xs={4}>
               <Typography>{surname}</Typography>
              </Grid>   
              <Grid item xs={4}>
               {changeSurname ?
               <CloseIcon onClick={() => setChangeSurname(!changeSurname)}/>
               :
               <SettingsIcon onClick={() => setChangeSurname(!changeSurname)}/>
               }
              </Grid>   

            </Grid> 
            {changeSurname &&
              <form onSubmit={handleSubmitSurname(onSubmitSurname)}>
              <Grid
                container
                spacing={0}
                direction="row"
                //alignItems="center"
                justifyContent="center"
              >

                <Grid item xs={4} />
                
                <Grid item xs={4}>
                <TextField id="outlined-basic" label="Nové příjmení" variant="outlined" 
                  {...registerSurname("surname", {
                    required: "Položka je povinná",
                  })}
                  error={!!errorsSurname?.surname}
                  helperText={errorsSurname?.surname ? errorsSurname.surname.message : null}/>
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
              <Slider disabled value={sex} marks={marks}/>
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
                <Slider defaultValue={sex} 
                // @ts-ignore
                onChange={(e, data) => setNewSex(data)} marks={marks}/>
                </Grid>   
                <Grid item xs={4}>
                <Button onClick={()=> {setChangeSex(!changeSex); setSex(newSex)}}>Uložit</Button>
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
                <TextField id="outlined-basic" label="Nová výška" variant="outlined" {...registerHeight("height", {
                      required: "Položka je povinná",
                      min: {
                        value: 1,
                        message: "Minimální hodnota je 1",
                      },
                    })}
                    error={!!errorsHeight?.height}
                    helperText={errorsHeight?.height ? errorsHeight.height.message : null} />
                </Grid>   
                <Grid item xs={4}>
                <Button type="submit">Uložit</Button>
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
                <TextField id="outlined-basic" label="Nová hmotnost" variant="outlined" {...registerWeight("weight", {
                      required: "Položka je povinná",
                      min: {
                        value: 1,
                        message: "Minimální hodnota je 1",
                      },
                    })}
                    error={!!errorsWeight?.weight}
                    helperText={errorsWeight?.weight ? errorsWeight.weight.message : null} />
                </Grid>   
                <Grid item xs={4}>
                <Button type="submit">Uložit</Button>
                </Grid>
              </Grid> 
              </form>
            }

            


            {/* BIRTHDATE */}

            <Grid
              container
              spacing={0}
              direction="row"
              //alignItems="center"
              justifyContent="center"
            >

              <Grid item xs={4}>
               <Typography>Datum narození</Typography>
              </Grid>   
              <Grid item xs={4}>
              <Typography>{birthDate?.toLocaleDateString() }</Typography>
              </Grid>   
              <Grid item xs={4}>
               {changeBirthDate ?
               <CloseIcon onClick={() => setChangeBirthDate(!changeBirthDate)}/>
               :
               <SettingsIcon onClick={() => setChangeBirthDate(!changeBirthDate)}/>
               }
              </Grid>   

            </Grid> 
            {changeBirthDate &&
              <Grid
                container
                spacing={0}
                direction="row"
                //alignItems="center"
                justifyContent="center"
              >

                <Grid item xs={4} />
                
                <Grid item xs={4}>
                {isDesktop ? (
                    <DesktopDatePicker
                      label="Datum narození"
                      value={newBirthDate}
                      minDate={new Date("1900-01-01")}
                      onChange={(newValue) => {
                        setNewBirthDate(newValue);
                      }}
                      renderInput={(params: any) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  ) : (
                    <MobileDatePicker
                      label="Datum narození"
                      value={newBirthDate}
                      minDate={new Date("1900-01-01")}
                      onChange={(newValue) => {
                        setNewBirthDate(newValue);
                      }}
                      renderInput={(params: any) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  )}
                </Grid>   
                <Grid item xs={4}>
                  {newBirthDate?.toString() == "Invalid Date" || newBirthDate == null || newBirthDate < new Date("1900-01-01")
                  ?
                  <Button disabled>Uložit</Button> 
                  : 
                  <Button /*type="submit"*/ onClick={() => {setBirthDate(newBirthDate); setChangeBirthDate(!changeBirthDate)}}>Uložit</Button>}
                </Grid>
              </Grid>
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
                <Button type="submit">Uložit</Button>
                </Grid>
              </Grid> 
              </form>
            }

            <Grid
              container
              spacing={0}
              direction="row"
              //alignItems="center"
              justifyContent="center"
            >
              <Grid item >
              <Button
                  variant="contained"
                  disableRipple
                  sx={{
                    backgroundColor: "orange",
                    fontWeight: "bold",
                    transition: "transform 0.5s",
                    ":hover": {
                      transform: "scale(1.1)",
                      backgroundColor: "#f29830",
                    },
                  }}
                  onClick={() => setCustomNutrients(!customNutrients)}
                >
                  {customNutrients
                    ? "Skrýt nutrienty"
                    : "Upravit nutrienty"}
                </Button>
              </Grid>
            </Grid>

            {customNutrients && 
              /* BILKOVINY */ 
            <form onSubmit={handleSubmitNutrients(onSubmitNutrients)}>
              <Grid
                container
                spacing={0}
                direction="row"
                //alignItems="center"
                justifyContent="center"
              >

                <Grid item xs={4}>
                  <Typography>Bílkoviny</Typography>
                </Grid>
                
                <Grid item xs={4}>
                <TextField id="outlined-basic" label="" variant="outlined" {...registerNutrients("proteins")} />
                </Grid>
                <Grid item>
                <Typography>g</Typography>
                </Grid>
              </Grid> 

              <Grid
                container
                spacing={0}
                direction="row"
                //alignItems="center"
                justifyContent="center"
              >

                <Grid item xs={4}>
                  <Typography>Sacharidy</Typography>
                </Grid>
                
                <Grid item xs={4}>
                <TextField id="outlined-basic" label="" variant="outlined" {...registerNutrients("carbohydrates")} />
                </Grid>
                <Grid item>
                <Typography>g</Typography>
                </Grid>
              </Grid> 

              <Grid
                container
                spacing={0}
                direction="row"
                //alignItems="center"
                justifyContent="center"
              >

                <Grid item xs={4}>
                  <Typography>Tuky</Typography>
                </Grid>
                
                <Grid item xs={4}>
                <TextField id="outlined-basic" label="" variant="outlined" {...registerNutrients("fats")} />
                </Grid>
                <Grid item>
                <Typography>g</Typography>
                </Grid>
              </Grid> 

              <Grid
                container
                spacing={0}
                direction="row"
                //alignItems="center"
                justifyContent="center"
              >

                <Grid item xs={4}>
                  <Typography>Vláknina</Typography>
                </Grid>
                
                <Grid item xs={4}>
                <TextField id="outlined-basic" label="" variant="outlined" {...registerNutrients("fiber")} />
                </Grid>
                <Grid item>
                <Typography>g</Typography>
                </Grid>
              </Grid> 

              <Grid
                container
                spacing={0}
                direction="row"
                //alignItems="center"
                justifyContent="center"
              >

                <Grid item xs={4}>
                  <Typography>Sůl</Typography>
                </Grid>
                
                <Grid item xs={4}>
                <TextField id="outlined-basic" label="" variant="outlined" {...registerNutrients("salt")} />
                </Grid>
                <Grid item>
                <Typography>g</Typography>
                </Grid>
              </Grid> 
              <Button type="submit">Uložit</Button>
            </form>
            }

            <Button
              variant="contained"
              disableRipple
              sx={{
                backgroundColor: "orange",
                fontWeight: "bold",
                transition: "transform 0.5s",
                ":hover": {
                  transform: "scale(1.1)",
                  backgroundColor: "#f29830",
                },
              }}
              onClick={() => setCustomNutrients(!customNutrients)}
            >Změnit heslo</Button>



            <form onSubmit={handleSubmitPasswords(onSubmitPasswords)}>
              <Grid
                container
                spacing={0}
                direction="row"
                //alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Aktuální heslo"
                    fullWidth={true}
                    margin="normal"
                    variant="standard"
                    type="password"
                    /*InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                    }}*/
                    {...registerPasswords("oldPassword", {
                      required: "Položka je povinná",
                    })}
                    error={!!errorsPasswords?.oldPassword}
                    helperText={
                      errorsPasswords?.oldPassword ? errorsPasswords.oldPasswor.message : null
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Nové heslo"
                    fullWidth={true}
                    margin="normal"
                    variant="standard"
                    type="password"
                    /*InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                    }}*/
                    {...registerPasswords("password", {
                      required: "Položka je povinná",
                    })}
                    error={!!errorsPasswords?.password}
                    helperText={
                      errorsPasswords?.password ? errorsPasswords.password.message : null
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Nové heslo znovu"
                    fullWidth={true}
                    margin="normal"
                    variant="standard"
                    type="password"
                    /*InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                    }}*/
                    {...registerPasswords("passwordAgain", {
                      required: "Položka je povinná",
                      validate: (value) =>
                        value === getValues("password")
                          ? true
                          : "Hesla se neshodují",
                    })}
                    error={!!errorsPasswords?.passwordAgain}
                    helperText={
                      errorsPasswords?.passwordAgain
                        ? errorsPasswords.passwordAgain.message
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button type="submit">Uložit</Button>
                </Grid>
              </Grid>
              </form>        





        </Container>
      </Root>
    );
  };