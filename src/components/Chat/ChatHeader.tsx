import {
  EditLocationRounded,
  HelpRounded,
  Notifications,
  PeopleAltRounded,
  SearchRounded,
  SendRounded,
} from "@mui/icons-material";
import React from "react";
import "./ChatHeader.css";
function ChatHeader(props: any) {
  return (
    <div className="chatHeader">
      <div className="chatHeader__left">
        <h3>
          <span className="chatHeader__hash">#</span>
          {props.channelName}
        </h3>
      </div>
      <div className="chatHeader__right">
        <Notifications />
        <EditLocationRounded />
        <PeopleAltRounded />
        <div className="chatHeader__search">
          <input type="text" placeholder="Search" />
          <SearchRounded />
        </div>
        <SendRounded />
        <HelpRounded />
      </div>
    </div>
  );
}

export default ChatHeader;
