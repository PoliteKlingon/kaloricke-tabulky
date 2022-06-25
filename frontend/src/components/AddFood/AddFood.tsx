import * as React from "react";
import TextField from "@mui/material/TextField";
import { CssBaseline, Grid, Box, Container, AppBar, Link, Stack, Toolbar } from "@mui/material";
import { Typography, Button, Alert } from "@mui/material";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
import { Navigate } from "react-router-dom";
import AnimatedButton from "../Utils/AnimatedButton";
import HideOnScroll from "../Utils/HideOnScroll";

const theme = createTheme();

const AddFood = () => {
  // @ts-ignore
  const { auth, setAuth } = useContext(AuthContext);
  const sessionId = auth.ssid;
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const Root = styled("div")({
    display: "flex",
    justifyContent: "center",
    height: "100vh",
  });


  const onSubmit = () => {
    setAlertSeverity("");
    setAlertMessage("");
    try {
      const body = {
        data: {
          name: getValues("name"),
          /* All values are divided by 100 because user inserts them per 100 grams of food
          but database stores them per 1 gram of food. */
          calories: getValues("calories") / 100,
          fats: getValues("fats") / 100,
          proteins: getValues("proteins") / 100,
          carbs: getValues("carbs") / 100,
          fiber: getValues("fiber") / 100,
          salt: getValues("salt") / 100,
        },
      };
      axios
        .put("/food", JSON.stringify(body), {
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth.ssid}`
          },
        })
        .then((_) => {
          setAlertSeverity("success");
          setAlertMessage("Food successfully added");
          reset();
        })
        .catch((err) => {
          setAlertSeverity("error");
          setAlertMessage(err.response.data.message);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Root>
      {(auth.ssid == null || auth.ssid == "") && <Navigate to='/login'  />}
        <HideOnScroll>
          <AppBar elevation={0} sx={{ background: "none", pt: 5 }}>
            <Toolbar sx={{ width: "100%", px: { xs: "auto", md: 5, lg: 10 } }}>
              <ThemeProvider theme={theme}>
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
                    {/* @ts-ignore*/}
                    <Link to="/" sx={{ textDecoration: "none" }}>
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
                    {/* @ts-ignore*/}
                    <Link to="/" sx={{ textDecoration: "none" }}>
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
                    </Link>
                  </Stack>
                </Grid>
              </ThemeProvider>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <Container 
            sx={{
                backgroundColor: "white",
                marginTop: {xs: 30, sm: 30, md: 20, lg: 25},
                marginBottom: {xs: 5, sm: 5, md: 10, lg: 10},
                width: "90%",
                height: "auto",
                overflow: 'auto'
        }} >

          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
              sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
              }}
              >
              <Typography component="h1" variant="h4" sx={{ fontFamily: "Nunito" }}>
                  Add food to database
              </Typography>
              <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit(onSubmit)}
                  sx={{ mt: 3 }}
              >
                  <Grid container spacing={2}>
                  <Grid item xs={12}>
                      <TextField
                      required
                      fullWidth
                      variant="standard"
                      id="name"
                      label="Food name"
                      InputProps={{ style: { fontFamily: "Nunito" } }}
                      InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                      {...register("name", { required: "Field is requiered" })}
                      error={!!errors?.name}
                      helperText={errors?.name ? errors.name.message : null}
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <Typography component="h1" variant="h6" sx={{
                        marginTop: 3,
                        textAlign:"center",
                        fontFamily: "Nunito"
                        }}>
                      Nutrients per 100 g
                      </Typography>
                      <TextField
                      required
                      fullWidth
                      variant="standard"
                      label="Calories"
                      type="number"
                      id="calories"
                      InputProps={{ style: { fontFamily: "Nunito" } }}
                      InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                      {...register("calories", { required: "Field is requiered" })}
                      error={!!errors?.calories}
                      helperText={errors?.calories ? errors.calories.message : null}
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <TextField
                      required
                      fullWidth
                      variant="standard"
                      label="Fats"
                      type="number"
                      id="fats"
                      InputProps={{ style: { fontFamily: "Nunito" } }}
                      InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                      {...register("fats", { required: "Field is requiered" })}
                      error={!!errors?.fats}
                      helperText={errors?.fats ? errors.fats.message : null}
                      />
                  </Grid>
                  </Grid>
                  <Grid item xs={12}>
                  <TextField
                      required
                      fullWidth
                      variant="standard"
                      label="Carbs"
                      type="number"
                      id="carbs"
                      InputProps={{ style: { fontFamily: "Nunito" } }}
                      InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                      {...register("carbs", { required: "Field is requiered" })}
                      error={!!errors?.carbs}
                      helperText={errors?.carbs ? errors.carbs.message : null}
                  />
                  </Grid>
                  <Grid item xs={12}>
                  <TextField
                      required
                      fullWidth
                      variant="standard"
                      label="Protein"
                      type="number"
                      id="protein"
                      InputProps={{ style: { fontFamily: "Nunito" } }}
                      InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                      {...register("proteins", { required: "Field is requiered" })}
                      error={!!errors?.proteins}
                      helperText={errors?.proteins ? errors.proteins.message : null}
                  />
                  </Grid>
                  <Grid item xs={12}>
                  <TextField
                      required
                      fullWidth
                      variant="standard"
                      label="Fiber"
                      type="number"
                      id="fiber"
                      InputProps={{ style: { fontFamily: "Nunito" } }}
                      InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                      {...register("fiber", { required: "Field is requiered" })}
                      error={!!errors?.fiber}
                      helperText={errors?.fiber ? errors.fiber.message : null}
                  />
                  </Grid>
                  <Grid item xs={12}>
                  <TextField
                      required
                      fullWidth
                      variant="standard"
                      label="Salt"
                      type="number"
                      id="salt"
                      InputProps={{ style: { fontFamily: "Nunito" } }}
                      InputLabelProps={{ style: { fontFamily: "Nunito" } }}
                      {...register("salt", { required: "Field is requiered" })}
                      error={!!errors?.salt}
                      helperText={errors?.salt ? errors.salt.message : null}
                  />
                  </Grid>
                  {alertSeverity && (
                  // @ts-ignore
                  <Alert severity={alertSeverity}>{alertMessage}</Alert>
                  )}
                  <Button
                    variant="contained"
                    disableRipple
                    type="submit"
                    fullWidth
                    
                    sx={{
                      backgroundColor: "orange",
                      fontFamily: "Nunito",
                      fontWeight: "bold",
                      marginY: 5,
                      transition: "transform 0.2s",
                      ":hover": {
                        transform: "scale(1.1)",
                        backgroundColor: "#f29830",
                      }
                    }}
                  >
                  Save
                  </Button>
              </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </Container>
    </Root>
  );
};
export default AddFood;
