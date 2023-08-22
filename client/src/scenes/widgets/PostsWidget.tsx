import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPosts } from "../../state"
import PostWidget from "./PostWidget"

// Typescript declaration
interface PostsWidgetProps {
  userId: string
  isProfile: boolean
}

interface Comment {
  comment: string
  comments: Comment | Comment[]
}

interface Likes {
  [userId: string]: boolean
}

interface PostData {
  _id: string
  userId: string
  firstName: string
  lastName: string
  description: string
  location: string
  picturePath: string
  userPicturePath: string
  likes: Likes
  comments: Comment[]
  title: string
  content: string
}

interface RootState {
  posts: PostData[] //array of objects
  token: string | null
}

const PostsWidget: React.FC<PostsWidgetProps> = ({
  userId,
  isProfile = false,
}) => {
  const dispatch = useDispatch()
  const posts = useSelector((state: RootState) => state.posts)
  const token = useSelector((state: RootState) => state.token)

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
    const data: PostData[] = await response.json()
    dispatch(setPosts({ posts: data }))
  }

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    const data: PostData[] = await response.json()
    dispatch(setPosts({ posts: data }))
  }

  useEffect(() => {
    if (isProfile) {
      getUserPosts()
    } else {
      getPosts()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  )
}

export default PostsWidget
