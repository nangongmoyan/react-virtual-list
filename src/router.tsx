import { Home } from "./page/home";
import { Fixed } from "./page/fixed";
import { Variable } from "./page/variable";
import { FixedForWindow } from "./page//fixed/FixedForWindow";
import { VariablePage1 } from "./page/variable/VariablePage1";
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
    path: '/variable1',
    element: <VariablePage1/>
  },
  {
    path: '/variableForWindow',
    element: <VariableForWindow/>
  },
])
