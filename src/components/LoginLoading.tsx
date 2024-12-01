import { Backdrop, CircularProgress } from "@mui/material";
type loginLoading = {
  isOpen: boolean;
  backgroundColor?: string;
};

export default function LoginLoading({
  isOpen,
  backgroundColor,
}: loginLoading) {
  return (
    <Backdrop
      sx={(theme) => ({
        color: "#ffd311",
        zIndex: theme.zIndex.drawer + 1,
        background: backgroundColor,
      })}
      open={isOpen}
      //   onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
