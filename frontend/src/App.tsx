import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useEffect, useContext } from "react";
import AuthContext from "./context/AuthProvider";
import UserDetailsPage from "./components/user-details/UserDetailsPage";
import NotFoundPage from "./components/not-found/NotFoundPage";



const App = () => {
  //@ts-ignore
  const { setAuth } = useContext(AuthContext);
  useEffect(() => {
    if (window.localStorage.getItem("auth")) {
      // @ts-ignore
      setAuth(JSON.parse(window.localStorage.getItem("auth")));
    }
  }, []);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/user-details" element={<UserDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;