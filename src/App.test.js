import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders SignUp Form", () => {
  render(<App />);
  const linkElement = screen.getByText(/SignUp Form/i);
  expect(linkElement).toBeInTheDocument();
});
