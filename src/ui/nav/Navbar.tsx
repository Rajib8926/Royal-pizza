import { Box, Button, List, ListItem } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
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
        padding: "10px 153px",
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
      <Button
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
          },
        }}
      >
        Login
      </Button>
    </Box>
  );
}
