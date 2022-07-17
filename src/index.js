import express from "express";
import userRouter from "./api/user.routes";
import plantsRouter from "./api/plants.routes";
import cors from "cors";
import morgan from "morgan";

const app = express();
const host = process.env.HOST || '0.0.0.0'; //Si no encuentra host (local) usa 0.0.0.0
const port = process.env.PORT || 3000; //Si no encuentra puerto (heroku) usa 3000

/* Config */
import "./config/database";
import { campDataRoutes } from "./api/campdata.routes";
import { authenticateJwt } from "./middlewares/authorization";
import { PlacesRouter } from "./api/place.routes";
import { StatisticsRouter } from "./api/statistics.routes";
app.get("/", (req, res) => {
  res.json({ message: "Ok succes actualizado cors MANUEL AA" });
});
/* Middlewares */
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* Routers */
app.use("/users", userRouter);
app.use("/plants", authenticateJwt, plantsRouter);
app.use("/campData", authenticateJwt, campDataRoutes);
app.use("/places", authenticateJwt, PlacesRouter);
app.use("/statistics", authenticateJwt, StatisticsRouter);



// start the express server
app.listen(port,host, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://${host}:${port}`);
});
