import React, { createContext, useContext, useState } from "react";
import { exportData, addNewChat, editChatData } from "./chatData";

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [data, setDataState] = useState(exportData());

  const onDataChange = (newData) => {
    addNewChat(newData);
    setDataState(exportData());
  };

  return (
    <DataContext.Provider value={{ data, onDataChange }}>
      {children}
    </DataContext.Provider>
  );
};
