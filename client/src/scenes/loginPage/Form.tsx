import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";

import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/index";
import MyDropzone from "./MyDropzone";
import {
  FormikHelpers,
  FormikProps,
  FormikTouched,
  FormikErrors,
} from "formik";
import { themeSettings } from "../../theme";

// Mode for themeSettings
let mode: "light" | "dark";

// Define your types
interface RegisterValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  location: string;
  occupation: string;
  picture: File | null;
}

interface LoginValues {
  email: string;
  password: string;
  picture: File | null;
}

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister: RegisterValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: null,
};

const initialValuesLogin: LoginValues = {
  email: "",
  password: "",
  picture: null,
};

type FormValues = RegisterValues | LoginValues;

const Form: React.FC = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const themeOptions = themeSettings(mode);

  const register = async (
    values: RegisterValues,
    onSubmitProps: FormikHelpers<RegisterValues>
  ) => {
    const formData = new FormData();
    for (const value in values) {
      if (Object.prototype.hasOwnProperty.call(values, value)) {
        formData.append(value, values[value as keyof RegisterValues] as string);
      }
    }

    formData.append("picturePath", values.picture!.name);

    const savedUserResponse = await fetch(
      "https://memorylane-bor2.onrender.com/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  // const login = async (values, onSubmitProps) => {
  const login = async (
    values: LoginValues,
    onSubmitProps: FormikHelpers<LoginValues>
  ) => {
    const loggedInResponse = await fetch("https://memorylane-bor2.onrender.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };


  const handleFormSubmit = async (
    values: RegisterValues | LoginValues,
    onSubmitProps: FormikHelpers<RegisterValues | LoginValues>
  ) => {
    if (isLogin) {
      await login(
        values as LoginValues,
        onSubmitProps as FormikHelpers<LoginValues>
      );
    }
    if (isRegister) {
      await register(
        values as RegisterValues,
        onSubmitProps as FormikHelpers<RegisterValues>
      );
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }: FormikProps<FormValues>) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={(values as RegisterValues).firstName}
                  name="firstName"
                  error={
                    Boolean(
                      (touched as FormikTouched<RegisterValues>).firstName
                    ) &&
                    Boolean((errors as FormikErrors<RegisterValues>).firstName)
                  }
                  helperText={
                    (touched as FormikTouched<RegisterValues>).firstName &&
                    (errors as FormikErrors<RegisterValues>).firstName
                  }
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={(values as RegisterValues).lastName}
                  name="lastName"
                  error={
                    Boolean(
                      (touched as FormikTouched<RegisterValues>).lastName
                    ) &&
                    Boolean((errors as FormikErrors<RegisterValues>).lastName)
                  }
                  helperText={
                    (touched as FormikTouched<RegisterValues>).lastName &&
                    (errors as FormikErrors<RegisterValues>).lastName
                  }
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={(values as RegisterValues).location}
                  name="location"
                  error={
                    Boolean(
                      (touched as FormikTouched<RegisterValues>).location
                    ) &&
                    Boolean((errors as FormikErrors<RegisterValues>).location)
                  }
                  helperText={
                    (touched as FormikTouched<RegisterValues>).location &&
                    (errors as FormikErrors<RegisterValues>).location
                  }
                  sx={{ gridColumn: "span 4" }}
                />
                {isRegister && (
                  <>
                    <TextField
                      label="Occupation"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={(values as RegisterValues).occupation}
                      name="occupation"
                      error={
                        Boolean(
                          (touched as FormikTouched<RegisterValues>).occupation
                        ) &&
                        Boolean(
                          (errors as FormikErrors<RegisterValues>).occupation
                        )
                      }
                      helperText={
                        (touched as FormikTouched<RegisterValues>).occupation &&
                        (errors as FormikErrors<RegisterValues>).occupation
                      }
                      sx={{ gridColumn: "span 4" }}
                    />
                  </>
                )}
                {/* <Box
                  gridColumn="span 4"
                  border={`1px solid ${themeOptions.palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles: File[]) => {
                      if (acceptedFiles.length > 0) {
                        setFieldValue("picture", acceptedFiles[0]);
                      }
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
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
                    )}
                  </Dropzone>
                </Box> */}
                <Box
  gridColumn="span 4"
  border={`1px solid ${themeOptions.palette.neutral.medium}`}
  borderRadius="5px"
  p="1rem"
>
  {/* Replace the <Dropzone> component with MyDropzone */}
  <MyDropzone setFieldValue={setFieldValue} values={values} palette={palette} />
</Box>
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: themeOptions.palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: themeOptions.palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: themeOptions.palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
