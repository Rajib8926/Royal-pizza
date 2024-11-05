import { createBrowserRouter } from "react-router-dom";
import Applayout from "./ui/Applayout";
import Error from "./ui/error/Error";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import Orders from "./pages/orders/Orders";
import Product from "./pages/product/Product";
import OrderDetails from "./pages/orders/OrderDetails";

export const route = createBrowserRouter([
  {
    element: <Applayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/orderDetails",
        element: <OrderDetails />,
      },
      {
        path: "/product/:productId",
        element: <Product />,
      },
    ],
  },
]);
