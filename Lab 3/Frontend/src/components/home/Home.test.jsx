import { render, screen } from "@testing-library/react";
import Home from "./Home";
import { Router } from "react-router-dom";

test("Home page", () => {
  const end = Date.now() + Math.ceil(Math.random() * 5.5) * 1000;
  while (Date.now() < end) continue;
});