import { Box, Typography } from "@mui/material";
import { BsInstagram } from "react-icons/bs";
import { FaFacebookF, FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

export default function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        background: "#fbff0032",
        alignItems: { xs: "center" },
        padding: { sm: "20px 20px", xxxs: "15px 10px" },
        flexDirection: { xxxs: "column-reverse", xs: "row" },
        // height: "57px",
        width:"100%",
        gap: "6px",
      }}
    >
      <Typography sx={{ fontSize: { xs: "14px", xxxs: "13px" } }}>
        Designed and Developed by{" "}
        <a
          style={{ color: "#ff8800" }}
          target="_blank"
          href="https://www.linkedin.com/in/rajib-roy-888087304/"
        >
          Rajib
        </a>
      </Typography>
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
            <BsInstagram  size={"18px"}/>
          </a>
        </Box>
        <Box>
          <a
            target="_blank"
            href="mailto:royrajib8926@gmail.com"
            style={{ color: "#ff8800" }}
          >
            <IoMail size={"18px"}/>
          </a>
        </Box>
        <Box>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/rajib-roy-888087304/"
            style={{ color: "#ff8800" }}
          >
            <FaLinkedin size={"18px"}/>
          </a>
        </Box>

        <Box>
          <a
            target="_blank"
            href="https://github.com/Rajib8926"
            style={{ color: "#ff8800" }}
          >
            <FaGithub size={"18px"}/>
          </a>
        </Box>
      </Box>
    </Box>
  );
}
