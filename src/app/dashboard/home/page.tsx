"use client";

import { useCurrentContext } from "@/utils/context/CurrentContext";
import { Button, Form, Input } from "antd";
import React, { useContext, useRef } from "react";

export default function Home() {
  const { code, setCode } = useCurrentContext();
  const codeRef = useRef(null);

  function handleUpdateCode() {
    // @ts-ignore
    setCode(codeRef.current.input.value);
  }

  return (
    <div className="dashboard-home">
      <Form layout="vertical">
        <Form.Item label="Code" name="code">
          <Input.Password
            value={code}
            defaultValue={code}
            ref={codeRef}
            placeholder="Please enter the code"
          />
        </Form.Item>
        <Button onClick={handleUpdateCode} type="primary">
          Save
        </Button>
      </Form>
    </div>
  );
}
