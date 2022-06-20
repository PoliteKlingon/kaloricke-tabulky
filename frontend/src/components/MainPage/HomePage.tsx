import HomeHeader from "./HomeHeader";
import HomeContent from "./HomeContent";
import AuthContext from "../../context/AuthProvider";

import { CssBaseline } from "@mui/material";
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

const HomePage = () => {
    // @ts-ignore
    const { auth, setAuth } = useContext(AuthContext);
    useEffect(() => {
      if (window.localStorage.getItem("auth")) {
        // @ts-ignore
        setAuth(JSON.parse(window.localStorage.getItem("auth")));
      }
    }, []);
    console.log("HOMEPAGE: ", auth);
    console.log(
      "HOMEPAGE should be : ",
      JSON.parse(window.localStorage.getItem("auth"))
    );
    return (
      <>
      {console.log("HOMEPAGE: ", auth)}
        {Object.keys(auth).length === 0 || auth == null
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