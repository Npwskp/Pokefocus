"use client";

import React, { createContext, useState } from "react";
import LandingPage from "./LandingPage";
import PokeCollect from "@/components/PokeCollect";
const Page = () => {
  return (
    <div className="">
      <LandingPage />
      <PokeCollect />
    </div>
  );
};

export default Page;
