import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import indianStates from "./stateName";
import { usePosts, userDetailsType } from "../PostProvider";
import { auth, db } from "../../firebase";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import LoginLoading from "../../components/LoginLoading";
import { LoadingButton } from "@mui/lab";
import orderConformationAnimation from "../../animations/orderDone.json";
import Lottie from "lottie-react";
// import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
export default function OrderDetails() {
  const [userDetails, setUserDetails] = useState<userDetailsType>();
  const [isLoading, setIsLoading] = useState(false);
  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const [isConformation, setIsConformation] = useState(false);

  const userId = auth.currentUser?.uid;

  const { cartItem, getCart, order, isLogin, getOrder, deleteAllCart } =
    usePosts();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (userId) {
        async function gateUserDetails() {
          if (userId) {
            setIsLoading(true);

            const parentDocRef = doc(db, "users", userId);
            const subDocRef = doc(parentDocRef, "userDetails", "personalData");

            const docSnap = await getDoc(subDocRef);
            if (docSnap.exists()) {
              const data = docSnap.data();
              setUserDetails(data as userDetailsType);
              reset(data);
            }
            setIsLoading(false);
          }
        }
        gateUserDetails();
      }
    },
    [userId]
  );

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const PinNumberRegExp = /^[0-9]{6}$/;
  const location = useLocation();
  const orderProduct = location.state;

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
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: userDetails,
  });
  const twoInputBox = {
    display: "flex",
    gap: "7px",
  };
  interface inputType {
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
    paymentType?: string;
  }

  const formSubmitHandler = async (data: inputType) => {
    if (userId) {
      setIsOrderLoading(true);
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
      const personalData: inputType = { ...data };

      delete personalData.paymentType;

      const currentDate = `${year}/${month}/${day} ${strHours}:${minutes} ${ampm}`;
      const parentDocRef = doc(db, "users", userId);
      const subcollectionRef = collection(parentDocRef, "userDetails");
      const newDocRef = doc(subcollectionRef, "personalData");
      await setDoc(newDocRef, personalData);
      const preOrder = {
        orderItem: orderProduct ? [orderProduct] : cartItem,
        userDetails: { ...data, orderDate: currentDate },
      };
      if (order && userId) {
        const parentDocRef = doc(db, "users", userId);
        const subcollectionRef = collection(parentDocRef, "order");
        await addDoc(subcollectionRef, preOrder).then(getOrder);
        // .then(() =>
        //   setOrder([...order, preOrder])
        // );
        const userDetailsDocRef = doc(
          parentDocRef,
          "userDetails",
          "personalData"
        );
        await getDoc(userDetailsDocRef);
      } else {
        if (userId) {
          const parentDocRef = doc(db, "users", userId);
          const subcollectionRef = collection(parentDocRef, "order");
          await addDoc(subcollectionRef, preOrder).then(getOrder);
        }
      }

      setIsOrderLoading(false);
      setIsConformation(true);
      setTimeout(() => {
        setIsConformation(false);
        navigate("/orders");
      }, 3500);
      if (!orderProduct) {
        deleteAllCart().then(() => {
          setIsOrderLoading(false);
          setIsConformation(true);
          setTimeout(() => {
            setIsConformation(false);
            navigate("/orders");
          }, 3500);
          getCart();
        });
      }
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return (
    <Box sx={{ marginBottom: "30px", minHeight: "90vh" }}>
      {(isLogin && orderProduct) || (isLogin && cartItem) ? (
        isLoading ? (
          <LoginLoading isOpen={true} />
        ) : (
          <form onSubmit={handleSubmit(formSubmitHandler)}>
            <Box
              sx={{
                width: { sm: "600px", xxxs: "95%" },
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
                  // inputProps={{ style: { height: "20px" } }}

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
                  sx={{ width: "50%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="State"
                      {...register("state")}
                      color={`${errors.state ? "error" : "primary"}`}
                    />
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
            <Box
              sx={{ width: { sm: "600px", xxxs: "95%" }, margin: "50px auto" }}
            >
              <Box sx={{ display: "flex", width: "100%" }}>
                <RadioGroup sx={{ width: "100%" }} {...register("paymentType")}>
                  <FormControlLabel
                    sx={{
                      // border: "1px solid",
                      width: "100%",
                      height: "54px",
                      margin: "0 0 14px",
                      borderRadius: "5px",
                      background: "#f0f0f0",
                    }}
                    control={
                      <Radio
                        value="Cash on delivery"
                        color={`${errors.paymentType ? "error" : "primary"}`}
                        sx={{
                          ".css-1nvctzy-MuiButtonBase-root-MuiRadio-root.Mui-checked":
                            { color: "#ffff" },
                        }}
                      />
                    }
                    label="Cash on delivery"
                  />

                  <FormControlLabel
                    disabled
                    sx={{
                      // border: "1px solid",

                      width: "100%",
                      height: "54px",
                      borderRadius: "5px",
                      margin: "0 0 18px",
                      background: "#f0f0f0",
                    }}
                    value="pay online"
                    control={<Radio value="online" />}
                    label="pay online"
                    color={`${errors.paymentType ? "error" : "primary"}`}
                  />
                </RadioGroup>
              </Box>
              {isOrderLoading ? (
                <LoadingButton
                  loading
                  variant="outlined"
                  loadingIndicator={
                    <CircularProgress size={23} sx={{ color: "#838383" }} />
                  }
                  sx={{
                    "&.Mui-disabled": { border: "none", background: "#ffbb27" },

                    boxShadow: "none",
                    width: "180px",
                    height: "45px",
                    textTransform: "none",
                    color: "#3b3b3b",
                    fontWeight: "600",
                    "&:hover": {
                      boxShadow: "none",
                    },
                  }}
                >
                  Submit
                </LoadingButton>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    boxShadow: "none",
                    width: "180px",
                    height: "45px",
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
              )}
            </Box>
          </form>
        )
      ) : (
        <Box
          sx={{
            margin: "100px auto 0",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{ fontSize: "28px", color: "#ff1414", fontWeight: "600" }}
          >
            This page cant be accessible !
          </Typography>
        </Box>
      )}
      <Backdrop
        sx={(theme) => ({
          color: "#ffd311",
          zIndex: theme.zIndex.drawer + 1,
          background: "#4386ff",
        })}
        open={isConformation}
        //   onClick={handleClose}
      >
        <Box sx={{ width: { md: "300px", xxxs: "240px" } }}>
          {isConformation ? (
            <Lottie
              // loop={false}
              animationData={orderConformationAnimation}
              style={{ width: "100%" }}
            />
          ) : (
            ""
          )}
        </Box>
      </Backdrop>
    </Box>
  );
}
