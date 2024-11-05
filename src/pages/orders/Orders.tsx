import { Box, Typography } from "@mui/material";
import { usePosts } from "../PostProvider";
import OrderItem from "./OrderItem";

export default function Orders() {
  const { order } = usePosts();
  console.log(order);

  return (
    <Box>
      <Box sx={{ width: "880px", margin: "50px auto 0" }}>
        <Typography variant="h5">Your order</Typography>
        <Box sx={{ marginTop: "20px" }}>
          {order?.map((data, index) => (
            <OrderItem data={data} key={index} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
