import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import { cartType, usePosts } from "../PostProvider";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import { FaCheckCircle } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import LoginLoading from "../../components/LoginLoading";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
export type toppingType = {
  id?: string;
  name?: string;
  imageUrl?: string;
};

export default function Product() {
  const {
    getProduct,
    product,
    getToppings,
    toppingList,
    isLogin,
    setOpenSignUp,
    setCartItem,
    cartItem,
  } = usePosts();
  const [toppings, setToppings] = useState<toppingType[] | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  function handleTopping(item: toppingType) {
    if (!toppings) {
      setToppings([item]);
    } else {
      if (toppings.find((data) => data.id === item.id)) {
        const filterTopping: toppingType[] = toppings.filter(
          (data) => data.id !== item.id
        );
        setToppings(filterTopping);
      } else {
        setToppings([...toppings, item]);
      }
    }
  }

  function handleQuantityIncrease() {
    setQuantity((data) => (data < 15 ? data + 1 : data));
  }
  function handleQuantityDecrease() {
    setQuantity((data) => (data !== 1 ? data - 1 : data));
  }
  const useNavigation = useNavigate();
  function orderFunction() {
    if (isLogin) {
      useNavigation("/orderDetails", {
        state: { ...product, quantity: quantity, extraTopping: toppings },
      });
    } else {
      setOpenSignUp(true);
    }
  }
  const userId = auth.currentUser?.uid;
  const [cartLoading, setCartLoading] = useState(false);
  const isInCart = cartItem?.find((data) => data.id === product?.id);
  async function cartFunction() {
    if (isLogin) {
      if (!isInCart && product?.id && userId) {
        console.log("Yes");
        setCartLoading(true);
        const parentDocRef = doc(db, "users", userId);
        const subcollectionRef = doc(parentDocRef, "cart", product?.id);
        const returnData = await setDoc(subcollectionRef, {
          ...product,
          quantity: quantity,
          extraTopping: toppings,
        }).finally(() => setCartLoading(false));

        console.log(returnData);
        const docSnap = await getDoc(subcollectionRef);
        const currentCart = docSnap.data() as cartType;

        if (cartItem) {
          console.log(cartItem);

          setCartItem([...cartItem, currentCart]);
        } else {
          setCartItem([currentCart]);
        }
      }
    } else {
      setOpenSignUp(true);
    }
  }
  const { IdOfProduct } = useParams();

  const checkBoxStyle = {
    color: "#FDD247",
    "&.Mui-checked": {
      color: "#FDD247",
    },
    "& .MuiSvgIcon-root": { fontSize: 24 },
  };
  useEffect(function () {
    getProduct(IdOfProduct);
    getToppings();
  }, []);

  const buttonsDisableShadow = {
    textTransform: "none",
    boxShadow: "none",
    "&:hover": { boxShadow: "none" },
  };

  return (
    <Box
      sx={{
        margin: { sm: "70px auto", xxxs: "10px auto" },
        width: { md: "950px", sm: "660px" },
      }}
    >
      {product ? (
        <Box
          sx={{
            display: "flex",
            gap: { md: "35px", xxxs: "15px" },
            margin: "auto",
            flexDirection: { sm: "row", xxxs: "column" },
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: { md: "500px", sm: "60%", xxxs: "100%" },
            }}
          >
            <Box
              sx={{
                // width: { md: "500px", sm: "400px" },
                margin: "auto",
                width: { sm: "100%", xxxs: "95%", xs: "75%" },
                height: { md: "420px", sm: "300px", xxxs: "300px" },
                backgroundColor: "#e4e4e4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "5px",
                padding: "5px",
              }}
            >
              <Paper
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${product.imageUrl})`,
                  backgroundSize: "cover",
                  borderRadius: "5px",
                  backgroundPosition: "center",
                  boxShadow: "none",
                }}
              ></Paper>
            </Box>
            <Box
              sx={{
                width: { sm: "100%", xxxs: "95%", xs: "75%" },
                margin: "40px auto 0",
                display: { sm: "flex", xxxs: "none" },
                justifyContent: "center",
                alignItems: "center",
                gap: "30px",
              }}
            >
              <Button
                onClick={handleQuantityDecrease}
                variant="contained"
                sx={{
                  width: { md: "42px", xxxs: "37px" },
                  minWidth: "0px",
                  height: { md: "42px", xxxs: "37px" },
                  borderRadius: "50%",
                  fontSize: { md: "25px", xxxs: "21px" },
                  padding: "0",
                  backgroundColor: "#F9ABAB",

                  color: "black",
                  ...buttonsDisableShadow,
                }}
              >
                <FiMinus />
              </Button>
              <Typography
                variant="h4"
                fontSize={{ md: "20px", xxxs: "18px" }}
                width={"30px"}
                textAlign={"center"}
              >
                {quantity}
              </Typography>
              <Button
                onClick={handleQuantityIncrease}
                variant="contained"
                sx={{
                  width: { md: "42px", xxxs: "37px" },
                  minWidth: "0px",
                  height: { md: "42px", xxxs: "37px" },
                  borderRadius: "50%",
                  fontSize: { md: "25px", xxxs: "21px" },
                  padding: "0",
                  background: "#A5FE4B",

                  color: "black",
                  ...buttonsDisableShadow,
                }}
              >
                <FiPlus />
              </Button>
            </Box>
            <Box
              sx={{
                width: { sm: "100%", xxxs: "95%", xs: "75%" },
                display: { sm: "flex", xxxs: "none" },
                justifyContent: "space-between",
                marginTop: { md: "25px", xxxs: "35px" },
                margin: "40px auto 0",
              }}
            >
              {!cartLoading ? (
                <Button
                  disabled={isInCart ? true : false}
                  onClick={cartFunction}
                  variant="contained"
                  sx={{
                    width: "46%",
                    ...buttonsDisableShadow,
                    height: { md: "58px", xs: "50px" },
                    fontSize: { md: "18px", xs: "16px" },
                    fontWeight: "600",
                    background: "#F0F034",
                    color: "#110b0b",
                  }}
                >
                  Add to cart
                </Button>
              ) : (
                <LoadingButton
                  loading
                  variant="outlined"
                  loadingIndicator={
                    <CircularProgress size={23} sx={{ color: "#c5c5c5" }} />
                  }
                  sx={{
                    border: "2px solid #3f51b5",
                    "&.Mui-disabled": { border: "none" },

                    width: "46%",
                    ...buttonsDisableShadow,
                    height: { md: "58px", xs: "50px" },
                    fontSize: { md: "18px", xs: "16px" },
                    fontWeight: "600",
                    background: "#F0F034",
                    color: "#110b0b",
                  }}
                >
                  Submit
                </LoadingButton>
              )}
              <Button
                onClick={orderFunction}
                variant="contained"
                sx={{
                  width: "46%",
                  ...buttonsDisableShadow,
                  height: { md: "58px", xs: "50px" },
                  fontSize: { md: "18px", xs: "16px" },

                  background: "#FDD247",
                  color: "#313131",
                  fontWeight: "600",
                }}
              >
                Order
              </Button>
            </Box>
          </Box>
          <Box
            sx={{ width: { md: "none", sm: "40%", xxxs: "95%", xs: "75%" } }}
          >
            <Box>
              <Typography
                variant="h2"
                sx={{ fontSize: { md: "30px", xs: "25px", xxxs: "18px" } }}
              >
                {product.name}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  gap: "30px",
                }}
              >
                <Rating
                  sx={{ margin: "5px 0" }}
                  name="half-rating-read"
                  defaultValue={4.5}
                  precision={0.5}
                  readOnly
                  emptyIcon={
                    <StarIcon style={{ color: "#cecece" }} fontSize="inherit" />
                  }
                />
                <img
                  src={`../../../${
                    product.isVeg ? "veglogo" : "nonVeglogo"
                  }.jpg`}
                  alt="img"
                  style={{ width: "17px", borderRadius: "2px" }}
                />
              </Box>
              <Typography
                fontSize={{ md: "19px", xs: "17px" }}
                color="#4e4e4e"
                fontWeight={600}
              >
                ${product.price}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: { md: "16px", xs: "15px", xxxs: "14px" } }}
              >
                <b>Toppings:</b> onions,capsicum,cheese
              </Typography>
            </Box>
            <Box sx={{ marginTop: { md: "30px", xs: "25px", xxxs: "25px" } }}>
              <Typography
                variant="body1"
                color="#4e4e4e"
                fontWeight={600}
                fontSize={{ md: "16px", xs: "14px", xxxs: "13px" }}
              >
                Do you want to add any extra topping?
              </Typography>
              <Typography
                variant="body1"
                fontSize={{ xs: "14px", xxxs: "11px" }}
                color="#979797"
                marginTop={"7px"}
                fontWeight={"600"}
                marginLeft={"7px"}
              >
                Add topping
              </Typography>
              <Paper
                sx={{
                  width: { md: "300px", xxxs: "100%" },
                  minHeight: "50px",
                  boxShadow: "none",
                  background: "#F2F1F1",
                  padding: "10px",
                  display: "flex",
                  gap: "5px",
                  flexWrap: "wrap",
                }}
              >
                {toppings?.map((item) => (
                  <Typography
                    key={item.id}
                    sx={{
                      fontSize: { md: "13px", xs: "11px" },
                      color: "#757575",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      gap: "2px",
                    }}
                  >
                    <FaCheckCircle style={{ color: "#ffae00" }} />
                    {item.name}
                  </Typography>
                ))}
              </Paper>
              <FormGroup sx={{ margin: "15px 0 15px 10px" }}>
                {toppingList?.map((item) => (
                  <FormControlLabel
                    sx={{
                      ".css-rizt0-MuiTypography-root": {
                        fontSize: { md: "16px", xxxs: "14px" },
                      },
                    }}
                    key={item.id}
                    control={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Checkbox sx={checkBoxStyle} />
                        <img
                          src={item.imageUrl}
                          width={"35px"}
                          style={{ marginRight: "7px" }}
                        ></img>
                      </Box>
                    }
                    label={item.name}
                    onChange={() => handleTopping(item)}
                  />
                ))}
              </FormGroup>
            </Box>
          </Box>
          <Box
            sx={{
              width: { sm: "100%", xxxs: "95%", xs: "75%" },
              margin: "40px auto 0",
              display: { xxxs: "flex", sm: "none" },
              justifyContent: "center",
              alignItems: "center",
              gap: "30px",
            }}
          >
            <Button
              onClick={handleQuantityDecrease}
              variant="contained"
              sx={{
                width: { md: "42px", xxxs: "37px" },
                minWidth: "0px",
                height: { md: "42px", xxxs: "37px" },
                borderRadius: "50%",
                fontSize: { md: "25px", xxxs: "21px" },
                padding: "0",
                backgroundColor: "#F9ABAB",

                color: "black",
                ...buttonsDisableShadow,
              }}
            >
              <FiMinus />
            </Button>
            <Typography
              variant="h4"
              fontSize={{ md: "20px", xxxs: "18px" }}
              width={"30px"}
              textAlign={"center"}
            >
              {quantity}
            </Typography>
            <Button
              onClick={handleQuantityIncrease}
              variant="contained"
              sx={{
                width: { md: "42px", xxxs: "37px" },
                minWidth: "0px",
                height: { md: "42px", xxxs: "37px" },
                borderRadius: "50%",
                fontSize: { md: "25px", xxxs: "21px" },
                padding: "0",
                background: "#A5FE4B",

                color: "black",
                ...buttonsDisableShadow,
              }}
            >
              <FiPlus />
            </Button>
          </Box>
          <Box
            sx={{
              width: { sm: "100%", xxxs: "95%", xs: "75%" },
              display: { xxxs: "flex", sm: "none" },
              justifyContent: "space-between",
              marginTop: { md: "25px", xxxs: "35px" },
              margin: "40px auto 0",
            }}
          >
            {!cartLoading ? (
              <Button
                disabled={isInCart ? true : false}
                onClick={cartFunction}
                variant="contained"
                sx={{
                  width: "46%",
                  ...buttonsDisableShadow,
                  height: { md: "58px", xxxs: "50px" },
                  fontSize: { md: "18px", xs: "16px" },
                  fontWeight: "600",
                  background: "#F0F034",
                  color: "#110b0b",
                }}
              >
                Add to cart
              </Button>
            ) : (
              <LoadingButton
                loading
                variant="outlined"
                loadingIndicator={
                  <CircularProgress size={23} sx={{ color: "#c5c5c5" }} />
                }
                sx={{
                  border: "2px solid #3f51b5",
                  "&.Mui-disabled": { border: "none" },

                  width: "46%",
                  ...buttonsDisableShadow,
                  height: { md: "58px", xs: "50px" },
                  fontSize: { md: "18px", xs: "16px" },
                  fontWeight: "600",
                  background: "#F0F034",
                  color: "#110b0b",
                }}
              >
                Submit
              </LoadingButton>
            )}
            <Button
              onClick={orderFunction}
              variant="contained"
              sx={{
                width: "46%",
                ...buttonsDisableShadow,
                height: { md: "58px", xs: "50px" },
                fontSize: { md: "18px", xs: "16px" },

                background: "#FDD247",
                color: "#313131",
                fontWeight: "600",
              }}
            >
              Order
            </Button>
          </Box>
        </Box>
      ) : (
        <LoginLoading isOpen={true} />
      )}
    </Box>
  );
}
