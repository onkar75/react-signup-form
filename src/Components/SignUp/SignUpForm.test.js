/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { screen, render, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignUpForm from "./SignUpForm";

describe("SignUpForm", () => {
  it("should render the basic fields", () => {
    render(
      <Router>
        <SignUpForm />
      </Router>
    );
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByText("SignUp")).toBeInTheDocument();
  });

  it("validate user inputs, and provides error messages", async () => {
    const { getByText } = render(
      <Router>
        <SignUpForm />
      </Router>
    );

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/First Name/i), {
        target: { value: "" },
      });

      fireEvent.change(screen.getByLabelText(/Last Name/i), {
        target: { value: "" },
      });
    });

    await act(async () => {
      fireEvent.submit(getByText("SignUp"));
    });

    expect(getByText("First name is required")).toBeInTheDocument();
    expect(getByText("Last name is required")).toBeInTheDocument();
  });
});
