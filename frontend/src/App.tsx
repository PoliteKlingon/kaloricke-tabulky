import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useEffect, useContext } from "react";
import AuthContext from "./context/AuthProvider";



const App = () => {
  //@ts-ignore
  const { setAuth } = useContext(AuthContext);
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setAuth(window.localStorage.getItem("auth"));
    }
  }, []);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;