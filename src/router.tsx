import { Home } from "./page/home";
import { Fixed } from "./page/fixed";
import { Variable } from "./page/variable";
import { FixedForWindow } from "./page//fixed/FixedForWindow";
import { VariableForWindow } from "./page/variable/VariableForWindow";
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
    path: '/fixedForWindow',
    element: <FixedForWindow/>
  },
  {
    path: '/variable',
    element: <Variable/>
  },
  {
    path: '/variableForWindow',
    element: <VariableForWindow/>
  },
])
