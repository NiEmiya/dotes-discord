import { Mic } from "@mui/icons-material";
import React from "react";
import Peer from "peerjs";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import db from "../../utils/Firebase";

function Voice() {
  const user = useSelector(selectUser);
  const [voice, setVoice] = React.useState(false);
  const handleJoinVoice = () => {
    const peer = new Peer(user.uid);

    if (voice) {
      peer.destroy();
      setVoice(false);
      db.collection("voice").doc(user.uid).delete();
      return;
    }
    const connectToNewUser = (userId: any, stream: any) => {
      const call = peer.call(userId, stream);
      const audio = document.createElement("audio");
      call.on("stream", (userVideoStream) => {
        addAudioStream(audio, userVideoStream);
      });
      call.on("close", () => {
        audio.remove();
      });
    };
    const addAudioStream = (audio: any, stream: any) => {
      audio.srcObject = stream;
      audio.addEventListener("loadedmetadata", () => {
        audio.play();
      });
    };
    db.collection("voice").doc(user.uid).set({
      peerId: peer.id,
      name: user.displayName,
    });
    setVoice(true);
    const myAudio = document.createElement("audio");
    myAudio.muted = true;
    navigator.mediaDevices
      .getUserMedia({
        video: false,
        audio: true,
      })
      .then((stream) => {
        addAudioStream(myAudio, stream);
        peer.on("call", (call: any) => {
          call.answer(stream);
          const audio = document.createElement("audio");
          call.on("stream", (userStream: any) => {
            addAudioStream(audio, userStream);
          });
        });
        db.collection("voice").onSnapshot((snapshot) => {
          snapshot.docs.forEach((doc) => {
            console.log(doc.id);
            if (doc.id !== user.uid) {
              connectToNewUser(doc.id, stream);
            }
          });
        });
      });
  };
  return (
    <Mic
      fontSize="large"
      onClick={handleJoinVoice}
      color={voice ? "success" : "error"}
    />
  );
}

export default Voice;
