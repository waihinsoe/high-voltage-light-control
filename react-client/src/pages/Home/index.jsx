import { useEffect, useState } from "react";
import { AreaOne } from "./AreaOne";
import { AreaTwo } from "./AreaTwo";
import { Tabs, Flex } from "antd";

export const HomePage = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "AreaOne",
      children: <AreaOne />,
    },
    {
      key: "2",
      label: "AreaTwo",
      children: <AreaTwo />,
    },
  ];
  return (
    <div style={{ height: "100dvh" }}>
      <Tabs centered defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};
