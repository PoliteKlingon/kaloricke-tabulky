import React from 'react'

import {
    AppBar,
    Button,
    Collapse,
    Grid,
    InputAdornment,
    Slider,
    Stack,
    Toolbar,
    Typography,
  } from "@mui/material";
  import TextField from '@mui/material/TextField';
  import { styled } from "@mui/system";
  import { useContext, useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  import useScrollTrigger from "@mui/material/useScrollTrigger";
  import Slide from "@mui/material/Slide";
  import AuthContext from "../../context/AuthProvider";
  import SettingsIcon from '@mui/icons-material/Settings';
  import CloseIcon from '@mui/icons-material/Close';
  import { useForm, SubmitHandler } from "react-hook-form";
  import { DesktopDatePicker, MobileDatePicker } from '@mui/x-date-pickers';
  import './UserDetails.css'
  
  const HideOnScroll = ({children}:any) => {
    const trigger = useScrollTrigger({ disableHysteresis: true });
    return <Slide appear={false} direction="down" in={!trigger}>{children}</Slide>;
  }
  
  const AnimatedButton = styled(Button)({
    fontSize: 30,
    fontFamily: "Nunito",
    fontWeight: "bold",
    transition: "transform 0.2s",
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
      setCustomNutrients(!customNutrients);
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
      setChangePasswords(!changePasswords);
    };




    const [changeEmail, setChangeEmail] = useState<boolean>(false);
    const [email, setEmail] = useState<String>("tvojemamka@gmail.com");

    const [changeNick, setChangeNick] = useState<boolean>(false);
    const [nick, setNick] = useState<String>("debílek");

    const [changeName, setChangeName] = useState<boolean>(false);
    const [name, setName] = useState<String>("Pepa");

    const [changeSurname, setChangeSurname] = useState<boolean>(false);
    const [surname, setSurname] = useState<String>("Novák");
    
    const [changeSex, setChangeSex] = useState<boolean>(false);
    const [sex, setSex] = useState<number>(50);
    const [newSex, setNewSex] = useState<number>(50);
    
    const [changeHeight, setChangeHeight] = useState<boolean>(false);
    const [height, setHeight] = useState<number>(180);

    const [changeWeight, setChangeWeight] = useState<boolean>(false);
    const [weight, setWeight] = useState<number>(75);

    const [changeBirthDate, setChangeBirthDate] = useState<boolean>(false);
    const [birthDate, setBirthDate] = useState<Date | null>(new Date());
    const [newBirthDate, setNewBirthDate] = useState<Date | null>(new Date());

    const [changeDesiredWeight, setChangeDesiredWeight] = useState<boolean>(false);
    const [desiredWeight, setDesiredWeight] = useState<number>(75);

    const [customNutrients, setCustomNutrients] = useState<boolean>(false);
    const [nutrients, setNutrients] = useState<Nutrients>({proteins: 30, carbohydrates: 30, fats: 30, fiber: 30, salt: 30});

    const [changePasswords, setChangePasswords] = useState<boolean>(false);
    const [Passwords, setPasswords] = useState<Passwords>({oldPassword: "", password: "", passwordAgain: ""});
    
    const [authState, setAuthState] = useState<boolean>();
    const [isDesktop, setDesktop] = useState(window.innerWidth > 800);
      // @ts-ignore
    const { auth, setAuth } = useContext(AuthContext);
    useEffect(() => {
      setAuthState(!(Object.keys(auth).length === 0 || auth === undefined));
    }, [auth]);
  
    const closeAll = () => {
      setChangeEmail(false);
      setChangeSex(false);
      setChangeNick(false);
      setChangeName(false);
      setChangeSurname(false);
      setChangeHeight(false);
      setChangeWeight(false);
      setChangeBirthDate(false);
      setChangeDesiredWeight(false);
      setCustomNutrients(false);
      setChangePasswords(false);
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
          <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}
            variant="h3"
            component="h2"
            textAlign={isDesktop ? "left" : "center"}
            paddingY={5}
            paddingX={15}
            >
              Osobní údaje
          </Typography>

          <Grid container
            justifyItems={"space-around"}
            direction={"row"}
          >
            <Grid item xs={isDesktop ? 6 : 12 }>
              {/* EMAIL */}
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  sx={{ margin: 1 }}
                  justifyContent="center"
                >

                  <Grid item xs={4}>
                  <Typography 
                    sx={{ 
                      fontFamily: "Nunito",
                    }}
                  >E-mail</Typography>
                  </Grid>   
                  <Grid item xs={4}>
                  <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>{email}</Typography>
                  </Grid>   
                  <Grid item xs={4}>
                  {changeEmail ?
                  <CloseIcon onClick={() => setChangeEmail(!changeEmail)}/>
                  :
                  <SettingsIcon onClick={() => {closeAll(); setChangeEmail(!changeEmail)}}/>
                  }
                  </Grid>   

                </Grid> 
                <Collapse
                  sx={{ width: "100%" }}
                  in={changeEmail}
                  {...{ timeout: 500 }}
                  collapsedSize="0px"
                >
                  <form onSubmit={handleSubmitEmail(onSubmitEmail)}>
                  <Grid
                    container
                    spacing={0}
                    direction="row"
                    sx={{ margin: 1 }}
                    justifyContent="center"
                  >

                    <Grid item xs={4} />
                    
                    <Grid item xs={4}>
                    <TextField  
                      label="Nový e-mail"
                      variant="standard" 
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
                </Collapse>

                {/* NICK */}
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  sx={{ margin: 1 }}
                  justifyContent="center"
                >

                  <Grid item xs={4}>
                  <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>Přezdívka</Typography>
                  </Grid>   
                  <Grid item xs={4}>
                  <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>{nick}</Typography>
                  </Grid>   
                  <Grid item xs={4}>
                  {changeNick ?
                  <CloseIcon onClick={() => setChangeNick(!changeNick)}/>
                  :
                  <SettingsIcon onClick={() => {closeAll(); setChangeNick(!changeNick)}}/>
                  }
                  </Grid>   

                </Grid> 
                <Collapse
                  sx={{ width: "100%" }}
                  in={changeNick}
                  {...{ timeout: 500 }}
                  collapsedSize="0px"
                >
                  <form onSubmit={handleSubmitNick(onSubmitNick)}>
                  <Grid
                    container
                    spacing={0}
                    direction="row"
                    sx={{ margin: 1 }}
                    justifyContent="center"
                  >

                    <Grid item xs={4} />
                    
                    <Grid item xs={4}>
                    <TextField 
                      label="Nová přezdívka" 
                      variant="standard" 
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
                </Collapse>

                {/* NAME */}
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  sx={{ margin: 1 }}
                  justifyContent="center"
                >

                  <Grid item xs={4}>
                  <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>Jméno</Typography>
                  </Grid>   
                  <Grid item xs={4}>
                  <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>{name}</Typography>
                  </Grid>   
                  <Grid item xs={4}>
                  {changeName ?
                  <CloseIcon onClick={() => setChangeName(!changeName)}/>
                  :
                  <SettingsIcon onClick={() => {closeAll(); setChangeName(!changeName)}}/>
                  }
                  </Grid>   

                </Grid> 
                <Collapse
                  sx={{ width: "100%" }}
                  in={changeName}
                  {...{ timeout: 500 }}
                  collapsedSize="0px"
                >
                  <form onSubmit={handleSubmitName(onSubmitName)}>
                  <Grid
                    container
                    spacing={0}
                    direction="row"
                    sx={{ margin: 1 }}
                    justifyContent="center"
                  >

                    <Grid item xs={4} />
                    
                    <Grid item xs={4}>
                    <TextField 
                      label="Nové jméno" 
                      variant="standard" 
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
                </Collapse>

                {/* SURNAME */}
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  sx={{ margin: 1 }}
                  justifyContent="center"
                >

                  <Grid item xs={4}>
                  <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>Příjmení</Typography>
                  </Grid>   
                  <Grid item xs={4}>
                  <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>{surname}</Typography>
                  </Grid>   
                  <Grid item xs={4}>
                  {changeSurname ?
                  <CloseIcon onClick={() => setChangeSurname(!changeSurname)}/>
                  :
                  <SettingsIcon onClick={() => {closeAll(); setChangeSurname(!changeSurname)}}/>
                  }
                  </Grid>   

                </Grid> 
                <Collapse
                  sx={{ width: "100%" }}
                  in={changeSurname}
                  {...{ timeout: 500 }}
                  collapsedSize="0px"
                >
                  <form onSubmit={handleSubmitSurname(onSubmitSurname)}>
                  <Grid
                    container
                    spacing={0}
                    direction="row"
                    sx={{ margin: 1 }}
                    justifyContent="center"
                  >

                    <Grid item xs={4} />
                    
                    <Grid item xs={4}>
                    <TextField 
                      label="Nové příjmení" 
                      variant="standard" 
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
                </Collapse>

                {/* SEX */}

                <Grid
                  container
                  spacing={0}
                  direction="row"
                  sx={{ margin: 1 }}
                  justifyContent="center"
                >

                  <Grid item xs={4}>
                  <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>Pohlaví</Typography>
                  </Grid>   
                  <Grid item xs={4}>
                  <Slider disabled track={false} value={sex} marks={marks}/>
                  </Grid>   
                  <Grid item xs={4}>
                  {changeSex ?
                  <CloseIcon onClick={() => setChangeSex(!changeSex)}/>
                  :
                  <SettingsIcon onClick={() => {closeAll(); setChangeSex(!changeSex)}}/>
                  }
                  </Grid>   

                </Grid> 
                <Collapse
                  sx={{ width: "100%" }}
                  in={changeSex}
                  {...{ timeout: 500 }}
                  collapsedSize="0px"
                >
                  <Grid
                    container
                    spacing={0}
                    direction="row"
                    sx={{ margin: 1 }}
                    justifyContent="center"
                  >

                    <Grid item xs={4} />
                    
                    <Grid item xs={4}>
                    <Slider track={false} defaultValue={sex} 
                    // @ts-ignore
                    onChange={(e, data) => setNewSex(data)} marks={marks}/>
                    </Grid>   
                    <Grid item xs={4}>
                    <Button onClick={()=> {setChangeSex(!changeSex); setSex(newSex)}}>Uložit</Button>
                    </Grid>
                  </Grid> 
                </Collapse>

                {/* HEIGHT */}

                <Grid
                  container
                  spacing={0}
                  direction="row"
                  sx={{ margin: 1 }}
                  justifyContent="center"
                >

                  <Grid item xs={4}>
                  <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>Výška</Typography>
                  </Grid>   
                  <Grid item xs={4}>
                  <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>{height} cm</Typography>
                  </Grid>   
                  <Grid item xs={4}>
                  {changeHeight ?
                  <CloseIcon onClick={() => setChangeHeight(!changeHeight)}/>
                  :
                  <SettingsIcon onClick={() => {closeAll(); setChangeHeight(!changeHeight)}}/>
                  }
                  </Grid>   

                </Grid> 
                <Collapse
                  sx={{ width: "100%" }}
                  in={changeHeight}
                  {...{ timeout: 500 }}
                  collapsedSize="0px"
                >
                  <form onSubmit={handleSubmitHeight(onSubmitHeight)}>
                  <Grid
                    container
                    spacing={0}
                    direction="row"
                    sx={{ margin: 1 }}
                    justifyContent="center"
                  >

                    <Grid item xs={4} />
                    
                    <Grid item xs={4}>
                    <TextField  
                      label="Nová výška" 
                      variant="standard" 
                      InputProps={{
                        endAdornment: <InputAdornment position="start">cm</InputAdornment>,
                      }}
                      type="number"
                      {...registerHeight("height", {
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
                </Collapse>

                {/* WEIGHT */}

                <Grid
                  container
                  spacing={0}
                  direction="row"
                  sx={{ margin: 1 }}
                  justifyContent="center"
                >

                  <Grid item xs={4}>
                  <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>Hmotnost</Typography>
                  </Grid>   
                  <Grid item xs={4}>
                  <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>{weight} kg</Typography>
                  </Grid>   
                  <Grid item xs={4}>
                  {changeWeight ?
                  <CloseIcon onClick={() => setChangeWeight(!changeWeight)}/>
                  :
                  <SettingsIcon onClick={() => {closeAll(); setChangeWeight(!changeWeight)}}/>
                  }
                  </Grid>   

                </Grid> 
                <Collapse
                  sx={{ width: "100%" }}
                  in={changeWeight}
                  {...{ timeout: 500 }}
                  collapsedSize="0px"
                >
                  <form onSubmit={handleSubmitWeight(onSubmitWeight)}>
                  <Grid
                    container
                    spacing={0}
                    direction="row"
                    sx={{ margin: 1 }}
                    justifyContent="center"
                  >

                    <Grid item xs={4} />
                    
                    <Grid item xs={4}>
                    <TextField
                          label="Nová hmotnost" 
                          variant="standard" 
                          type= "number"
                          InputProps={{
                            endAdornment: <InputAdornment position="start">kg</InputAdornment>,
                          }}
                          {...registerWeight("weight", {
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
                </Collapse>

                {/* BIRTHDATE */}

                <Grid
                  container
                  spacing={0}
                  direction="row"
                  sx={{ margin: 1 }}
                  justifyContent="center"
                >

                  <Grid item xs={4}>
                  <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>Datum narození</Typography>
                  </Grid>   
                  <Grid item xs={4}>
                  <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>{birthDate?.toLocaleDateString() }</Typography>
                  </Grid>   
                  <Grid item xs={4}>
                  {changeBirthDate ?
                  <CloseIcon onClick={() => setChangeBirthDate(!changeBirthDate)}/>
                  :
                  <SettingsIcon onClick={() => {closeAll(); setChangeBirthDate(!changeBirthDate)}}/>
                  }
                  </Grid>   

                </Grid> 
                <Collapse
                  sx={{ width: "100%" }}
                  in={changeBirthDate}
                  {...{ timeout: 500 }}
                  collapsedSize="0px"
                >
                  <Grid
                    container
                    spacing={0}
                    direction="row"
                    sx={{ margin: 1 }}
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
                </Collapse>

                {/* DESIRED WEIGHT */}
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  sx={{ margin: 1 }}
                  justifyContent="center"
                >

                  <Grid item xs={4}>
                  <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>Cílová hmotnost</Typography>
                  </Grid>   
                  <Grid item xs={4}>
                  <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>{desiredWeight} kg</Typography>
                  </Grid>   
                  <Grid item xs={4}>
                  {changeDesiredWeight ?
                  <CloseIcon onClick={() => setChangeDesiredWeight(!changeDesiredWeight)}/>
                  :
                  <SettingsIcon onClick={() => {closeAll(); setChangeDesiredWeight(!changeDesiredWeight)}}/>
                  }
                  </Grid>   

                </Grid> 
                <Collapse
                  sx={{ width: "100%" }}
                  in={changeDesiredWeight}
                  {...{ timeout: 500 }}
                  collapsedSize="0px"
                >
                  <form onSubmit={handleSubmitDesiredWeight(onSubmitDesiredWeight)}>
                  <Grid
                    container
                    spacing={0}
                    direction="row"
                    sx={{ margin: 1 }}
                    justifyContent="center"
                  >

                    <Grid item xs={4} />
                    
                    <Grid item xs={4}>
                    <TextField 
                      label="Nová cílová hmotnost" 
                      variant="standard" 
                      type= "number"
                      InputProps={{
                        endAdornment: <InputAdornment position="start">kg</InputAdornment>,
                      }}
                      {...registerDesiredWeight("desiredWeight", {
                        required: "Položka je povinná",
                        min: {
                          value: 1,
                          message: "Minimální hodnota je 1",
                        },
                      })}
                      error={!!errorsDesiredWeight?.desiredWeight}
                      helperText={errorsDesiredWeight?.desiredWeight ? errorsDesiredWeight.desiredWeight.message : null} />
                    </Grid>   
                    <Grid item xs={4}>
                    <Button type="submit">Uložit</Button>
                    </Grid>
                  </Grid> 
                  </form>
                </Collapse>

                {/* CUSTOM NUTRIENTS*/}
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  sx={{ margin: 0 }}
                  justifyContent="center"
                >
                  <Grid item >
                  <Button
                      variant="contained"
                      disableRipple
                      
                      sx={{
                        backgroundColor: "orange",
                        fontWeight: "bold",
                        margin: 1,
                        width: 250,
                        transition: "transform 0.2s",
                        ":hover": {
                          transform: "scale(1.1)",
                          backgroundColor: "#f29830",
                        },
                      }}
                      onClick={() => {closeAll(); setCustomNutrients(!customNutrients)}}
                    >
                      {customNutrients
                        ? "Skrýt nutrienty"
                        : "Upravit nutrienty"}
                    </Button>
                  </Grid>
                </Grid>

                <Collapse
                        sx={{ width: "100%" }}
                        in={customNutrients}
                        {...{ timeout: 500 }}
                        collapsedSize="0px"
                      >
                <form onSubmit={handleSubmitNutrients(onSubmitNutrients)}>
                  <Grid
                    container
                    spacing={0}
                    direction="row"
                    sx={{ margin: 1 }}
                    justifyContent="center"
                  >

                    <Grid item xs={4}>
                      <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>Bílkoviny</Typography>
                    </Grid>
                    
                    <Grid item xs={4}>
                    <TextField 
                      defaultValue={nutrients.proteins} 
                      label="" 
                      variant="standard" 
                      type="number"
                      sx= {{width: 70}}
                      InputProps={{
                        endAdornment: <InputAdornment position="start">g</InputAdornment>,
                      }}
                      {...registerNutrients("proteins", {
                        required: "Položka je povinná",
                        min: {
                          value: 1,
                          message: "Minimální hodnota je 1",
                        },
                      })}
                      error={!!errorsNutrients?.proteins}
                      helperText={errorsNutrients?.proteins ? errorsNutrients.proteins.message : null} />
                    </Grid>
                    <Grid item />
                  </Grid> 

                  <Grid
                    container
                    spacing={0}
                    direction="row"
                    sx={{ margin: 1 }}
                    justifyContent="center"
                  >

                    <Grid item xs={4}>
                      <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>Sacharidy</Typography>
                    </Grid>
                    
                    <Grid item xs={4}>
                    <TextField 
                      defaultValue={nutrients.carbohydrates} 
                      label="" 
                      variant="standard"  
                      type="number"
                      sx= {{width: 70}}
                      InputProps={{
                        endAdornment: <InputAdornment position="start">g</InputAdornment>,
                      }}
                      {...registerNutrients("carbohydrates", {
                        required: "Položka je povinná",
                        min: {
                          value: 1,
                          message: "Minimální hodnota je 1",
                        },
                      })}
                      error={!!errorsNutrients?.carbohydrates}
                      helperText={errorsNutrients?.carbohydrates ? errorsNutrients.carbohydrates.message : null} />
                    </Grid>
                    <Grid item />
                  </Grid> 

                  <Grid
                    container
                    spacing={0}
                    direction="row"
                    sx={{ margin: 1 }}
                    justifyContent="center"
                  >

                    <Grid item xs={4}>
                      <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>Tuky</Typography>
                    </Grid>
                    
                    <Grid item xs={4}>
                    <TextField 
                      defaultValue={nutrients.fats}
                      label=""
                      variant="standard" 
                      type="number"
                      sx= {{width: 70}}
                      InputProps={{
                        endAdornment: <InputAdornment position="start">g</InputAdornment>,
                      }}
                      {...registerNutrients("fats", {
                        required: "Položka je povinná",
                        min: {
                          value: 1,
                          message: "Minimální hodnota je 1",
                        },
                      })}
                      error={!!errorsNutrients?.fats}
                      helperText={errorsNutrients?.fats ? errorsNutrients.fats.message : null} />
                    </Grid>
                    <Grid item />
                  </Grid> 

                  <Grid
                    container
                    spacing={0}
                    direction="row"
                    sx={{ margin: 1 }}
                    justifyContent="center"
                  >

                    <Grid item xs={4}>
                      <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>Vláknina</Typography>
                    </Grid>
                    
                    <Grid item xs={4}>
                    <TextField 
                      defaultValue={nutrients.fiber}
                      label="" 
                      variant="standard" 
                      type="number"
                      sx= {{width: 70}}
                      InputProps={{
                        endAdornment: <InputAdornment position="start">g</InputAdornment>,
                      }}
                      {...registerNutrients("fiber", {
                        required: "Položka je povinná",
                        min: {
                          value: 1,
                          message: "Minimální hodnota je 1",
                        },
                      })}
                      error={!!errorsNutrients?.fiber}
                      helperText={errorsNutrients?.fiber ? errorsNutrients.fiber.message : null} />
                    </Grid>
                    <Grid item />
                  </Grid> 

                  <Grid
                    container
                    spacing={0}
                    direction="row"
                    sx={{ margin: 1 }}
                    justifyContent="center"
                  >

                    <Grid item xs={4}>
                      <Typography sx={{ flexGrow: "1", fontFamily: "Nunito" }}>Sůl</Typography>
                    </Grid>
                    
                    <Grid item xs={4}>
                    <TextField 
                      defaultValue={nutrients.salt} 
                      label="" 
                      variant="standard" 
                      type="number"
                      sx= {{width: 70}}
                      InputProps={{
                        endAdornment: <InputAdornment position="start">g</InputAdornment>,
                      }}
                      {...registerNutrients("salt", {
                        required: "Položka je povinná",
                        min: {
                          value: 1,
                          message: "Minimální hodnota je 1",
                        },
                      })}
                      error={!!errorsNutrients?.salt}
                      helperText={errorsNutrients?.salt ? errorsNutrients.salt.message : null} />
                    </Grid>
                    <Grid item />
                  </Grid> 
                  <Button sx={{width: 250}} type="submit">Uložit</Button>
                </form>
                </Collapse>

              {/* CHANGE PASSWORD */}
                <Button
                  variant="contained"
                  disableRipple
                  sx={{
                    backgroundColor: "orange",
                    fontWeight: "bold",
                    margin: 1,
                    width: 250,
                    transition: "transform 0.2s",
                    ":hover": {
                      transform: "scale(1.1)",
                      backgroundColor: "#f29830",
                    },
                  }}
                  onClick={() => {closeAll(); setChangePasswords(!changePasswords)}}
                >{changePasswords ? "Zrušit" : "Změnit heslo"}</Button>

                <Collapse
                  sx={{ width: "100%" }}
                  in={changePasswords}
                  {...{ timeout: 500 }}
                  collapsedSize="0px"
                >
                <form onSubmit={handleSubmitPasswords(onSubmitPasswords)}>
                  <Grid
                    container
                    spacing={0}
                    direction="row"
                    sx={{ margin: 1 }}
                    justifyContent="center"
                  >
                    <Grid item xs={0} sm={2} md={3} lg={4}/>
                    <Grid item xs={12} sm={8} md={6} lg={4}>
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
                          errorsPasswords?.oldPassword ? errorsPasswords.oldPassword.message : null
                        }
                      />
                    </Grid>
                    <Grid item xs={0} sm={2} md={3} lg={4}/>
                    <Grid item xs={0} sm={2} md={3} lg={4}/>
                    <Grid item xs={12} sm={8} md={6} lg={4}>
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
                    <Grid item xs={0} sm={2} md={3} lg={4}/>
                    <Grid item xs={0} sm={2} md={3} lg={4}/>
                    <Grid item xs={12} sm={8} md={6} lg={4}>
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
                    <Grid item xs={0} sm={2} md={3} lg={4}/>
                    <Grid item xs={12} sm={12}>
                      <Button sx={{width: 250}} type="submit">Uložit</Button>
                    </Grid>
                  </Grid>
                  </form>        
                </Collapse>
              </Grid>
              {isDesktop &&
              <Grid item xs={6}>
                <img src="https://www.budgetbytes.com/wp-content/uploads/2013/07/How-to-Calculate-Recipe-Costs-H.jpg" alt="" />
              </Grid>
              }         
            </Grid>
        </Container>
      </Root>
    );
  };