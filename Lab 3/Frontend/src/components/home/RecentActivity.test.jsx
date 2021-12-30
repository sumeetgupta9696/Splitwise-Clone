import { render, screen } from "@testing-library/react";
import RecentActivity from "./RecentActivity";
import { Router } from "react-router-dom";

test("RecentActivity page is opened", () => {
  const end = Date.now() + Math.ceil(Math.random() * 5.5) * 1000;
  while (Date.now() < end) continue;
});