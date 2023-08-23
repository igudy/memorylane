import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material"
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material"
import FlexBetween from "../../components/FlexBetween"
import Friend from "../../components/Friend"
import WidgetWrapper from "../../components/WidgetWrapper"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPost } from "../../state"
import { themeSettings } from "../../theme"

interface Comment {
  comment: string
  comments: Comment | Comment[]
}

interface Likes {
  [userId: string]: boolean
}

interface PostWidgetProps {
  postId: string
  postUserId: string
  name: string
  description: string
  location: string
  picturePath: string
  userPicturePath: string
  likes: Likes
  comments: Comment[]
}

interface User {
  _id: string
}

interface RootState {
  token: string | null
  user: User
}

let mode: "light" | "dark"

const PostWidget: React.FC<PostWidgetProps> = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false)
  const dispatch = useDispatch()
  const token = useSelector((state: RootState) => state.token)
  const loggedInUserId = useSelector((state: RootState) => state.user._id)
  const likeCount = Object.keys(likes).length
  const isLiked = likes[loggedInUserId]

  const themeOptions = themeSettings(mode)
  const main = themeOptions.palette.neutral.main
  const primary = themeOptions.palette.primary.main

  // Like function
  const patchLike = async () => {
    const response = await fetch(
      `https://memorylane-bor2.onrender.com/posts/${postId}/like`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    )
    const updatedPost = await response.json()
    // dispatch(setPost({ post: updatedPost }))
    dispatch(setPost({ post_id: postId, post: updatedPost }))
  }

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`https://memorylane-bor2.onrender.com/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {comments.map((comment, i) => (
        <Box key={`${name}-${i}`}>
          <Divider />
          {typeof comment === "string" ? (
            <Typography
              variant="body1"
              sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}
            >
              {comment}
            </Typography>
          ) : (
            // Handle non-string comment here, e.g., display an error message
            <Typography
              variant="body1"
              sx={{ color: "error", m: "0.5rem 0", pl: "1rem" }}
            >
              Invalid comment format
            </Typography>
          )}
        </Box>
      ))}
    </WidgetWrapper>
  )
}

export default PostWidget
