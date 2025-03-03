import { createContext, useState, useContext } from "react";

const EditContext = createContext({
  isEditing: false,
  setIsEditing: (status: boolean) => {},
});

export const EditProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <EditContext.Provider value={{ isEditing, setIsEditing }}>{children}</EditContext.Provider>
  );
};

export const useEdit = () => {
  return useContext(EditContext);
};
