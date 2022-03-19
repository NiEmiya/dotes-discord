import React from "react";
import "./SidebarChannel.css";

export default function SidebarChannel(id: any, channel: any) {
  return (
    <div className="sidebarChannel">
      <h4>
        <span className="sidebarChannel__hash">#</span>
      </h4>
    </div>
  );
}
