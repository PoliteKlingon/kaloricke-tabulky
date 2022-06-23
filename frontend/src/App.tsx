import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FoodDetailsPage from "./pages/FoodDetailsPage";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useEffect, useContext } from "react";
import AuthContext from "./context/AuthProvider";



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
          <Route path="/details/:id" element={<FoodDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;