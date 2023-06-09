"use client";
import { createContext, useEffect, useState, useContext } from "react";
import { tempCode } from "../api/config";

const CurrentContext = createContext({
  code: "",
  setCode: (code: string) => {},
  isUserVerified: false,
});

interface ICurrentContextProvider {
  children: React.ReactNode;
}

export const CurrentContextProvider: React.FC<ICurrentContextProvider> = ({
  children,
}) => {
  const [code, setCode] = useState("");
  const [isUserVerified, setIsUserVerified] = useState(false);
  useEffect(() => {
    if (code === tempCode) {
      setIsUserVerified(true);
    } else {
      setIsUserVerified(false);
    }
  }, [code]);
  return (
    <CurrentContext.Provider value={{ code, setCode, isUserVerified }}>
      {children}
    </CurrentContext.Provider>
  );
};

export const useCurrentContext = () => useContext(CurrentContext);
