import { useRef, useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { AccountCircle, Lock } from "@mui/icons-material";
import { useForm } from "react-hook-form";

import slides from "../static/slideshow";
// @ts-ignore
import ChangingImage from "./ChangingImage";
import axios from "../api/axios";
import sha256 from "crypto-js/sha256";

const LogoImage = styled("img")({
  width: 200,
});

const InputContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  maxWidth: "500px",
});

const FillDiv = styled("div")({
  height: 20,
});

type FormInputs = {
  email: string;
  password: string;
};

const Login = () => {
  // @ts-ignore
  const { setAuth } = useContext(AuthContext);

  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormInputs>();
  const onSubmit = async (e: any) => {
    try {
      await axios
        .post(
          "/login",
          JSON.stringify({
            email: getValues("email"),
            passwordHash: String(sha256(getValues("password"))),
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          const ssid = response?.data?.sessionId;
          setAuth({
            email: getValues("email"),
            password: getValues("password"),
            ssid: ssid,
          });
          setAuth({
            email: getValues("email"),
            passwordHash: String(sha256(getValues("password"))),
            ssid: ssid,
          });
          setSuccess(true);
        })
        .catch((error) => {
          console.log(error.response);
        });      
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
              <TextField
                label="Email"
                margin="normal"
                variant="standard"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
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
              <TextField
                label="Password"
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
                helperText={errors?.password ? errors.password.message : null}
              />
              <FillDiv />
              <Button color="primary" variant="contained" type="submit">
                Login
              </Button>
              <FillDiv />
              <Grid container justifyContent="center">
                <Grid item>
                  <Link to="/register" style={{ textDecoration: "none" }}>
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
                      Chceš žít zdravěji?
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

export default Login;
