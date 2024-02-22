"use client";

import React, { createContext, use, useState } from "react";
import LandingPage from "./LandingPage";

const Page = () => {
  return (
    <>
      <LandingPage />
      <footer className="text-center text-gray-500 text-xs mt-5 mb-5">
        <p>© 2024 Pokemon Timer</p>
      </footer>
    </>
  );
};

export default Page;
