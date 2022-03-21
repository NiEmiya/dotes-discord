import React from "react";
import { useDispatch } from "react-redux";
import { setChannelInfo } from "../../features/appSlice";
import "./SidebarChannel.css";

export default function SidebarChannel(props: any) {
  const dispatch = useDispatch();
  return (
    <div
      className="sidebarChannel"
      onClick={() =>
        dispatch(
          setChannelInfo({
            channelId: props.id,
            channelName: props.channelName,
          })
        )
      }
    >
      <h4>
        <span className="sidebarChannel__hash">#</span>
        {props.channelName}
      </h4>
    </div>
  );
}
