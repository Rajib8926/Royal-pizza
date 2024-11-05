import { Box, Button, Typography } from "@mui/material";
import { usePosts } from "../PostProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CartItem from "./CartItem";

export default function Cart() {
  const { cartItem, setCartItem } = usePosts();

  const priceArray = cartItem?.map((data) => data.price * data.quantity);
  const navigate = useNavigate();
  const totalPrice = priceArray?.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  const location = useLocation();
  const product = location.state;
  console.log(product);
  function orderClickHandler() {
    navigate("/orderDetails");
  }
  useEffect(function () {
    if (product) {
      const isInCart = cartItem?.find((data) => data.id === product.id);
      if (!isInCart) {
        return cartItem
          ? setCartItem([...cartItem, product])
          : setCartItem([product]);
      }
    }
  }, []);
  console.log(cartItem);

  return (
    <Box>
      {cartItem ? (
        <Box sx={{ width: "750px", margin: "20px auto" }}>
          <Typography variant="h5" fontSize={"32px"} color="#444444">
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
            }}
          >
            <Typography>Total price : ${totalPrice}</Typography>
            <Button
              onClick={orderClickHandler}
              variant="contained"
              sx={{
                boxShadow: "none",
                height: "43px",
                width: "120px",
                color: "#444444",
                fontWeight: "600",
                textTransform: "unset",
                fontSize: "15px",
                background: "#FDD247",
                "&:hover": {
                  boxShadow: "none",
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
