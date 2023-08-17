import React from "react" // Import React
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material"
import Form from "./Form"
import { useDispatch, useSelector } from "react-redux"
import { setMode, setLogout } from "../../state/index"
import { themeSettings } from "../../theme"

interface RootState {
  mode: "light" | "dark"
}

const LoginPage = () => {
  const theme = useTheme()
  const mode = useSelector((state: RootState) => state.mode)
  const themeOptions = themeSettings(mode)
  // const neutralLight = themeOptions.palette.neutral.light
  // const dark = themeOptions.palette.neutral.dark
  // const background = themeOptions.palette.background.default
  // const primaryLight = themeOptions.palette.primary.light
  const alt = themeOptions.palette.background.alt

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")
  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          backgroundColor: alt,
          p: "1rem 6%",
          textAlign: "center",
        }}
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          MemoryLane
        </Typography>
      </Box>
      <Box
        sx={{
          width: isNonMobileScreens ? "50%" : "93%", // Added a comma
          p: "2rem", // Added a comma
          m: "2rem auto",
          borderRadius: "1.5rem",
          backgroundColor: alt,
        }}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to MemoryLane, the social media to share your memories!
        </Typography>
        {/* Form */}
        <Form />
      </Box>
    </Box>
  )
}

export default LoginPage
