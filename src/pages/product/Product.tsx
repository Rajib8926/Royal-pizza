import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import { usePosts } from "../PostProvider";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import { FaCheckCircle } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
type toppingType = {
  id: string;
  name: string;
  imageUrl: string;
};
export default function Product() {
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
    useNavigation("/orderDetails", {
      state: { ...product, quantity: quantity, extraTopping: toppings },
    });
  }
  function cartFunction() {
    useNavigation("/cart", {
      state: { ...product, quantity: quantity, extraTopping: toppings },
    });
  }

  const location = useLocation();
  console.log(location);

  const productId: string = location.state;
  const { getProduct, product, getToppings, toppingList } = usePosts();
  const checkBoxStyle = {
    color: "#FDD247",
    "&.Mui-checked": {
      color: "#FDD247",
    },
    "& .MuiSvgIcon-root": { fontSize: 24 },
  };
  useEffect(function () {
    getProduct(productId);
    getToppings();
  }, []);
  console.log(product);
  const buttonsDisableShadow = {
    textTransform: "none",
    boxShadow: "none",
    "&:hover": { boxShadow: "none" },
  };
  return (
    <Box sx={{ margin: "70px auto", width: "950px" }}>
      {product ? (
        <Box sx={{ display: "flex", gap: "35px" }}>
          <Box sx={{ width: "550px" }}>
            <Box
              sx={{
                width: "550px",
                height: "420px",
                backgroundColor: "#e4e4e4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "5px",
                padding: "10px",
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
                width: "100%",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "30px",
                marginTop: "40px",
              }}
            >
              <Button
                onClick={handleQuantityDecrease}
                variant="contained"
                sx={{
                  width: "42px",
                  minWidth: "0px",
                  height: "42px",
                  borderRadius: "50%",
                  fontSize: "25px",
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
                fontSize={"20px"}
                width={"30px"}
                textAlign={"center"}
              >
                {quantity}
              </Typography>
              <Button
                onClick={handleQuantityIncrease}
                variant="contained"
                sx={{
                  width: "42px",
                  minWidth: "0px",
                  height: "42px",
                  borderRadius: "50%",
                  fontSize: "25px",
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
                display: "flex",
                justifyContent: "space-between",
                marginTop: "25px",
              }}
            >
              <Button
                onClick={cartFunction}
                variant="contained"
                sx={{
                  width: "250px",
                  ...buttonsDisableShadow,
                  height: "58px",
                  fontSize: "18px",
                  fontWeight: "600",
                  background: "#F0F034",
                  color: "#313131",
                }}
              >
                Add to cart
              </Button>
              <Button
                onClick={orderFunction}
                variant="contained"
                sx={{
                  width: "250px",
                  ...buttonsDisableShadow,
                  height: "58px",
                  fontSize: "18px",
                  background: "#FDD247",
                  color: "#313131",
                  fontWeight: "600",
                }}
              >
                Order
              </Button>
            </Box>
          </Box>
          <Box>
            <Box>
              <Typography variant="h2" sx={{ fontSize: "30px" }}>
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
                  src={`../public/${
                    product.isVeg ? "veglogo" : "nonVeglogo"
                  }.jpg`}
                  alt="img"
                  style={{ width: "20px", borderRadius: "2px" }}
                />
              </Box>
              <Typography fontSize={"19px"} color="#4e4e4e" fontWeight={600}>
                ${product.price}
              </Typography>
              <Typography variant="body1">
                <b>Toppings:</b> onions,capsicum,cheese
              </Typography>
            </Box>
            <Box sx={{ marginTop: "30px" }}>
              <Typography variant="body1" color="#4e4e4e" fontWeight={600}>
                Do you want to add any extra topping?
              </Typography>
              <Typography
                variant="body1"
                fontSize={"14px"}
                color="#838383"
                marginTop={"7px"}
                marginLeft={"7px"}
              >
                Add topping
              </Typography>
              <Paper
                sx={{
                  width: "300px",
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
                      fontSize: "13px",
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
        </Box>
      ) : (
        <Typography variant="h1">Loading...</Typography>
      )}
    </Box>
  );
}
