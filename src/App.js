import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ProfileScreen from "./screens/ProfileScreen";
import EditProfile from "./screens/EditProfile";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";

function App() {
  const theme = createTheme({
    palette: {
      primary: { main: "#7ea68c", light: "#fff", contrastText: "#fff" },
    },
  });
  const [commonUserStatus, setUserStatus] = useState();
  const [headerName, setHeaderName] = useState();
  const [isCreated, setIsCreated] = useState();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header
          statusChange={(e) => setUserStatus(e)}
          headerHandler={(e) => setHeaderName(e)}
          profileHandler={(e) => setIsCreated(e)}
        />
        <Routes>
          <Route
            path="/"
            element={
              <HomeScreen
                commonUserStatus={commonUserStatus}
                headerName={headerName}
                isCreated={isCreated}
              />
            }
          />
          <Route
            path="/:id"
            element={
              <HomeScreen
                commonUserStatus={commonUserStatus}
                headerName={headerName}
                isCreated={isCreated}
              />
            }
          />
          <Route path="/signin" element={<SignInScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/editProfile" element={<EditProfile />} />
          {/* <Route path='/product/:id' element={<Product/>} />  */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
