import express from "express";
import cors from 'cors';
import expressFileUpload from "express-fileupload";

import connectMongoose from "./util/mongooseConnect.js";
import userRouter from "./router/userRouter.js";
import messageRouter from "./router/messageRouter.js";

const port = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(expressFileUpload({
  createParentPath: true,
  useTempFiles: false,
  tempFileDir: "./tmp",
}));
app.use("/users", userRouter);
app.use("/messages", messageRouter);

app.post("/importFile", (req, res) => {
  console.log(String(req.files.file.data));
  // const image = req.files.image;
  // image.mv(`./public/images/${image.name}`);
  // console.log(image);
  res.status(201).send();
});

if (await connectMongoose()) {
  app.listen(port, () => {
    console.log("listening to port ", port);
  });
}
