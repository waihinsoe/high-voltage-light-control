import React, { useState, useEffect } from "react";
import socket from "../../socket/socket";
import { Flex, Switch, Typography } from "antd";

export const AreaOne = () => {
  const [status, setStatus] = useState(false);

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
    socket.emit("control", status ? "ON" : "OFF");
    setStatus(!status);
  };

  return (
    <Flex justify="center" vertical align="center" gap={20}>
      <Typography>LIGHT CONTROL</Typography>
      <Typography>LIGHT CONTROL</Typography>

      <Switch checked={status} onChange={onChange} />
    </Flex>
  );
};
