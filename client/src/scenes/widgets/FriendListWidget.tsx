import { Box, Typography, useTheme } from "@mui/material"
import Friend from "../../components/Friend"
import WidgetWrapper from "../../components/WidgetWrapper"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setFriends } from "../../state"
import { themeSettings } from "../../theme"

// Mode for themeSettings
let mode: "light" | "dark"

interface FriendListWidgetProps {
  userId: string
  //   friends: Array<{
  //   _id: string;
  //   firstName: string;
  //   lastName: string;
  //   occupation: string;
  //   picturePath: string;
  //   // Add other friend properties here
  // }>;
}

interface User {
  user: string
}

interface RootState {
  token: null
  user: User
}

const FriendListWidget: React.FC<FriendListWidgetProps> = ({ userId }) => {
  const dispatch = useDispatch()
  const token = useSelector((state: RootState) => state.token)
  const friends = useSelector((state: RootState) => state.user.friends)
  const themeOptions = themeSettings(mode)

  const getFriends = async () => {
    const response = await fetch(
      `https://memorylane-bor2.onrender.com/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    const data = await response.json()
    dispatch(setFriends({ friends: data }))
  }

  useEffect(() => {
    getFriends()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={themeOptions.palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  )
}

export default FriendListWidget
