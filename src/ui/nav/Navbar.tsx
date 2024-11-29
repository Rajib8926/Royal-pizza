import { Box, Button, List, ListItem } from "@mui/material";

import { NavLink } from "react-router-dom";
import { usePosts } from "../../pages/PostProvider";
import Login from "../../pages/LoginAndSignUpPage/Login";
import SingUp from "../../pages/LoginAndSignUpPage/SignUp";
import { auth } from "../../firebase";
import { MdOutlineLogout } from "react-icons/md";

export default function Navbar() {
  const { setOpenLogin, setOpenSignUp, isLogin, setIsLogin } = usePosts();
  const handleClickOpenLogin = () => {
    setOpenLogin(true);
  };
  const handleClickOpenSignUp = () => {
    setOpenSignUp(true);
  };
  const handleSignOut = async () => {
    await auth.signOut().then(() => setIsLogin(false));
    console.log("user log out");
  };
  const navStyles = {
    textDecoration: "none",
    fontWeight: "600",
    color: "#434343",
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: { lg: "10px 153px",sm:"10px 53px" },
      }}
    >
      <Box sx={{ display: "flex", gap: "20%" }}>
        <img src="../public/webLogo.png" alt="Logo" width={"80px"} />
        <List sx={{ display: "flex" }}>
          <ListItem>
            <NavLink to={"/"} style={navStyles}>
              Home
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink to={"/cart"} style={navStyles}>
              Cart
            </NavLink>
          </ListItem>
          <ListItem>
            <NavLink to={"/orders"} style={navStyles}>
              Orders
            </NavLink>
          </ListItem>
        </List>
      </Box>
      {isLogin ? (
        <Button
          onClick={handleSignOut}
          variant="contained"
          sx={{
            background: "#FDD247",
            boxShadow: "none",
            textTransform: "none",
            width: "120px",
            height: "47px",
            fontSize: "16px",
            color: "#444444",
            fontWeight: "600",

            "&:hover": {
              boxShadow: "none",
              background: "#fdd75b",
            },
          }}
        >
          Logout{" "}
          <MdOutlineLogout
            style={{ paddingLeft: "5px", fontSize: "24px", fontWeight: "600" }}
          />
        </Button>
      ) : (
        <Box sx={{ display: "flex", gap: "15px" }}>
          <Button
            onClick={handleClickOpenLogin}
            variant="contained"
            sx={{
              background: "#FDD247",
              width: "100px",
              height: "47px",
              boxShadow: "none",
              color: "#4A4848",
              fontWeight: "700",
              fontSize: "17px",
              textTransform: "none",
              "&:hover": {
                boxShadow: "none",
                background: "#fdd75b",
              },
            }}
          >
            Login
          </Button>
          <Button
            onClick={handleClickOpenSignUp}
            variant="contained"
            sx={{
              background: "primary",
              width: "100px",
              height: "47px",
              boxShadow: "none",
              color: "#4A4848",
              fontWeight: "700",
              fontSize: "17px",
              textTransform: "none",
              "&:hover": {
                boxShadow: "none",
                background: "#ffc250",
              },
            }}
          >
            Sign up
          </Button>
        </Box>
      )}

      <Login />
      <SingUp />
    </Box>
  );
}
