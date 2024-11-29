import {
  Box,
  Button,
  Dialog,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";

import { usePosts } from "../PostProvider";
import { FaGoogle } from "react-icons/fa";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {  useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../../firebase";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import LoginLoading from "../../components/LoginLoading";
export default function SingUp() {
  const { setOpenSignUp, openSignUp, setUserData } = usePosts();
  const [emailErrorMessage, setEmailErrorMessage] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const schema = yup.object().shape({
    fullName: yup.string().required(),
    email: yup
      .string()
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i,
        "Invalid email format"
      )
      .required(),
    CreatePassword: yup
      .string()
      .min(6, "Minimum 6 latter require")
      .max(16, "Password muse be with in 16 latter")
      .required(),
    ConformPassword: yup
      .string()
      .test("passwords-match", "Passwords must match", function (value) {
        return this.parent.CreatePassword === value;
      }),
  });
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleClose = () => {
    setOpenSignUp(false);
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConformPassword, setShowConformPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleConformClickShowPassword = () =>
    setShowConformPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleConformMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleConformMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  async function googleSignHandler() {
    await signInWithPopup(auth, provider).then((data) =>
      setDoc(doc(db, "users", data.user.uid), {
        email: data.user.email,
        name: data.user.displayName,
      })
    );
  }
  const onSubmitForm = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.CreatePassword
      );
      const user = auth.currentUser;

      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          name: data.fullName,
          email: data.email,
          userId: user.uid,
        });
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      if (errorCode === "auth/email-already-in-use") {
        setEmailErrorMessage("Email already in use, please try login instead Sign up");
      } else {
        setEmailErrorMessage("Please reload the page");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog
      open={openSignUp}
      onClose={handleClose}
      PaperProps={{
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          const email = formJson.email;
          console.log(email);
          handleClose();
        },
      }}
      onChange={() => setEmailErrorMessage(undefined)}
    >
      <Form onSubmit={handleSubmit(onSubmitForm)}>
        <Box sx={{ width: "470px", display: "flex", padding: "50px 0" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              width: "85%",
              margin: "auto",
              gap: "19px",
            }}
          >
            <Box sx={{ width: "100%", marginBottom: "5px" }}>
              <Typography sx={{ fontSize: "22px" }}>Sing up</Typography>
            </Box>
            <TextField
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
              sx={{ width: "100%" }}
              {...register("fullName")}
              color={`${errors.fullName ? "error" : "primary"}`}
            ></TextField>
            <Box width={"100%"}>
              <TextField
                color={`${
                  emailErrorMessage
                    ? "error"
                    : errors.email
                    ? "error"
                    : "primary"
                }`}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                sx={{ width: "100%" }}
                {...register("email")}
              ></TextField>
              {emailErrorMessage ? (
                <Typography sx={{ fontSize: "13px", color: "#ff1919" }}>
                  {emailErrorMessage}
                </Typography>
              ) : errors.email ? (
                <Typography sx={{ fontSize: "13px", color: "#ff1919" }}>
                  {errors.email?.message}
                </Typography>
              ) : (
                ""
              )}
            </Box>

            <FormControl
              sx={{
                m: 1,
                width: "100%",
                background: "#FFFFF9",
                "& fieldset": {
                  borderColor: "#FFE57D",
                },
              }}
              variant="outlined"
              color={`${errors.CreatePassword ? "error" : "primary"}`}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Create Password
              </InputLabel>
              <OutlinedInput
                // onChange={(e) => setPassword(e.target.value)}
                {...register("CreatePassword")}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff sx={{ color: "#ffd107" }} />
                      ) : (
                        <Visibility sx={{ color: "#ffd107" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Create Password"
              />
              {errors.CreatePassword ? (
                <Typography sx={{ fontSize: "12px", color: "#ff1919" }}>
                  {errors.CreatePassword?.message}
                </Typography>
              ) : (
                ""
              )}
            </FormControl>
            <FormControl
              color={`${errors.ConformPassword ? "error" : "primary"}`}
              sx={{
                m: 1,
                width: "100%",
                background: "#FFFFF9",
                "& fieldset": {
                  borderColor: "#FFE57D",
                },
              }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Conform password
              </InputLabel>
              <OutlinedInput
                color={`${errors.ConformPassword ? "error" : "primary"}`}
                // onChange={(e) => setPassword(e.target.value)}
                {...register("ConformPassword")}
                id="outlined-adornment-password"
                type={showConformPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showConformPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleConformClickShowPassword}
                      onMouseDown={handleConformMouseDownPassword}
                      onMouseUp={handleConformMouseUpPassword}
                      edge="end"
                    >
                      {showConformPassword ? (
                        <VisibilityOff sx={{ color: "#ffd107" }} />
                      ) : (
                        <Visibility sx={{ color: "#ffd107" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Conform Password"
              />
              {errors.ConformPassword ? (
                <Typography sx={{ fontSize: "12px", color: "#ff1919" }}>
                  {errors.ConformPassword?.message}
                </Typography>
              ) : (
                ""
              )}
            </FormControl>
            <Box
              sx={{
                width: "100%",
                height: "2px",
                background: "#ffef16",
                borderRadius: "5px",
              }}
            ></Box>
            <Button
              type="submit"
              variant="contained"
              // onClick={onSubmit}
              sx={{
                width: "100%",
                height: "50px",
                "&:hover": { boxShadow: "none" },
                background: "#FDD247",
                boxShadow: "none",
                textTransform: "none",
                fontSize: "16px",
                color: "#444444",
                fontWeight: "600",
              }}
            >
              Sing up
            </Button>
            <LoginLoading isOpen={loading} />
            <Button
              onClick={googleSignHandler}
              variant="outlined"
              sx={{
                width: "100%",
                height: "50px",
                "&:hover": { boxShadow: "none" },
                boxShadow: "none",

                textTransform: "none",
                fontSize: "23px",
                fontWeight: "600",
                color: "#444444",
              }}
            >
              <FaGoogle color="#ffd107" />
            </Button>
          </Box>
        </Box>
      </Form>
    </Dialog>
  );
}
