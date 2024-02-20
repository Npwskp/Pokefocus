"use client";

import React, { useEffect, useState } from "react";

const PokeCollect = () => {
  return (
    <div className="">
      <div className="text-center font-semibold text-xl my-4">
        Pokemon Collected Today
      </div>
      <div className="sm:w-[30vw] w-[80vw] h-[30dvh] border-accent  m-auto border-2 rounded-lg bg-secondary">
        <div>
          <h2>Collected Pokémon:</h2>
        </div>
      </div>
    </div>
  );
};

export default PokeCollect;
