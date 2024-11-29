import { Backdrop, CircularProgress } from "@mui/material";
type loginLoading = {
  isOpen: boolean;
};
export default function LoginLoading({ isOpen }: loginLoading) {
  return (
    <Backdrop
      sx={(theme) => ({ color: "#ffd311", zIndex: theme.zIndex.drawer + 1 })}
      open={isOpen}
      //   onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
