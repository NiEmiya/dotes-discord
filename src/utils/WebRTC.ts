import Peer from "peerjs";

const peer = new Peer("pick-an-id");


const conn = peer.connect('another-peers-id');
conn.on('open', () => {
  conn.send('hi!');
});