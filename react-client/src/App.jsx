import "./App.css";
import socket from "./socket/socket";
import React, { useState, useEffect } from "react";
import { Flex, Switch, Typography } from "antd";
import Title from "antd/es/typography/Title";
import ConfigProvider from "antd/es/config-provider";
function App() {
  const [status, setStatus] = useState(false);

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
    socket.emit("control", checked ? "ON" : "OFF");
    setStatus(!status);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          motion: false,
        },
      }}
    >
      <div>
        <Flex
          justify="center"
          vertical
          align="center"
          gap={20}
          style={{ height: "100vh" }}
        >
          <Title level={2}>N1C AI SMART HOME</Title>
          <Typography>MOTOR AND LIGHT CONTROL</Typography>
          <Switch checked={status} onChange={onChange} />
        </Flex>
        {/* <HomePage /> */}
      </div>
    </ConfigProvider>
  );
}

export default App;
