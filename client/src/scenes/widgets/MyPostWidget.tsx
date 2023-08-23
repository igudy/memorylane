import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material"
import {
  Box,
  Divider,
  Typography,
  InputBase,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material"
import FlexBetween from "../../components/FlexBetween"
import Dropzone, { DropzoneState } from "react-dropzone"
import UserImage from "../../components/UserImage"
import WidgetWrapper from "../../components/WidgetWrapper"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPosts } from "../../state"
import { themeSettings } from "../../theme"

// Mode for themeSettings
let mode: "light" | "dark"

interface MyPostWidgetProps {
  picturePath: string
}

interface RootState {
  user: User
  token: null
}

interface User {
  _id: string
  user: string
}

const MyPostWidget: React.FC<MyPostWidgetProps> = ({ picturePath }) => {
  const dispatch = useDispatch()
  const [isImage, setIsImage] = useState(false)
  // const [image, setImage] = useState(null)
  const [image, setImage] = useState<File | null>(null)
  const [post, setPost] = useState("")
  const { _id } = useSelector((state: RootState) => state.user)
  const token = useSelector((state: RootState) => state.token)
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")
  const themeOptions = themeSettings(mode)

  const mediumMain = themeOptions.palette.neutral.mediumMain
  const medium = themeOptions.palette.neutral.medium

  const handlePost = async () => {
    const formData = new FormData()
    formData.append("userId", _id)
    formData.append("description", post)
    if (image) {
      formData.append("picture", image)
      formData.append("picturePath", image.name)
    }

    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
    const posts = await response.json()
    dispatch(setPosts({ posts }))
    setImage(null)
    setPost("")
  }

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: themeOptions.palette.neutral.dark,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          {/* <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles: File[]) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }: DropzoneState) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${themeOptions.palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone> */}
          <Dropzone
            multiple={false}
            onDrop={(acceptedFiles: File[]) => {
              // Check if the acceptedFiles array contains valid file types
              const allowedTypes = [".jpg", ".jpeg", ".png"]
              const isValidFileType = acceptedFiles.every((file) =>
                allowedTypes.includes(file.name.slice(-4).toLowerCase())
              )

              if (isValidFileType) {
                setImage(acceptedFiles[0])
              } else {
                // Handle invalid file type here, e.g., show an error message
                console.error("Invalid file type")
              }
            }}
          >
            {({ getRootProps, getInputProps }: DropzoneState) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${themeOptions.palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: themeOptions.palette.background.alt,
            backgroundColor: themeOptions.palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  )
}

export default MyPostWidget
