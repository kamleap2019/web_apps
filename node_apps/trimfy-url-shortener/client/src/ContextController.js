import React, { useState } from "react";

export const Context = React.createContext();

export const ContextController = ({ children }) => {
  let intialState = {
    shortUrl: "",
    longUrl: "",
    errors: {}
  };

  const [state, setState] = useState(intialState);

  return (
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  );
};
