import { Box, Button, Drawer, List, ListItem } from "@mui/material";

import { NavLink, useNavigate } from "react-router-dom";
import { usePosts } from "../../pages/PostProvider";
import Login from "../../pages/LoginAndSignUpPage/Login";
import SingUp from "../../pages/LoginAndSignUpPage/SignUp";
import { auth } from "../../firebase";
import { MdOutlineLogout } from "react-icons/md";
import NavForMobile from "../../components/NavForMobile";
import { useState } from "react";
import Hamburger from "hamburger-react";

export default function Navbar() {
  const navigate = useNavigate();
  const { setOpenLogin, setOpenSignUp, isLogin, setIsLogin } = usePosts();
  const [open, setOpen] = useState(false);
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
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
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
        padding: {
          lg: "10px 153px",
          sm: "10px 53px",
          xs: "8px 30px 8px",
          xxs: "8px 16px 8px",
        },

        boxShadow: "0px 0px 5px #ffc14f",
      }}
    >
      <Box sx={{ display: "flex", gap: { md: "10", sm: "20px" } }}>
        <Box
          onClick={() => navigate("/")}
          sx={{
            width: { xs: "68px", xxxs: "50px" },
            height: { xs: "56px", xxxs: "45px" },
            cursor: "pointer",
            background: "url(../../../webLogo.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Box>
        <List sx={{ display: { sm: "flex", xxxs: "none" } }}>
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
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {isLogin ? (
          <Button
            onClick={handleSignOut}
            variant="contained"
            sx={{
              background: "#FDD247",
              display: { sm: "flex", xxxs: "none" },
              boxShadow: "none",
              textTransform: "none",
              width: { md: "120px", xxxs: "100px" },
              height: "47px",
              fontSize: { md: "16px", xxxs: "14px" },
              color: "#444444",
              fontWeight: "600",
              sm: {
                display: "none",
              },
              "&:hover": {
                boxShadow: "none",
                background: "#fdd75b",
              },
            }}
          >
            Logout{" "}
            <MdOutlineLogout
              style={{
                paddingLeft: "5px",
                fontSize: "24px",
                fontWeight: "600",
              }}
            />
          </Button>
        ) : (
          <Box sx={{ display: "flex", gap: "15px" }}>
            <Button
              onClick={handleClickOpenLogin}
              variant="contained"
              sx={{
                background: "#FDD247",
                display: { sm: "block", xxxs: "none" },
                width: { md: "100px", xxxs: "90px" },
                height: { md: "47px", sm: "44px" },
                fontSize: { md: "17px", sm: "15px" },
                boxShadow: "none",
                color: "#4A4848",
                fontWeight: "700",
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
                display: { sm: "block", xxxs: "none" },
                width: { md: "100px", xxxs: "90px" },
                height: { md: "47px", sm: "44px" },
                fontSize: { md: "17px", sm: "15px" },
                boxShadow: "none",
                color: "#4A4848",
                fontWeight: "700",
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
        <Box sx={{ display: { sm: "none", xxxs: "block" } }}>
          <Button onClick={toggleDrawer(true)} sx={{ height: "40px" }}>
            <Hamburger toggled={open} toggle={setOpen} />
          </Button>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            <NavForMobile
              toggleDrawer={toggleDrawer}
              handleClickOpenLogin={handleClickOpenLogin}
              handleClickOpenSignUp={handleClickOpenSignUp}
              handleSignOut={handleSignOut}
            />
          </Drawer>
        </Box>
      </Box>
      <Login />
      <SingUp />
    </Box>
  );
}
