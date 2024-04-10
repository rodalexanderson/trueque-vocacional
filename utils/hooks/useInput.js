"use client";

import React, { useState } from "react";

const useInput = (initialvalue = "") => {
  const [input, setInput] = useState(initialvalue);

  const handleChange = (e) => {
    if (e?.target?.value) {
      setInput(e.target.value);
    } else {
      setInput(e);
    }
  };

  const clearInput = () => {
    setInput("");
  };

  return [input, handleChange, clearInput];
};

export default useInput;
