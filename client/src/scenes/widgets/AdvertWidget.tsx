import { Typography } from "@mui/material"
import FlexBetween from "../../components/FlexBetween"
import WidgetWrapper from "../../components/WidgetWrapper"
import { themeSettings } from "../../theme"

// Mode for themeSettings
let mode: "light" | "dark"

const AdvertWidget = () => {
  const themeOptions = themeSettings(mode)

  // Defining themes
  const dark = themeOptions.palette.neutral.dark
  const main = themeOptions.palette.neutral.main
  const medium = themeOptions.palette.neutral.medium

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create AD</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="https://memorylane-bor2.onrender.com/assets/info4.jpeg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Motivation</Typography>
        <Typography color={main}>motivationalvideos.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        The rose that grew from the concrete, despite all, still i rise.
      </Typography>
    </WidgetWrapper>
  )
}

export default AdvertWidget
