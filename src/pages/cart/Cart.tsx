import { Box, Button, Typography } from "@mui/material";
import { usePosts } from "../PostProvider";
import { useNavigate } from "react-router-dom";

import CartItem from "./CartItem";

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
                height: { xs: "43px", xxxs: "35px" },
                width: { xs: "120px", xxxs: "100px" },
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
        "no cart"
      )}
    </Box>
  );
}
