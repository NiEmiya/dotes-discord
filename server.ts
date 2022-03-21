const { PeerServer } = require("peer");

const peerServer = PeerServer({ port: 9000, path: "/server" }).on(
  "connection",
  (id: any) => {
    navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(
      (stream) => {
        const call = peerServer.call(id, stream);
        call.on("stream", (remoteStream) => {
          remoteStream;
        });
      },
      (err) => {
        console.error("Failed to get local stream", err);
      }
    );
  }
);
