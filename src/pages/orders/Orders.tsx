import { Box, Typography } from "@mui/material";
import { usePosts } from "../PostProvider";
import OrderItem from "./OrderItem";

export default function Orders() {
  const { order } = usePosts();
  console.log(order);

  return (
    <Box>
      <Box
        sx={{
          width: { md: "880px", sm: "70%", xs: "90%", xxxs: "96%" },
          margin: "50px auto 200px",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontSize: { sm: "22px", xs: "20px", xxxs: "19px" } }}
        >
          Your order
        </Typography>
        <Box sx={{ marginTop: { xs: "20px" } }}>
          {order ? (
            order.map((data) => <OrderItem data={data} key={data?.id} />)
          ) : (
            <Typography>Loading....</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
