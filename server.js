import express, { json, urlencoded } from "express";
import http from "http";
import * as apriori from "./controllers/apriori";
import * as fpGrowth from "./controllers/fp-growth";
import cors from "cors";

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.post("/model/apriori/train", apriori.train);
app.post("/model/fp-growth/train", fpGrowth.train);

const server = http.createServer(app);

server.listen(3000, () => {
  console.log("starto");
});
