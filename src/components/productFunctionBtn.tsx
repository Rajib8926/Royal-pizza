import { LoadingButton } from "@mui/lab";
import { Box, Button } from "@mui/material";
import React from "react";

export default function productFunctionBtn() {
  return (
    <Box>
      <Box
        sx={{
          width: { sm: "100%", xxxs: "95%", xs: "75%" },
          margin: "40px auto 0",
          display: "flex",
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
          display: "flex",
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
  );
}
