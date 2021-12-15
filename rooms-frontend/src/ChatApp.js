import { useEffect, useState } from "react";
import "./ChatApp.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Pusher from "pusher-js";
import axios from "./axios";

function ChatApp({ userlogin }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("group/room1").then((response) => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("9b4a3c530d69d0d71829", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("message");
    channel.bind("inserted", function (newMessage) {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} userlogin={userlogin} />
      </div>
    </div>
  );
}

export default ChatApp;
