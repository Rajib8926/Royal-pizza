import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import PostProvider from "./pages/PostProvider.tsx";
import { ThemeProvider } from "@mui/material";
import theme from "./mui.themeing.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PostProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </PostProvider>
  </StrictMode>
);
