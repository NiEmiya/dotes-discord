import {
  AddCircle,
  CardGiftcard,
  EmojiEmotions,
  Gif,
  Mic,
  VoiceChat,
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
import Peer from "peerjs";

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
  const [voice, setVoice] = React.useState(false);
  const handleJoinVoice = () => {
    const peer = new Peer("someid", {
      host: "localhost",
      port: 9000,
      path: "/server",
    });
    if (voice) {
      peer.destroy();
      setVoice(false);
      return;
    }
    setVoice(true);
    peer.on("connection", (conn) => {
      console.log("incoming peer connection!");
      conn.on("data", (data) => {
        console.log(`received: ${data}`);
      });
      conn.on("open", () => {
        conn.send("hello!");
      });
    });
    peer.on("call", (call) => {
      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
          call.answer(stream); // Answer the call with an A/V stream.
          call.on("stream", (remoteStream) => {});
        })
        .catch((err) => {
          console.error("Failed to get local stream", err);
        });
    });
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
          <Mic
            fontSize="large"
            onClick={handleJoinVoice}
            color={voice ? "success" : "error"}
          />
          <CardGiftcard fontSize="large" />
          <Gif fontSize="large" />
          <EmojiEmotions fontSize="large" />
        </div>
      </div>
    </div>
  );
}
