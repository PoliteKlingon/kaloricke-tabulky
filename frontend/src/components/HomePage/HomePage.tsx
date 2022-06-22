import HomeHeader from "./HomeHeader";
import HomeContent from "./HomeContent";
import AuthContext from "../../context/AuthProvider";

import { CssBaseline } from "@mui/material";
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

const HomePage = () => {
    // @ts-ignore
    const { auth } = useContext(AuthContext);

    return (
      <>
        {(Object.keys(auth).length === 0 || auth == null)
          ? (console.log(auth), (<Navigate to="/" />))
          :
            <>
              <CssBaseline />
              <HomeHeader />
              <HomeContent />
            </>
        }
      </>
    );
}

export default HomePage;