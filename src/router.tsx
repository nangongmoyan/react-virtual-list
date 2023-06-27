import { Home } from "./page/home";
import { Fixed } from "./page/fixed";
import { Variable } from "./page/variable";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path: '/fixed',
    element: <Fixed/>
  },
  {
    path: '/variable',
    element: <Variable/>
  },
])
