import { ThemeProvider } from '@emotion/react';
import { Container, CssBaseline, Box, Typography, Grid, TextField, Button, createTheme, styled } from '@mui/material';
import { useContext, useEffect, useState } from 'react'
import { flushSync } from 'react-dom';
import { Navigate } from 'react-router-dom';
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import ListedFood from './ListedFood';

const theme = createTheme();

const Root = styled("div")({
    display: "flex",
    justifyContent: "center",
  });

function AdminHome() {
    // @ts-ignore
    const { auth, setAuth } = useContext(AuthContext);

    const [data, setData] = useState([]);

    const getFood = async () => {
        try {
           await axios
             .get("/food", {
               headers: { 
                "Authorization": `Bearer ${auth.ssid}`,
               },
             })
             .then((response) => {
               flushSync(() => setData(response.data.data));
               console.log(response)
               console.log(data)
               setTimeout(() => {console.log(data)}, 1000);
             })
        } catch (err) {
          // @ts-ignore
          if (err.response.status == 401) {
            setAuth({});
            localStorage.removeItem("auth");
          }
          alert("Vyskytla se neočekávaná chyba na naší straně. Zkuste akci zopakovat.");
        }
    };

    useEffect(() => {
        getFood();
      }, []);

    return (
        <Root>
          {(auth.ssid == null || auth.ssid == "") && <Navigate to='/login'  />}
          {auth.role != "admin" && <Navigate to='/home' />}
            <Container 
                sx={{
                    backgroundColor: "white",
                    marginY: {xs: 5, md: 10},
                    paddingBottom: 12.5,
                    borderRadius: {xs: 0, md: 10},
                    width: {xs: "100%", md: "90%"},
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
                      Správa jídel v databázi
                  </Typography>
                  </Box>
                  {data.map((food: any) => {return(<ListedFood name={food.name} />)})}
                </Container>
              </ThemeProvider>
            </Container>
        </Root>
      );
}

export default AdminHome
