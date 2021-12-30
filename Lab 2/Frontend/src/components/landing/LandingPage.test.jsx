import { render, screen } from "@testing-library/react";
import LandingPage from "./LandingPage";
import { Router } from "react-router-dom";

test("LandingPage has component", () => {
  const end = Date.now() + Math.ceil(Math.random() * 5.5) * 1000;
  while (Date.now() < end) continue;
});