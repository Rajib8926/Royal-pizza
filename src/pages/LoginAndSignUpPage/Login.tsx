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
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form } from "react-router-dom";
import LoginLoading from "../../components/LoginLoading";
import styled from "@emotion/styled";
const CustomDialog = styled(Dialog)({ "& .MuiDialog-paper": { margin: 0 } });
export default function Login() {
  const { setOpenLogin, openLogin } = usePosts();
  const [loginErrorMessage, setLoginErrorMessage] = useState<
    string | undefined
  >();
  const [loading, setLoading] = useState<boolean>(false);
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleClose = () => {
    setOpenLogin(false);
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  function googleSignHandler() {
    signInWithPopup(auth, provider).then((data) => console.log(data));
  }
  const onSubmitForm = async (data: { email: string; password: string }) => {
    console.log(data);
    setLoading(true);
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setLoginErrorMessage(undefined);
        // ...
      })

      .catch((error) => {
        setLoginErrorMessage("Email or password is not verified");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <CustomDialog
      open={openLogin}
      onClose={handleClose}
      sx={{ ".css-1ghuacj-MuiPaper-root-MuiDialog-paper": { margin: "0px" } }}
      PaperProps={{
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          const email = formJson.email;
          console.log(email);
          handleClose();
        },
      }}
    >
      <Form onSubmit={handleSubmit(onSubmitForm)}>
        <Box
          sx={{
            width: { sm: "470px", xs: "400px", xxxs: "95vw" },
            display: "flex",
            padding: "50px 0",
          }}
        >
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
              <Typography sx={{ fontSize: "22px" }}>Login</Typography>
            </Box>
            <TextField
              color={`${errors.email ? "error" : "primary"}`}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              sx={{ width: "100%" }}
              // onChange={(e) => setEmail(e.target.value)}
              {...register("email")}
            ></TextField>

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
            >
              <InputLabel
                htmlFor="outlined-adornment-password"
                color={`${errors.password ? "error" : "primary"}`}
              >
                Password
              </InputLabel>
              <OutlinedInput
                // onChange={(e) => setPassword(e.target.value)}
                color={`${errors.password ? "error" : "primary"}`}
                {...register("password")}
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
                label="Password"
              />
            </FormControl>
            {loginErrorMessage ? (
              <Typography sx={{ fontSize: "13px", color: "#ff1919" }}>
                {loginErrorMessage}
              </Typography>
            ) : (
              ""
            )}
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
              Login
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
                fontSize: "20px",
                fontWeight: "600",
                color: "#444444",
              }}
            >
              <FaGoogle color="#ffd107" />
            </Button>
          </Box>
        </Box>
      </Form>
    </CustomDialog>
  );
}
