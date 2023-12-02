import { Route, Routes } from "react-router-dom";
import Contact from "./Pages/Contact";
import { Provider } from "react-redux";
import contactStore from "./redux/Store";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={contactStore}>
          <div className="app">
            <main className="content">
              <Navbar/>
              <Routes>
                <Route path="/" element={<Contact />}></Route>
              </Routes>
            </main>
          </div>
          <ToastContainer position="top-right"></ToastContainer>
        </Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
