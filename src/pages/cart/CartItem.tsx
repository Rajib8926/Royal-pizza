import { Box, Button, Typography } from "@mui/material";
import { cartType, usePosts } from "../PostProvider";
import { FiMinus, FiPlus } from "react-icons/fi";

import { MdOutlineDeleteOutline } from "react-icons/md";
type cartDataType = {
  cart: cartType;
};

export default function CartItem({ cart }: cartDataType) {
  const { setCartItem, cartItem } = usePosts();

  function handleQuantityIncrease() {
    const filterData = cartItem?.map((data) =>
      data.id === cart.id ? { ...data, quantity: data.quantity + 1 } : data
    );
    setCartItem(filterData);
  }
  function handleQuantityDecrease() {
    if (cart.quantity !== 1) {
      const filterData = cartItem?.map((data) =>
        data.id === cart.id ? { ...data, quantity: data.quantity - 1 } : data
      );
      setCartItem(filterData);
    } else {
      deleteCart();
    }
  }
  function deleteCart() {
    const filterData = cartItem?.filter((data) => data.id !== cart.id);
    setCartItem(filterData);
  }
  return (
    <Box
      sx={{
        background: "#F1F1F1",
        padding: "7px",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        position: "relative",
        margin: "15px 0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(${cart.imageUrl})`,
            width: "120px",
            height: "120px",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "5px",
          }}
        ></Box>
        <Box>
          <Typography
            sx={{ fontSize: "14px", fontWeight: "600", color: "#444444" }}
          >
            {cart.name}
          </Typography>
          {cart.isVeg ? (
            <img
              src="public/veglogo.jpg"
              width={"15px"}
              style={{ borderRadius: "2px" }}
            ></img>
          ) : (
            <img
              src="public/nonVeglogo.jpg"
              width={"15px"}
              style={{ borderRadius: "2px" }}
            ></img>
          )}
          <Typography
            sx={{ fontSize: "14px", fontWeight: "600", color: "#444444" }}
          >
            ${cart.price}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: "50%",
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "30px",
          right: "60px",
        }}
      >
        <Button
          onClick={handleQuantityDecrease}
          variant="contained"
          sx={{
            width: "39px",
            minWidth: "0px",
            height: "39px",
            borderRadius: "50%",
            fontSize: "22px",
            padding: "0",
            backgroundColor: "#F9ABAB",
            "&:hover": { boxShadow: "none" },
            color: "black",
            boxShadow: "none",
          }}
        >
          <FiMinus />
        </Button>
        <Typography
          variant="h4"
          fontSize={"19px"}
          width={"30px"}
          textAlign={"center"}
        >
          {cart.quantity}
        </Typography>
        <Button
          onClick={handleQuantityIncrease}
          variant="contained"
          sx={{
            width: "39px",
            minWidth: "0px",
            height: "39px",
            borderRadius: "50%",
            fontSize: "22px",
            padding: "0",
            background: "#A5FE4B",
            "&:hover": { boxShadow: "none" },
            color: "black",
            boxShadow: "none",
          }}
        >
          <FiPlus />
        </Button>
      </Box>
      <Box
        onClick={deleteCart}
        sx={{
          position: "absolute",
          top: "5px",
          right: "5px",
          color: "#ff4d4d",
          cursor: "pointer",
        }}
      >
        <MdOutlineDeleteOutline fontSize={"26px"} />
      </Box>
    </Box>
  );
}
