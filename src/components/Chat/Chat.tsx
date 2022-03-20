import {
  AddCircle,
  CardGiftcard,
  EmojiEmotions,
  Gif,
} from "@mui/icons-material";
import React from "react";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "../../features/appSlice";
import { selectUser } from "../../features/userSlice";
import db from "../../utils/Firebase";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import firebase from "firebase";

export default function Chat() {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState<any[]>([]);
  const messagesEndRef = React.useRef<HTMLHeadingElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current!.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
          scrollToBottom();
        });
    }
  }, [channelId]);

  const sendMessage = (e: any) => {
    e.preventDefault();
    db.collection("channels").doc(channelId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user,
    });
    setInput("");
  };
  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />
      <div className="chat__messages">
        {messages.map((message) => (
          <Message
            timestamp={message.timestamp}
            message={message.message}
            user={message.user}
          />
        ))}
        <div className="refdiv" ref={messagesEndRef}></div>
      </div>
      <div className="chat__input">
        <AddCircle fontSize="large" />
        <form>
          <input
            value={input}
            disabled={!channelId}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder={`Message #TESTCHANNEL`}
          />
          <button
            className="chat__inputButton"
            type="submit"
            onClick={sendMessage}
            disabled={!channelId}
          >
            Send
          </button>
        </form>
        <div className="chat__inputIcons">
          <CardGiftcard fontSize="large" />
          <Gif fontSize="large" />
          <EmojiEmotions fontSize="large" />
        </div>
      </div>
    </div>
  );
}
