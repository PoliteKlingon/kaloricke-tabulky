import { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import {
  Box,
  Button,
  Collapse,
  Grid,
  InputAdornment,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { styled } from "@mui/system";
import { AccountCircle, Lock } from "@mui/icons-material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { useForm } from "react-hook-form";
import slides from "../static/slideshow";
// @ts-ignore
import ChangingImage from "./ChangingImage";

import axios from "../api/axios";
import sha256 from "crypto-js/sha256";
import { userRegister } from "../utils/Utils";
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

const LogoImage = styled("img")({
  width: 200,
});

const InputContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  maxWidth: "800px",
  justifyContent: "center",
  justifySelf: "center",
  alignContent: "center",
});

const FillDiv = styled("div")({
  height: 20,
});

const Register = () => {
  const [seconds, setSeconds] = useState(0);
  const [ownGoals, setOwnGoals] = useState(false);
  // @ts-ignore
  const { setAuth } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const [date, setDate] = useState<Date | null>(new Date());
  const [sex, setSex] = useState(0.5);

  const [isDesktop, setDesktop] = useState(window.innerWidth > 800);

  const updateSex = (e:any, data:any) => {
    setSex(data / 100.0);
  };

  const updateMedia = () => {
    setDesktop(window.innerWidth > 800);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError
  } = useForm();
  const onSubmit = async () => {
    let goals;
    const userData = {
      email: getValues("email"),
      passwordHash: String(sha256(getValues("password"))),
      username: getValues("username"),
      name: getValues("name"),
      surname: getValues("surname"),
      height: +getValues("height"),
      weight: +getValues("weight"),
      birthdate:
        date?.getFullYear() +
        "-" +
        (date?.getMonth()! + 1) +
        "-" +
        date?.getDate(),
      sex: sex,
    };
    if (ownGoals) {
      goals = {
        calories: +getValues("calories"),
        proteins: +getValues("proteins"),
        carbs: +getValues("carbs"),
        fats: +getValues("fats"),
        fiber: +getValues("fiber"),
        salt: +getValues("salt"),
      };
    }

    // @ts-ignore
    const res = await userRegister(userData, goals);
    // @ts-ignore
    if (res.status) {
      // @ts-ignore
      setAuth(JSON.parse(window.localStorage.getItem("auth")));
      setSuccess(true);
    } else {
      // @ts-ignore
      if (res.err === null) {
        // @ts-ignore
        setError("email", { message: res.message });
      }
    }
  }

  return success ? (
    <Navigate to="/" />
  ) : (
    <div style={{ fontSize: 15 }}>
      <Grid container sx={{ minHeight: "100vh" }}>
        <Grid item xs={12} sm={6} sx={{ minHeight: "50vh" }}>
          <ChangingImage slides={slides} interval={5000} />
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={6}
          sx={{ p: 10 }}
          alignItems="center"
          direction="column"
          justifyContent="space-between"
        >
          <div />
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputContainer>
              <Grid container justifyContent={"center"}>
                <LogoImage
                  src={
                    import.meta.env.VITE_PUBLIC_URL +
                    "/assets/logo-placeholder.png"
                  }
                  alt="logo"
                />
              </Grid>

              <Grid container columnSpacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    fullWidth={true}
                    margin="normal"
                    variant="standard"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AlternateEmailIcon />
                        </InputAdornment>
                      ),
                    }}
                    {...register("email", {
                      required: "Položka je povinná",
                      pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "Chybný email",
                      },
                    })}
                    error={!!errors?.email}
                    helperText={errors?.email ? errors.email.message : null}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Přezdívka"
                    fullWidth={true}
                    margin="normal"
                    variant="standard"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                    {...register("username", {
                      required: "Položka je povinná",
                    })}
                    error={!!errors?.username}
                    helperText={
                      errors?.username ? errors.username.message : null
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Heslo"
                    fullWidth={true}
                    margin="normal"
                    variant="standard"
                    type="password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                    }}
                    {...register("password", {
                      required: "Položka je povinná",
                    })}
                    error={!!errors?.password}
                    helperText={
                      errors?.password ? errors.password.message : null
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Heslo znovu"
                    fullWidth={true}
                    margin="normal"
                    variant="standard"
                    type="password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                    }}
                    {...register("passwordAgain", {
                      required: "Položka je povinná",
                      validate: (value) =>
                        value === getValues("password")
                          ? true
                          : "Hesla se neshodují",
                    })}
                    error={!!errors?.passwordAgain}
                    helperText={
                      errors?.passwordAgain
                        ? errors.passwordAgain.message
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Jméno"
                    fullWidth={true}
                    margin="normal"
                    variant="standard"
                    {...register("name", {
                      required: "Položka je povinná",
                    })}
                    error={!!errors?.name}
                    helperText={errors?.name ? errors.name.message : null}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Příjmení"
                    fullWidth={true}
                    margin="normal"
                    variant="standard"
                    {...register("surname", {
                      required: "Položka je povinná",
                    })}
                    error={!!errors?.surname}
                    helperText={errors?.surname ? errors.surname.message : null}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Výška"
                    fullWidth={true}
                    margin="normal"
                    variant="standard"
                    type="number"
                    {...register("height", {
                      required: "Položka je povinná",
                      min: {
                        value: 1,
                        message: "Minimální hodnota je 1",
                      },
                    })}
                    error={!!errors?.height}
                    helperText={errors?.height ? errors.height.message : null}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Váha"
                    fullWidth={true}
                    margin="normal"
                    variant="standard"
                    type="number"
                    {...register("weight", {
                      required: "Položka je povinná",
                      min: {
                        value: 1,
                        message: "Minimální hodnota je 1",
                      },
                    })}
                    error={!!errors?.weight}
                    helperText={errors?.weight ? errors.weight.message : null}
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ pt: 3 }}>
                  {isDesktop ? (
                    <DesktopDatePicker
                      label="Datum narození"
                      value={date}
                      minDate={new Date("1900-01-01")}
                      onChange={(newValue) => {
                        setDate(newValue);
                      }}
                      renderInput={(params: any) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  ) : (
                    <MobileDatePicker
                      label="Datum narození"
                      value={date}
                      minDate={new Date("1900-01-01")}
                      onChange={(newValue) => {
                        setDate(newValue);
                      }}
                      renderInput={(params: any) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  )}
                </Grid>
                <Grid item xs={12} sm={6} sx={{ pt: 2 }}>
                  <Typography>Pohlaví</Typography>
                  <Slider
                    size="small"
                    defaultValue={50}
                    valueLabelDisplay="auto"
                    aria-label="Slider pohlaví"
                    marks={marks}
                    onChange={updateSex}
                  />
                </Grid>
                <Grid item>
                  <Collapse
                    sx={{ width: "100%" }}
                    in={ownGoals}
                    {...{ timeout: 1200 }}
                    collapsedSize="0px"
                  >
                    <Grid
                      container
                      item
                      xs={12}
                      rowSpacing={2}
                      columnSpacing={2}
                    >
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Požadované Kalorie"
                          fullWidth={true}
                          margin="normal"
                          variant="standard"
                          type="number"
                          {...register("calories", {
                            required: {
                              value: ownGoals,
                              message: "Položka je povinná",
                            },
                            min: {
                              value: 0,
                              message: "Minimální hodnota je 0",
                            },
                          })}
                          error={!!errors?.calories}
                          helperText={
                            errors?.calories ? errors.calories.message : null
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Požadované Bílkoviny"
                          fullWidth={true}
                          margin="normal"
                          variant="standard"
                          type="number"
                          {...register("proteins", {
                            required: {
                              value: ownGoals,
                              message: "Položka je povinná",
                            },
                            min: {
                              value: 0,
                              message: "Minimální hodnota je 0",
                            },
                          })}
                          error={!!errors?.proteins}
                          helperText={
                            errors?.proteins ? errors.proteins.message : null
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Požadované Sacharidy"
                          fullWidth={true}
                          margin="normal"
                          variant="standard"
                          type="number"
                          {...register("carbs", {
                            required: {
                              value: ownGoals,
                              message: "Položka je povinná",
                            },
                            min: {
                              value: 0,
                              message: "Minimální hodnota je 0",
                            },
                          })}
                          error={!!errors?.carbs}
                          helperText={
                            errors?.carbs ? errors.carbs.message : null
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Požadované Tuky"
                          fullWidth={true}
                          margin="normal"
                          variant="standard"
                          type="number"
                          {...register("fats", {
                            required: {
                              value: ownGoals,
                              message: "Položka je povinná",
                            },
                            min: {
                              value: 0,
                              message: "Minimální hodnota je 0",
                            },
                          })}
                          error={!!errors?.fats}
                          helperText={errors?.fats ? errors.fats.message : null}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Požadovaná Vláknina"
                          fullWidth={true}
                          margin="normal"
                          variant="standard"
                          type="number"
                          {...register("fiber", {
                            required: {
                              value: ownGoals,
                              message: "Položka je povinná",
                            },
                            min: {
                              value: 0,
                              message: "Minimální hodnota je 0",
                            },
                          })}
                          error={!!errors?.fiber}
                          helperText={
                            errors?.fiber ? errors.fiber.message : null
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Požadovaná Sůl"
                          fullWidth={true}
                          margin="normal"
                          variant="standard"
                          type="number"
                          {...register("salt", {
                            required: {
                              value: ownGoals,
                              message: "Položka je povinná",
                            },
                            min: {
                              value: 0,
                              message: "Minimální hodnota je 0",
                            },
                          })}
                          error={!!errors?.salt}
                          helperText={errors?.salt ? errors.salt.message : null}
                        />
                      </Grid>
                    </Grid>
                  </Collapse>
                </Grid>
              </Grid>

              <FillDiv />
              <Stack spacing={2}>
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
                  onClick={() => setOwnGoals(!ownGoals)}
                >
                  {ownGoals
                    ? "Nechci přidat vlastní cíle"
                    : "Chci přidat vlastní cíle"}
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  sx={{
                    fontWeight: "bold",
                    transition: "transform 0.5s",
                    ":hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                  disableRipple
                >
                  Registrovat
                </Button>
              </Stack>

              <FillDiv />
              <Grid container justifyContent="center">
                <Grid item>
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <Button
                      disableRipple
                      sx={{
                        transition: "transform 0.5s",
                        ":hover": {
                          transform: "scale(1.1)",
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      Už máš účet?
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </InputContainer>
          </form>
          <Grid container justifyContent="center">
            <Grid item>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button>Zpět na hlavní stránku</Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
