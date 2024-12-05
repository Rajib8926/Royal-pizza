import { Box, Button, List, ListItem } from "@mui/material";
import { MdOutlineLogout } from "react-icons/md";
import { usePosts } from "../pages/PostProvider";
import { NavLink, useNavigate } from "react-router-dom";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import {
  FaCartArrowDown,
  FaFacebookF,
  FaGithub,
  FaHome,
  FaLinkedin,
} from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { BsInstagram } from "react-icons/bs";

type navFunTyp = {
  toggleDrawer: (newOpen: boolean) => () => void;
  handleClickOpenLogin: () => void;
  handleClickOpenSignUp: () => void;
  handleSignOut: () => Promise<void>;
};
export default function NavForMobile({
  toggleDrawer,
  handleSignOut,
  handleClickOpenLogin,
  handleClickOpenSignUp,
}: navFunTyp) {
  const { isLogin } = usePosts();
 
  const navStyles = {
    textDecoration: "none",
    fontWeight: "500",
    color: "#434343",
    width: "100%",
    Height: "100%",
    display: "flex",
    alignItem: "center",
    gap: "8px",
  };
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "80vw ",
        padding: "20px 0",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <Box sx={{ width: { xs: "80%", xxxs: "90%" } }}>
        <Box
          onClick={() => navigate("/")}
          sx={{
            width: { xxxs: "68px" },
            height: { xxxs: "56px" },
            cursor: "pointer",
            background: "url(../../webLogo.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          marginTop: "30px",
          alignItems: "center",
          justifyContent: "center",
          width: { xs: "80%", xxxs: "90%" },
          paddingBottom: "20px",
          borderBottom: "2px solid #ffae35",
        }}
      >
        {isLogin ? (
          <Button
            onClick={handleSignOut}
            variant="contained"
            sx={{
              background: "#FDD247",
              display: { xxxs: "flex" },
              boxShadow: "none",
              textTransform: "none",
              width: "100%",
              height: "52px",
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
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              flexDirection: "column",

              width: "100%",
            }}
          >
            <Button
              onClick={handleClickOpenLogin}
              variant="contained"
              sx={{
                background: "#FDD247",
                display: { xxxs: "flex" },
                width: "100%",
                height: { sx: "50px", xxxs: "46px" },
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
                display: { xxxs: "flex" },
                width: "100%",
                height: { sx: "50px", xxxs: "46px" },
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
      </Box>
      <List
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "15px",
          width: { xs: "80%", xxxs: "90%" },
          gap: "10px",
          flexDirection: "column",
        }}
      >
        <ListItem
          sx={{
            boxShadow: "0 0 5px #b3b3b3",
            height: { sx: "48px", xxxs: "46px" },
            borderRadius: "7px",
          }}
        >
          <NavLink to={"/"} style={navStyles}>
            <FaHome fontSize={"19px"} /> Home
          </NavLink>
        </ListItem>
        <ListItem
          sx={{
            // border: "2px solid #7a7a7a",
            boxShadow: "0 0 5px #b3b3b3",
            height: { sx: "48px", xxxs: "46px" },
            borderRadius: "7px",
          }}
        >
          <NavLink to={"/cart"} style={navStyles}>
            <FaCartArrowDown fontSize={"19px"} /> Cart
          </NavLink>
        </ListItem>
        <ListItem
          sx={{
            boxShadow: "0 0 5px #b3b3b3",
            height: { sx: "48px", xxxs: "46px" },
            borderRadius: "7px",
          }}
        >
          <NavLink to={"/orders"} style={navStyles}>
            <LocalShippingIcon sx={{ fontSize: "21px" }} /> Orders
          </NavLink>
        </ListItem>
      </List>
      <Box
        sx={{
          display: "flex",
          position: "absolute",
          alignItems: { xs: "center" },
          padding: { sm: "20px 20px", xxxs: "15px 10px" },
          flexDirection: { xxxs: "column-reverse", xs: "row" },

          bottom: "5px",
          left: "5px",
          gap: "6px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: { xs: "30px", xxxs: "20px" },
            margin: { xs: "0 20px", xxxs: "0 0px" },
          }}
        >
          <Box>
            <a
              target="_blank"
              href="https://www.facebook.com/profile.php?id=100049178316585"
              style={{ color: "#ff8800" }}
            >
              <FaFacebookF size={"18px"} />
            </a>
          </Box>
          <Box>
            <a
              target="_blank"
              href="https://www.instagram.com/rajibroy8926/"
              style={{ color: "#ff8800" }}
            >
              <BsInstagram size={"18px"} />
            </a>
          </Box>
          <Box>
            <a
              target="_blank"
              href="mailto:royrajib8926@gmail.com"
              style={{ color: "#ff8800" }}
            >
              <IoMail size={"18px"} />
            </a>
          </Box>
          <Box>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/rajib-roy-888087304/"
              style={{ color: "#ff8800" }}
            >
              <FaLinkedin size={"18px"} />
            </a>
          </Box>

          <Box>
            <a
              target="_blank"
              href="https://github.com/Rajib8926"
              style={{ color: "#ff8800" }}
            >
              <FaGithub size={"18px"} />
            </a>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
