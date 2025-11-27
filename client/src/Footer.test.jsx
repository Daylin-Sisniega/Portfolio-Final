import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Footer from "./components/Footer";

describe("Footer Component", () => {

 
  // TEST 1: RENDER FOOTER TEXT

  test("renders copyright text with 'Daylin Sisniega'", () => {
    render(<Footer />);
    const copyrightElement =
      screen.getByText(/Daylin Sisniega/i); // THIS ONE ALREADY EXISTS ON THE ORIGINAL FOOTER
    expect(copyrightElement).toBeInTheDocument();
  });

 
  // TEST 2: RENDER LOCATION TEXT

  test("renders location text 'Toronto, Ontario'", () => {
    render(<Footer />);
    const locationElement = screen.getByText(/Toronto, Ontario/i);
    expect(locationElement).toBeInTheDocument();
  });

  
  // TEST 3: RENDER EMAIL LINK
  
  test("renders email link", () => {
    render(<Footer />);
    const emailElement = screen.getByText(/daylintax@outlook.com/i);
    expect(emailElement).toBeInTheDocument();
  });
});
