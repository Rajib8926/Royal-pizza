import { Box, Button, Typography } from "@mui/material";
import { cartType, usePosts } from "../PostProvider";
import { FiMinus, FiPlus } from "react-icons/fi";

import { MdOutlineDeleteOutline } from "react-icons/md";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

type cartDataType = {
  cart: cartType;
};

export default function CartItem({ cart }: cartDataType) {
  const { setCartItem, cartItem } = usePosts();
  const userId = auth.currentUser?.uid;
  async function handleQuantityIncrease() {
    const filterData = cartItem?.map((data) =>
      data.id === cart.id ? { ...data, quantity: data.quantity + 1 } : data
    );
    setCartItem(filterData);
    const parentDocRef = doc(db, "users", userId);
    const subDocRef = doc(parentDocRef, "cart", cart.id);
    await updateDoc(subDocRef, { quantity: cart.quantity + 1 });
    console.log(filterData);
  }
  async function handleQuantityDecrease() {
    if (cart.quantity !== 1) {
      const filterData = cartItem?.map((data) =>
        data.id === cart.id ? { ...data, quantity: data.quantity - 1 } : data
      );
      if (filterData?.length === 0) {
        setCartItem(null);
      } else {
        setCartItem(filterData);
      }

      const parentDocRef = doc(db, "users", userId);
      const subDocRef = doc(parentDocRef, "cart", cart.id);
      await updateDoc(subDocRef, { quantity: cart.quantity - 1 });
    } else {
      deleteCart();
    }
  }
  async function deleteCart() {
    const filterData = cartItem?.filter((data) => data.id !== cart.id);
    console.log(filterData);

    if (filterData?.length === 0) {
      setCartItem(null);
    } else {
      setCartItem(filterData);
    }
    const parentDocRef = doc(db, "users", userId);
    const subDocRef = doc(parentDocRef, "cart", cart.id);
    await deleteDoc(subDocRef);
  }
  return (
    <Box
      sx={{
        background: "#F1F1F1",
        marginBottom: { md: "15px", xxxs: "8px" },
        padding: "3px",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { sm: "10px", xxxs: "6px" },
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(${cart.imageUrl})`,
            width: { sm: "120px", xxxs: "96px" },
            height: { sm: "110px", xxxs: "84px" },
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "5px",
          }}
        ></Box>
        <Box>
          <Typography
            sx={{
              fontSize: { sm: "14px", xxs: "13px", xxxs: "12px" },
              fontWeight: "600",
              color: "#444444",

              width: {
                md: "280px",
                sm: "230px",
                xs: "200px",
                xxs: "140px",
                xxxs: "125px",
              },
            }}
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
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          top: "40px",
          gap: { md: "30px", xxxs: "7px" },
          right: { md: "60px", xs: "40px", xxs: "25px", xxxs: "15px" },
        }}
      >
        <Button
          onClick={handleQuantityDecrease}
          variant="contained"
          sx={{
            width: { md: "39px", xxxs: "30px" },
            minWidth: "0px",
            height: { md: "39px", xxxs: "30px" },
            borderRadius: "50%",

            fontSize: { md: "22px", xxxs: "18px" },
            padding: "0",
            backgroundColor: "#F9ABAB",
            "&:hover": { boxShadow: "none", backgroundColor: "#ff9a9a" },
            color: "black",
            boxShadow: "none",
          }}
        >
          <FiMinus />
        </Button>
        <Typography
          variant="h4"
          fontSize={{ sm: "19px", xxxs: "16px" }}
          width={"30px"}
          textAlign={"center"}
        >
          {cart.quantity}
        </Typography>
        <Button
          onClick={handleQuantityIncrease}
          variant="contained"
          sx={{
            width: { md: "39px", xxxs: "30px" },
            minWidth: "0px",
            height: { md: "39px", xxxs: "30px" },
            borderRadius: "50%",
            fontSize: { md: "22px", xxxs: "18px" },
            padding: "0",
            background: "#A5FE4B",
            "&:hover": { boxShadow: "none", background: "#91f82a" },
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
          top: { sm: "5px", xxxs: "2px" },
          right: { sm: "5px", xxxs: "1px" },
          color: "#ff4d4d",
          cursor: "pointer",
          "&:hover": {
            color: "#ff6c6c",
          },
        }}
      >
        <MdOutlineDeleteOutline fontSize={"24px"} />
      </Box>
    </Box>
  );
}
