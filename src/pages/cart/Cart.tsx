import { Box, Button, Typography } from "@mui/material";
import { usePosts } from "../PostProvider";
import { useNavigate } from "react-router-dom";

import CartItem from "./CartItem";

import Lottie from "lottie-react";
import animationDataCart from "../../animations/carEmptyt.json";
import { useEffect } from "react";
export default function Cart() {
  const { cartItem } = usePosts();

  const priceArray = cartItem?.map((data) => data.price * data.quantity);
  const navigate = useNavigate();
  const totalPrice = priceArray?.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  function orderClickHandler() {
    navigate("/orderDetails");
  }
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  // useEffect(function () {
  //   addProductInCart();
  // }, []);
  console.log(cartItem);

  return (
    <Box>
      {cartItem ? (
        <Box
          sx={{
            width: { md: "750px", sm: "620px", xs: "95%" },
            margin: "20px auto",
          }}
        >
          <Typography
            variant="h5"
            fontSize={{ md: "32px", xxxs: "22px" }}
            color="#444444"
            sx={{ marginBottom: "10px" }}
          >
            Cart item
          </Typography>
          {cartItem.map((item) => (
            <CartItem cart={item} key={item.id} />
          ))}
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              marginTop: "30px",
              padding: "0px 10px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  fontSize: { sx: "16px", xxxs: "15px" },
                  fontWeight: "600",
                }}
              >
                Total price:
              </Typography>
              <Typography sx={{ fontSize: { sx: "16px", xxxs: "14px" } }}>
                {" "}
                ${totalPrice}
              </Typography>
            </Box>
            <Button
              onClick={orderClickHandler}
              variant="contained"
              sx={{
                boxShadow: "none",
                height: { xs: "43px", xxxs: "37px" },
                width: { xs: "120px", xxxs: "115px" },
                color: "#444444",
                fontWeight: "600",
                textTransform: "unset",
                fontSize: { xs: "15px", xxxs: "14px" },
                background: "#FDD247",
                "&:hover": {
                  boxShadow: "none",
                  background: "#ffe284",
                },
              }}
            >
              Order
            </Button>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <Box sx={{ width: { md: "300px", xxxs: "240px" } }}>
            <Lottie
              animationData={animationDataCart}
              style={{ width: "100%" }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
