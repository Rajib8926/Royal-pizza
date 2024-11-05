import {
  Autocomplete,
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import indianStates from "./stateName";
import { usePosts } from "../PostProvider";

export default function OrderDetails() {
  const { cartItem, setOrder, order } = usePosts();
  const navigate = useNavigate();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const PinNumberRegExp = /^[0-9]{6}$/;
  const location = useLocation();
  const productId: string = location.state;
  console.log(productId);
  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    primaryPhoneNumber: yup.string().matches(phoneRegExp).required(),
    secondaryPhoneNumber: yup.string().matches(phoneRegExp).required(),
    state: yup.string().required(),
    pinNumber: yup.string().matches(PinNumberRegExp).required(),
    address: yup.string().required(),
    neatestRoad: yup.string().required(),
    city: yup.string().required(),
    landMark: yup.string().required(),
    paymentType: yup.string().required(),
  });
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const twoInputBox = {
    display: "flex",
    gap: "7px",
  };
  type inputType = {
    firstName: string;
    lastName: string;
    primaryPhoneNumber: string;
    secondaryPhoneNumber: string;
    state: string;
    pinNumber: string;
    address: string;
    neatestRoad: string;
    city: string;
    landMark: string;
    paymentType: string;
  };

  const formSubmitHandler: SubmitHandler<inputType> = (data) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strHours = String(hours).padStart(2, "0");

    const currentDate = `${year}/${month}/${day} ${strHours}:${minutes} ${ampm}`;
    const preOrder = {
      orderItem: cartItem,
      userDetails: { ...data, orderDate: currentDate },
    };
    if (order) {
      setOrder([...order, preOrder]);
    } else {
      setOrder([preOrder]);
    }
    navigate("/orders");
  };
  return (
    <Box sx={{ width: "100vw" }}>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <Box
          sx={{
            width: "600px",
            display: "flex",
            flexDirection: "column",
            gap: "7px",
            margin: "30px auto 0",
          }}
        >
          <Box sx={twoInputBox}>
            <TextField
              id="outlined-basic"
              label="First name"
              variant="outlined"
              sx={{
                width: "50%",
              }}
              color={`${errors.firstName ? "error" : "primary"}`}
              {...register("firstName")}
            />
            <TextField
              id="outlined-basic"
              label="Last name"
              variant="outlined"
              sx={{
                width: "50%",
              }}
              color={`${errors.lastName ? "error" : "primary"}`}
              {...register("lastName")}
            />
          </Box>
          <Box>
            <TextField
              id="outlined-basic"
              label="Primary phone number"
              variant="outlined"
              sx={{ width: "100%" }}
              color={`${errors.primaryPhoneNumber ? "error" : "primary"}`}
              {...register("primaryPhoneNumber")}
            />
          </Box>
          <Box>
            <TextField
              id="outlined-basic"
              label="Secondary phone number"
              variant="outlined"
              color={`${errors.secondaryPhoneNumber ? "error" : "primary"}`}
              sx={{ width: "100%" }}
              {...register("secondaryPhoneNumber")}
            />
          </Box>
          <Box sx={twoInputBox}>
            <Autocomplete
              disablePortal
              options={indianStates}
              sx={{ width: 300 }}
              color={`${errors.state ? "error" : "primary"}`}
              renderInput={(params) => (
                <TextField {...params} label="State" {...register("state")} />
              )}
            />

            <TextField
              id="outlined-basic"
              label="PIN number"
              variant="outlined"
              sx={{ width: "50%" }}
              color={`${errors.pinNumber ? "error" : "primary"}`}
              {...register("pinNumber")}
            />
          </Box>
          <Box>
            <TextField
              id="outlined-basic"
              label="Address"
              variant="outlined"
              sx={{ width: "100%" }}
              color={`${errors.address ? "error" : "primary"}`}
              {...register("address")}
            />
          </Box>
          <Box sx={twoInputBox}>
            <TextField
              id="outlined-basic"
              label="Nearest road"
              variant="outlined"
              sx={{ width: "50%" }}
              color={`${errors.neatestRoad ? "error" : "primary"}`}
              {...register("neatestRoad")}
            />
            <TextField
              id="outlined-basic"
              label="City"
              variant="outlined"
              sx={{ width: "50%" }}
              color={`${errors.city ? "error" : "primary"}`}
              {...register("city")}
            />
          </Box>
          <Box>
            <TextField
              id="outlined-basic"
              label="Landmark"
              variant="outlined"
              sx={{ width: "100%" }}
              color={`${errors.landMark ? "error" : "primary"}`}
              {...register("landMark")}
            />
          </Box>
        </Box>
        <Box sx={{ width: "600px", margin: "50px auto" }}>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
            >
              <FormControlLabel
                value="Cash on delivery"
                control={<Radio />}
                label="Cash on delivery"
                {...register("paymentType")}
                color={`${errors.paymentType ? "error" : "primary"}`}
              />

              <FormControlLabel
                value="pay online"
                control={<Radio />}
                label="pay online"
                {...register("paymentType")}
                color={`${errors.paymentType ? "error" : "primary"}`}
              />
            </RadioGroup>
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{
              boxShadow: "none",
              width: "120px",
              textTransform: "none",
              color: "#3b3b3b",
              fontWeight: "600",
              "&:hover": {
                boxShadow: "none",
              },
            }}
          >
            Order
          </Button>
        </Box>
      </form>
    </Box>
  );
}
