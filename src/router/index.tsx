import { createBrowserRouter } from "react-router-dom";
import { layoutRoutes, NotFount, otherRoutes } from "./routes";

export const routes = [
  ...layoutRoutes(otherRoutes),
  ...NotFount
]


const router = createBrowserRouter(routes)

export default router