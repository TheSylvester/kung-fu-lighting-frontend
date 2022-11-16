import React from "react";

const LightboxContext = React.createContext(null);

const useLightboxContext = () => React.useContext(LightboxContext);

const LightboxProvider = ({ value, children }) => {
  return (
    <LightboxContext.Provider value={value}>
      {children}
    </LightboxContext.Provider>
  );
};

export { LightboxProvider, useLightboxContext };
