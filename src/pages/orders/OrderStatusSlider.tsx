import { Box, Slider } from "@mui/material";

function OrderStatusSlider() {
  const marks = [
    {
      value: 5,
      label: "Ordered",
    },
    {
      value: 30,
      label: "Cooked",
    },
    {
      value: 60,
      label: "Out of delivery",
    },
    {
      value: 100,
      label: "Delivered",
    },
  ];

  function valuetext(value: number) {
    return `${value}`;
  }

  return (
    <Box
      sx={{
        width: { md: "300px", sm: "280px", xs: "270px", xxxs: "80%" },
        marginLeft: { xs: "none", xxxs: "10px" },
      }}
    >
      <Slider
        aria-label="Restricted values"
        defaultValue={5}
        getAriaValueText={valuetext}
        step={null}
        marks={marks}
        sx={{
          ".css-lq5hqx-MuiSlider-mark": {
            width: "15px",
            height: "15px",
            borderRadius: "50%",
            background: "green",
          },
          ".css-xvk2i-MuiSlider-track": {
            background: "green",
            border: "none",
          },
          ".css-swtyag-MuiSlider-markLabel": {
            fontSize: { sm: "14px", xs: "13px", xxxs: "12px" },

            fontWeight: "600",
          },
          ".css-1qb795b-MuiSlider-markLabel": {
            left: "10px",
            fontSize: { sm: "14px", xs: "13px", xxxs: "12px" },

            fontWeight: "600",
            color: "#757575",
          },
          ".css-16kozi8-MuiSlider-mark": {
            display: "none",
          },
          ".css-1mvxlpx-MuiSlider-thumb": {
            width: "0px",
            height: "0px",
            borderRadius: "50%",
            "&:hover": {
              boxShadow: "none",
            },
          },
          ".css-1mvxlpx-MuiSlider-thumb.Mui-active": {
            boxShadow: "none",
          },
          ".css-r64h58-MuiSlider-rail": {
            background: "green",
          },
        }}
      />
    </Box>
  );
}

export default OrderStatusSlider;
