import { Navigate } from "react-router-dom";

import { Box, CssBaseline } from "@mui/material";
import UserDetails from "./UserDetails";
import MainBackground from "../Utils/MainBackground";
import CustomAppBar from "../Utils/CustomAppBar";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

const UserDetailsPage = () => {
  // @ts-ignore
  const { auth, setAuth } = useContext(AuthContext);
  console.log(auth)

  return (
    <>
      {(Object.keys(auth).length === 0 || auth === {}) && (setAuth({})) ? (
        <Navigate to="/" />
      ) : (
        <MainBackground>
          <Box
            sx={{
              height: "100vh",
              overflow: "auto",
            }}
          >
            <CssBaseline />
            <CustomAppBar withSearch={true} />
            <UserDetails />
          </Box>
        </MainBackground>
      )}
    </>
  );
};

export default UserDetailsPage;
