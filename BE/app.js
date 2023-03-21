import express from 'express';
import connectMongoose from "./util/mongooseConnect.js";

const port = process.env.PORT || 4000;
const app = express();

app.use(express.json());

if (await connectMongoose()) {
    app.listen(port, () => {
      console.log("listening to port ", port);
    });
  }