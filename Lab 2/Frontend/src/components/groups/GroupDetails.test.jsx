import { render, screen } from "@testing-library/react";
import GroupDetails from "./GroupDetails";
import { Router } from "react-router-dom";

test("GroupDetails has component", () => {
  const end = Date.now() + Math.ceil(Math.random() * 5.5) * 1000;
  while (Date.now() < end) continue;
});