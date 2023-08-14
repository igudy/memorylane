import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./scenes/homePage"
import LoginPage from "./scenes/loginPage"
import ProfilePage from "./scenes/profilePage"
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { createTheme } from "@mui/material/styles"
import { themeSettings } from "./theme" // Adjust the import path for your themeSettings function

interface RootState {
  mode: Mode
}

type Mode = "light" | "dark" // Replace this with your actual mode values

function App() {
  const mode = useSelector((state: RootState) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
