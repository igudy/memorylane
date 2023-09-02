import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { themeSettings } from "../theme";

// Mode for themeSettings
let mode: "light" | "dark";

// Typescript declaration
interface FriendProps {
  friendId: string;
  name: string;
  subtitle: string;
  userPicturePath: string;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  // state.user.friends = interface User{friends: string}
  friends: Friend[];
}

interface RootState {
  user: User;
  token: string | null;
}

interface Friend {
  _id: string;
}

// FC means functional component
const Friend: React.FC<FriendProps> = ({
  friendId,
  name,
  subtitle,
  userPicturePath,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state: RootState) => state.user);
  const token = useSelector((state: RootState) => state.token);
  const friends = useSelector((state: RootState) => state.user.friends);
  const themeOptions = themeSettings(mode);

  // Defining themes
  const primaryLight = themeOptions.palette.primary.light;
  const primaryDark = themeOptions.palette.primary.dark;
  const main = themeOptions.palette.neutral.main;
  const medium = themeOptions.palette.neutral.medium;

  const isFriend = friends.find((friend: Friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `https://memorylane-bor2.onrender.com/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: themeOptions.palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;
