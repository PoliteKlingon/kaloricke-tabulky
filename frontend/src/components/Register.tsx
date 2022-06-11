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
const marks = [
  {
    value: 5,
    label: "Female",
  },
  {
    value: 95,
    label: "Male",
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
  const [sex, setSex] = useState(50);

  const [isDesktop, setDesktop] = useState(window.innerWidth > 800);

  const updateSex = (e:any, data:any) => {
    setSex(data / 100.0);
    console.log(
      date?.getFullYear() + "-" + (date?.getMonth()! + 1) + "-" + date?.getDate()
    );
  };

  const updateMedia = () => {
    setDesktop(window.innerWidth > 800);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const onSubmit = async (e: any) => {
    const request = ownGoals
      ? {
          credentials: {
            email: getValues("email"),
            password: String(sha256(getValues("password"))),
          },
          details: {
            useername: getValues("username"),
            name: getValues("name"),
            surname: getValues("surname"),
            height: +getValues("height"),
            weight: +getValues("weight"),
            birthdate:
              date?.getFullYear() + "-" + (date?.getMonth()! + 1) + "-" + date?.getDate(),
            sex: sex,
            email: getValues("email"),
          },
          goals: {
            calories: +getValues("calories"),
            proteins: +getValues("proteins"),
            carbs: +getValues("carbs"),
            fats: +getValues("fats"),
            fiber: +getValues("fiber"),
            salt: +getValues("salt"),
          },
        }
      : {
          credentials: {
            email: getValues("email"),
            password: sha256(getValues("password")),
          },
          details: {
            useername: getValues("username"),
            name: getValues("name"),
            surname: getValues("surname"),
            height: +getValues("height"),
            weight: +getValues("weight"),
            birthdate:
              date?.getFullYear() + "-" + (date?.getMonth()! + 1) + "-" + date?.getDate(),
            sex: sex,
            email: getValues("email"),
          },
        };
    console.log(request);

    try {
      const response = await axios.post("/login", JSON.stringify(request), {
        headers: { "Content-Type": "application/json" },
      });
      const ssid = response?.data?.sessionId;
      setAuth({
        email: getValues("email"),
        password: getValues("password"),
        ssid: ssid,
      });
      setAuth({
        email: getValues("email"),
        password: getValues("password"),
        ssid: ssid,
      });
      setSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

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
                      required: "Required field",
                      pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "Invalid email",
                      },
                    })}
                    error={!!errors?.email}
                    helperText={errors?.email ? errors.email.message : null}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Username"
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
                    {...register("username", { required: "Required field" })}
                    error={!!errors?.username}
                    helperText={
                      errors?.username ? errors.username.message : null
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Password"
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
                    {...register("password", { required: "Required field" })}
                    error={!!errors?.password}
                    helperText={
                      errors?.password ? errors.password.message : null
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Password Again"
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
                      required: "Required field",
                      validate: (value) =>
                        value === getValues("password")
                          ? true
                          : "Passwords do not match",
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
                    label="Name"
                    fullWidth={true}
                    margin="normal"
                    variant="standard"
                    {...register("name", {
                      required: "Required field",
                    })}
                    error={!!errors?.name}
                    helperText={errors?.name ? errors.name.message : null}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Surname"
                    fullWidth={true}
                    margin="normal"
                    variant="standard"
                    {...register("surname", {
                      required: "Required field",
                    })}
                    error={!!errors?.surname}
                    helperText={errors?.surname ? errors.surname.message : null}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Height"
                    fullWidth={true}
                    margin="normal"
                    variant="standard"
                    type="number"
                    {...register("height", {
                      required: "Required field",
                      min: {
                        value: 1,
                        message: "Invalid value",
                      },
                    })}
                    error={!!errors?.height}
                    helperText={errors?.height ? errors.height.message : null}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Weight"
                    fullWidth={true}
                    margin="normal"
                    variant="standard"
                    type="number"
                    {...register("weight", {
                      required: "Required field",
                      min: {
                        value: 1,
                        message: "Invalid value",
                      },
                    })}
                    error={!!errors?.weight}
                    helperText={errors?.weight ? errors.weight.message : null}
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ pt: 3 }}>
                  {isDesktop ? (
                    <DesktopDatePicker
                      label="Birthdate"
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
                      label="Birthdate"
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
                  <Typography>Gender</Typography>
                  <Slider
                    size="small"
                    defaultValue={50}
                    valueLabelDisplay="auto"
                    aria-label="Sex slider"
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
                          label="Desired Calories"
                          fullWidth={true}
                          margin="normal"
                          variant="standard"
                          type="number"
                          {...register("calories", {
                            required: {
                              value: ownGoals,
                              message: "Required field",
                            },
                            min: {
                              value: 0,
                              message: "Invalid value",
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
                          label="Desired Proteins"
                          fullWidth={true}
                          margin="normal"
                          variant="standard"
                          type="number"
                          {...register("proteins", {
                            required: {
                              value: ownGoals,
                              message: "Required field",
                            },
                            min: {
                              value: 0,
                              message: "Invalid value",
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
                          label="Desired Carbs"
                          fullWidth={true}
                          margin="normal"
                          variant="standard"
                          type="number"
                          {...register("carbs", {
                            required: {
                              value: ownGoals,
                              message: "Required field",
                            },
                            min: {
                              value: 0,
                              message: "Invalid value",
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
                          label="Desired Fats"
                          fullWidth={true}
                          margin="normal"
                          variant="standard"
                          type="number"
                          {...register("fats", {
                            required: {
                              value: ownGoals,
                              message: "Required field",
                            },
                            min: {
                              value: 0,
                              message: "Invalid value",
                            },
                          })}
                          error={!!errors?.fats}
                          helperText={errors?.fats ? errors.fats.message : null}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Desired Fiber"
                          fullWidth={true}
                          margin="normal"
                          variant="standard"
                          type="number"
                          {...register("fiber", {
                            required: {
                              value: ownGoals,
                              message: "Required field",
                            },
                            min: {
                              value: 0,
                              message: "Invalid value",
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
                          label="Desired Salt"
                          fullWidth={true}
                          margin="normal"
                          variant="standard"
                          type="number"
                          {...register("salt", {
                            required: {
                              value: ownGoals,
                              message: "Required field",
                            },
                            min: {
                              value: 0,
                              message: "Invalid value",
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
                  Register
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
              <Button>Zapomněl jsi heslo?</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
