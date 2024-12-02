import { Box, Typography } from "@mui/material";
import { usePosts } from "../PostProvider";
import OrderItem from "./OrderItem";
import Lottie from "lottie-react";
import animationDataOrder from "../../animations/emptyOrder.json";
export default function Orders() {
  const { order } = usePosts();
  console.log(order);

  return (
    <Box>
      <Box
        sx={{
          width: { md: "880px", sm: "70%", xs: "90%", xxxs: "96%" },
          margin: {
            md: "50px auto 200px",

            xxxs: "20px auto 150px",
          },
        }}
      >
        {order ? (
          <Typography
            variant="h5"
            sx={{ fontSize: { sm: "22px", xs: "20px", xxxs: "19px" } }}
          >
            Your order
          </Typography>
        ) : (
          ""
        )}

        <Box sx={{ marginTop: { md: "20px", xxxs: "0px" } }}>
          {order ? (
            order.map((data) => <OrderItem data={data} key={data?.id} />)
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "70vh",
              }}
            >
              <Box sx={{ width: { md: "300px", xxxs: "230px" } }}>
                <Lottie
                  animationData={animationDataOrder}
                  style={{ width: "100%" }}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
