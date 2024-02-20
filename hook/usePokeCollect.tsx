// usePokeCollect.ts

import { useState, useEffect } from "react";

const usePokeCollect = (pokemonName: string) => {
  const [collectedPokes, setCollectedPokes] = useState<string[]>([]);
  const [lastResetDateTime, setLastResetDateTime] = useState<Date | null>(null);

  useEffect(() => {
    // Check if window is defined to ensure code runs only in the browser
    if (typeof window !== "undefined") {
      const savedCollectedPokes = localStorage.getItem("collectedPokes");
      const savedLastResetDateTime = localStorage.getItem("lastResetDateTime");

      if (savedCollectedPokes) {
        setCollectedPokes(JSON.parse(savedCollectedPokes));
      }

      if (savedLastResetDateTime) {
        setLastResetDateTime(new Date(savedLastResetDateTime));
      }
    }
  }, []);

  const collectPoke = () => {
    const newCollectedPokes = [...collectedPokes, pokemonName];
    setCollectedPokes(newCollectedPokes);
    // Save to localStorage
    localStorage.setItem("collectedPokes", JSON.stringify(newCollectedPokes));
  };

  const resetCollectedPokes = () => {
    setCollectedPokes([]);
    const now = new Date();
    // Set next reset time to 12:00 PM
    const nextResetDateTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      12,
      0,
      0,
      0
    );
    setLastResetDateTime(nextResetDateTime);
    localStorage.setItem("collectedPokes", JSON.stringify([]));
    localStorage.setItem("lastResetDateTime", nextResetDateTime.toISOString());
  };

  useEffect(() => {
    if (lastResetDateTime) {
      const now = new Date();
      // Set next reset time to 12:00 PM
      const nextResetDateTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        12,
        0,
        0,
        0
      );
      if (now.getTime() >= nextResetDateTime.getTime()) {
        resetCollectedPokes();
      }
    }
  }, [lastResetDateTime]);

  return { collectedPokes, collectPoke };
};

export default usePokeCollect;
