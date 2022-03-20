import { Avatar } from "@mui/material";
import React from "react";
import "./Message.css";
export default function Message(props: any) {
  return (
    <div className="message">
      <Avatar src={props.user.photo} />
      <div className="message__info">
        <h4>
          {props.user.displayName}
          <span className="message__timestamp">
            {new Date(props.timestamp?.toDate()).toUTCString()}
          </span>
        </h4>
        <p>{props.message}</p>
      </div>
    </div>
  );
}
