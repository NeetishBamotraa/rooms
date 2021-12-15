// importing
import express from "express";
import mongoose from "mongoose";
import GroupData from "./groupData.js";
import UserData from "./userData.js";
import MessageData from "./messageData.js";
import Pusher from "pusher";
import cors from "cors";

// app config

const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1317448",
  key: "9b4a3c530d69d0d71829",
  secret: "81de2f808eed53aa76c3",
  cluster: "ap2",
  useTLS: true,
});

// middlewares

app.use(express.json());
app.use(cors());

// db config
const connection_url =
  "mongodb+srv://neetish:neetish@cluster0.ylcus.mongodb.net/roomsdb?retryWrites=true&w=majority";
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("DB is connected");

  const msgCollection = db.collection("msgdatas");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("message", "inserted", {
        username: messageDetails.username,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});

// api routes

app.get("/", (req, res) => res.status(200).send("hello world"));

app.get("/group/:groupname", (req, res) => {
  MessageData.find({ groupname: req.params.groupname }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/group/new", (req, res) => {
  const dbMessage = req.body;

  GroupData.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(`new group created: \n ${data}`);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  MessageData.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(`new message created: \n ${data}`);
    }
  });
});

app.post("/user/new", (req, res) => {
  const dbMessage = req.body;

  UserData.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send("UserCreated");
    }
  });
});

app.post("/user/login", (req, res) => {
  const dbMessage = req.body;

  UserData.find({ username: req.body.username }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (data[0].password === req.body.password) {
        res.send("LoginSuccess");
      } else {
        res.send("LoginFailed");
      }
    }
  });
});

app.get("/user/:username", (req, res) => {
  UserData.find({ username: req.params.username }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data[0].groups);
    }
  });
});

//listener
app.listen(port, () => console.log(`listening on port:${port}`));
