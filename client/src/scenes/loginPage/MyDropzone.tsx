// import React from "react";
// import { Box, Typography } from "@mui/material";
// import { useDropzone } from "react-dropzone";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// import FlexBetween from "../../components/FlexBetween";
// // Define your custom DropzoneOptions type
// interface CustomDropzoneOptions {
//   acceptedFiles: string[];
//   multiple: boolean;
//   onDrop: (acceptedFiles: File[]) => void;
// }

// interface MyDropzoneProps {
//   setFieldValue: (field: string, value: any) => void;
//   values: { picture: File | null }; // Replace with your actual form values type
//   palette: { primary: { main: string } }; // Replace with your actual palette type
// }

// const MyDropzone: React.FC<MyDropzoneProps> = ({ setFieldValue, values, palette }) => {
//   const { getRootProps, getInputProps } = useDropzone({
//     acceptedFiles: [".jpg", ".jpeg", ".png"],
//     multiple: false,
//     onDrop: (acceptedFiles: File[]) => {
//       if (acceptedFiles.length > 0) {
//         setFieldValue("picture", acceptedFiles[0]);
//       }
//     },
//   } as CustomDropzoneOptions); // Use your custom DropzoneOptions type

//   return (
//     <div {...getRootProps()} style={{ outline: "none" }}>
//       <input {...getInputProps()} />
//       <Box
//         border={`2px dashed ${palette.primary.main}`}
//         p="1rem"
//         sx={{ "&:hover": { cursor: "pointer" } }}
//       >
//         {!values.picture ? (
//           <p>Add Picture Here</p>
//         ) : (
//           <FlexBetween>
//             <Typography>{values.picture.name}</Typography>
//             <EditOutlinedIcon />
//           </FlexBetween>
//         )}
//       </Box>
//     </div>
//   );
// };

// export default MyDropzone;

import React from "react";
import { Box, Typography } from "@mui/material";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FlexBetween from "../../components/FlexBetween";

// Define your custom DropzoneOptions type
interface CustomDropzoneOptions extends DropzoneOptions {
  acceptedFiles: string[];
}

interface MyDropzoneProps {
  setFieldValue: (field: string, value: File | null) => void;
  values: { picture: File | null };
  palette: { primary: { main: string } };
}

const MyDropzone: React.FC<MyDropzoneProps> = ({ setFieldValue, values, palette }) => {
  const { getRootProps, getInputProps } = useDropzone({
    acceptedFiles: [".jpg", ".jpeg", ".png"],
    multiple: false,
    onDrop: (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setFieldValue("picture", acceptedFiles[0]);
      }
    },
  } as CustomDropzoneOptions);

  return (
    <div {...getRootProps()} style={{ outline: "none" }}>
      <input {...getInputProps()} />
      <Box
        border={`2px dashed ${palette.primary.main}`}
        p="1rem"
        sx={{ "&:hover": { cursor: "pointer" } }}
      >
        {!values.picture ? (
          <p>Add Picture Here</p>
        ) : (
          <FlexBetween>
            <Typography>{values.picture.name}</Typography>
            <EditOutlinedIcon />
          </FlexBetween>
        )}
      </Box>
    </div>
  );
};

export default MyDropzone;
