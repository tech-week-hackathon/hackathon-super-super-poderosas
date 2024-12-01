"use client";
import { Lucid } from "lucid-txpipe";
import type { Dispatch, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

interface ILucidContext {
  lucidState: Lucid | undefined;
  setLucidState: Dispatch<SetStateAction<Lucid | undefined>>;
}

const LucidContext = createContext<ILucidContext>({
  lucidState: new Lucid(),
  setLucidState: () => {},
});

export const useLucidProvider = () => {
  const context = useContext(LucidContext);
  if (!context)
    throw new Error("useLucidContext must be used within a LucidProvider");
  return context;
};

export const LucidProvider = ({ children }: { children: React.ReactNode }) => {
  const [lucidState, setLucidState] = useState<Lucid | undefined>(new Lucid());

  return (
    <LucidContext.Provider value={{ lucidState, setLucidState }}>
      {children}
    </LucidContext.Provider>
  );
};
