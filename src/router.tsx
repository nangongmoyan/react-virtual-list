import { Home } from "./page/home";
import { Fixed } from "./page/fixed";
import { Variable } from "./page/variable";
import { VariablePage1 } from "./page/variable/VariablePage1";
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
  {
    path: '/variable1',
    element: <VariablePage1/>
  },
])
