import React from "react";

const LoginContext = React.createContext(null);

const useLoginContext = () => React.useContext(LoginContext);

const LoginProvider = ({ value, children }) => {
  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

export { LoginProvider, useLoginContext };
