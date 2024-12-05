import { Box, Button, CircularProgress, Typography } from "@mui/material";

import {
  cartType,
  orderType,
  toppingListType,
  usePosts,
} from "../PostProvider";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import CustomizedSteppers from "./Steps";
type orderDataType = {
  data: orderType;
};
export default function OrderItem({ data }: orderDataType) {


  const { getOrder } = usePosts();
  const [isOrderDeleting, setIsOrderDeleting] = useState<boolean>(false);
  const userId = auth.currentUser?.uid;
  async function deleteHandler() {
    if (userId && data.id) {
     
      setIsOrderDeleting(true);
      const parentDocRef = doc(db, "users", userId);
      const subDocRef = doc(parentDocRef, "order", data.id);
      await deleteDoc(subDocRef).then(() => getOrder());
      setIsOrderDeleting(false);
    }
  }

  const totalArray = data?.orderItem?.map(
    (item: cartType) => item?.price * item?.quantity
  );
  const orderPrice = totalArray?.reduce(
    (accumulator: number, currentValue: number) => {
      return accumulator + currentValue;
    },
    0
  );
  return (
    <Box
      sx={{
        borderBottom: "2px solid",
        paddingBottom: "15px",
        paddingTop: "15px",
        width: "100%",
        borderColor: "#b1b1b1",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "5px",
          width: "100%",
          alignItems: "center",
          marginBottom: "5px",
        }}
      >
        <Typography
          sx={{ fontSize: { xs: "18px", xxxs: "15px" }, fontWeight: "500" }}
        >
          order ID:
        </Typography>
        <Typography sx={{ fontSize: { xs: "14px", xxxs: "12px" } }}>
          {data.id}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "25px",
          width: "100%",

          justifyContent: { md: "flex-start", xxxs: "center" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            width: { xxxs: "100%", md: "auto" },
            flexDirection: { md: "row", xxxs: "column" },
          }}
        >
          <Box sx={{ width: "100%" }}>
            {data.orderItem?.map((item: cartType) => (
              <Box
                key={item.id}
                sx={{
                  width: { md: "440px", xxxs: "100%" },
                  background: "#F1F1F1",
                  padding: "2px",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  gap: { sm: "15px", xxxs: "7px" },
                  marginBottom: "10px",
                }}
              >
                <Box
                  sx={{
                    background: `url(${item.imageUrl})`,
                    width: { sm: "180px", xs: "160px", xxxs: "130px" },
                    height: { sm: "160px", xs: "140px", xxxs: "120px" },
                    backgroundSize: "cover",
                    borderRadius: "5px",
                  }}
                ></Box>
                <Box sx={{ width: "60%" }}>
                  <Typography
                    sx={{
                      fontSize: { xs: "14px", xxxs: "12px" },
                      fontWeight: "600",
                      color: "#444444",
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: "14px", xxxs: "13px" },
                        fontWeight: "600",
                        color: "#444444",
                      }}
                    >
                      ${item.price}
                    </Typography>
                    <img
                      src={item.isVeg ? "veglogo.jpg" : "nonVeglogo.jpg"}
                      style={{ width: "15px", borderRadius: "2px" }}
                    ></img>
                  </Box>
                  <Box
                    sx={{ marginTop: { md: "20px", xs: "10px", xxxs: "4px" } }}
                  >
                    <Typography sx={{ fontSize: "11px", fontWeight: "600" }}>
                      Extra toppings
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        height: "20px",
                        overflowY: "auto",
                        gap: "3px",
                      }}
                    >
                      {item.extraTopping ? (
                        item.extraTopping?.map((data: toppingListType) => (
                          <Typography
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              fontSize: { xs: "11px", xxxs: "10px" },
                            }}
                          >
                            <FaCheckCircle style={{ color: "#ffae00" }} />
                            {data.name}
                          </Typography>
                        ))
                      ) : (
                        <Typography sx={{ fontSize: "11px" }}>
                          no extra topping
                        </Typography>
                      )}
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        sx={{
                          fontSize: { sm: "14px", xs: "13px", xxxs: "11px" },
                          fontWeight: "600",
                          color: "#444444",
                        }}
                      >
                        Quantity:
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { sm: "14px", xs: "13px", xxxs: "11px" },
                        }}
                      >
                        {item.quantity}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box></Box>
              </Box>
            ))}
          </Box>

          <Box sx={{ marginBottom: "40px" }}>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  fontSize: { sm: "15px", xxxs: "14px" },
                  fontWeight: "600",
                }}
              >
                Order price:
              </Typography>
              <Typography sx={{ fontSize: { sm: "15px", xxxs: "14px" } }}>
                ${orderPrice}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "5px", marginBottom: "15px" }}>
              <Typography
                sx={{
                  fontSize: { sm: "15px", xxxs: "14px" },
                  fontWeight: "600",
                }}
              >
                Order placed:
              </Typography>
              <Typography sx={{ fontSize: { sm: "15px", xxxs: "14px" } }}>
                {data?.userDetails?.orderDate}
              </Typography>
            </Box>
            <Box sx={{ marginBottom: "15px" }}>
              <Box>
                <Typography
                  sx={{
                    fontSize: { sm: "15px", xxxs: "14px" },
                    fontWeight: "600",
                  }}
                >
                  User details:
                </Typography>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      width: { md: "400px", xs: "90%", xxxs: "100%" },
                      flexWrap: "wrap",
                    }}
                  >
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        fontSize={{ sm: "14px", xxxs: "13px" }}
                        sx={{ fontWeight: "600", color: "#585858" }}
                      >
                        Name:
                      </Typography>
                      <Typography fontSize={{ sm: "14px", xxxs: "13px" }}>
                        {data?.userDetails?.firstName}{" "}
                        {data?.userDetails?.lastName},
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        fontSize={{ sm: "14px", xxxs: "13px" }}
                        sx={{ fontWeight: "600", color: "#585858" }}
                      >
                        PIN:
                      </Typography>
                      <Typography fontSize={{ sm: "14px", xxxs: "13px" }}>
                        {data?.userDetails?.pinNumber}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",

                        alignItems: "flex-start",
                      }}
                    >
                      <Typography
                        fontSize={{ sm: "14px", xxxs: "13px" }}
                        sx={{
                          fontWeight: "600",
                          color: "#585858",
                        }}
                      >
                        Address:
                      </Typography>
                      <Typography fontSize={{ sm: "14px", xxxs: "13px" }}>
                        {data?.userDetails?.address}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        fontSize={{ sm: "14px", xxxs: "13px" }}
                        sx={{ fontWeight: "600", color: "#585858" }}
                      >
                        Landmark:
                      </Typography>
                      <Typography fontSize={{ sm: "14px", xxxs: "13px" }}>
                        {data?.userDetails?.landMark},
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        fontSize={{ sm: "14px", xxxs: "13px" }}
                        sx={{ fontWeight: "600", color: "#585858" }}
                      >
                        City:
                      </Typography>
                      <Typography fontSize={{ sm: "14px", xxxs: "13px" }}>
                        {data?.userDetails?.city},
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        fontSize={{ sm: "14px", xxxs: "13px" }}
                        sx={{ fontWeight: "600", color: "#585858" }}
                      >
                        Phone no.:
                      </Typography>
                      <Typography fontSize={{ sm: "14px", xxxs: "13px" }}>
                        {data?.userDetails?.primaryPhoneNumber},
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        fontSize={{ sm: "14px", xxxs: "13px" }}
                        sx={{ fontWeight: "600", color: "#585858" }}
                      >
                        Sec Phone no.:
                      </Typography>
                      <Typography fontSize={{ sm: "14px", xxxs: "13px" }}>
                        {data?.userDetails?.secondaryPhoneNumber},
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Typography sx={{ fontSize: { sm: "15px", xxxs: "14px" } }}>
              Arriving Within 30 minutes
            </Typography>

            <Box
              sx={{
                display: { md: "block", xs: "flex" },
                justifyContent: "space-between",
                gap: "5px",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: { sm: "16px", xxxs: "14px" },
                    fontWeight: "600",
                  }}
                >
                  Track your orders
                </Typography>
                {/* <OrderStatusSlider /> */}
                <CustomizedSteppers />
              </Box>
              <Box sx={{ marginTop: "20px" }}>
                {isOrderDeleting ? (
                  <LoadingButton
                    loading
                    variant="outlined"
                    loadingIndicator={
                      <CircularProgress size={23} sx={{ color: "#c5c5c5" }} />
                    }
                    sx={{
                      "&.Mui-disabled": {
                        border: "none",
                        background: "#fd000018",
                      },

                      padding: "8px 32px",
                      width: { sm: "160px", xxxs: "130px" },
                      height: { sm: "45px", xxxs: "40px" },
                      fontSize: { sm: "18px", xxxs: "16px" },
                      fontWeight: "600",

                      color: "#110b0b",
                    }}
                  ></LoadingButton>
                ) : (
                  <Button
                    onClick={deleteHandler}
                    sx={{
                      textTransform: "none",

                      width: { sm: "160px", xxxs: "130px" },
                      height: { sm: "45px", xxxs: "40px" },
                      color: "red",
                      backgroundColor: "#fd000018",
                      fontWeight: "600",
                      fontSize: { sm: "14px", xxxs: "13px" },
                      borderRadius: "5px",
                      "&:hover": { backgroundColor: "#fd00002f" },
                    }}
                  >
                    Cancel order
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
