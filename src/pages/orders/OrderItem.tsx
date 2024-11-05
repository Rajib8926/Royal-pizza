import { Box, Button, Typography } from "@mui/material";
import OrderStatusSlider from "./OrderStatusSlider";

export default function OrderItem({ data }) {
  const totalArray = data.orderItem.map((item) => item.price * item.quantity);
  const orderPrice = totalArray?.reduce(
    (accumulator: number, currentValue: number) => {
      return accumulator + currentValue;
    },
    0
  );
  return (
    <Box
      sx={{
        display: "flex",

        gap: "25px",
      }}
    >
      <Box>
        {data.orderItem.map((item) => (
          <Box
            key={item.id}
            sx={{
              width: "450px",
              background: "#F1F1F1",
              padding: "5px",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              gap: "15px",
              marginBottom: "10px",
            }}
          >
            <Box
              sx={{
                background: `url(${item.imageUrl})`,
                width: "180px",
                height: "180px",
                backgroundSize: "cover",
                borderRadius: "5px",
              }}
            ></Box>
            <Box>
              <Typography
                sx={{ fontSize: "14px", fontWeight: "600", color: "#444444" }}
              >
                {item.name}
              </Typography>
              <Typography
                sx={{ fontSize: "14px", fontWeight: "600", color: "#444444" }}
              >
                ${item.price}
              </Typography>
              <img
                src={item.isVeg ? "veglogo.jpg" : "nonVeglogo.jpg"}
                style={{ width: "17px", borderRadius: "2px" }}
              ></img>
              <Box sx={{ marginTop: "20px", display: "flex" }}>
                <Typography
                  sx={{ fontSize: "14px", fontWeight: "600", color: "#444444" }}
                >
                  Quantity:
                </Typography>
                <Typography sx={{ fontSize: "14px" }}>
                  {item.quantity}
                </Typography>
              </Box>
              <Box sx={{ width: "240px", display: "flex" }}>
                <Typography
                  sx={{ fontSize: "14px", fontWeight: "600", color: "#444444" }}
                >
                  Extra Topping:
                </Typography>

                {item.extraTopping ? (
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#525252",
                    }}
                  >
                    Have some toppings
                  </Typography>
                ) : (
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#525252",
                    }}
                  >
                    No extra toppings
                  </Typography>
                )}
              </Box>
            </Box>
            <Box></Box>
          </Box>
        ))}
      </Box>
      <Box sx={{ marginBottom: "40px" }}>
        <Box sx={{ display: "flex" }}>
          <Typography sx={{ fontSize: "15px", fontWeight: "600" }}>
            Order price:
          </Typography>
          <Typography sx={{ fontSize: "15px" }}>${orderPrice}</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "5px" }}>
          <Typography sx={{ fontSize: "15px", fontWeight: "600" }}>
            Order placed:
          </Typography>
          <Typography sx={{ fontSize: "15px" }}>
            {data.userDetails.orderDate}
          </Typography>
        </Box>
        <Typography sx={{ fontSize: "15px", marginTop: "20px" }}>
          Arriving Within 30 minutes
        </Typography>
        <Box>
          <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
            Track your orders
          </Typography>
          <OrderStatusSlider />
          <Box sx={{ marginTop: "20px" }}>
            <Button
              sx={{
                textTransform: "none",
                padding: "8px 32px",
                color: "red",
                backgroundColor: "#fd000018",
                fontWeight: "600",
                fontSize: "14px",
                borderRadius: "5px",
              }}
            >
              Cancel order
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
