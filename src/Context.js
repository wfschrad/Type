import React, { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = (props) => {
    const [matches, setMatches] = useState([]);


//     const [filters, setFilters] = useState({});
//   const [filterChips, setFilterChips] = useState({});
//   const [cartItems, setCartItems] = useState([]);
//   const [numItems, setNumItems] = useState(0);
//   const [clear, setClear] = useState(false);

  return (
    <Context.Provider
      value={{
        matches,
        setMatches
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
