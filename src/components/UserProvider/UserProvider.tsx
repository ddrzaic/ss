import { User } from "@/types/common";
import React from "react";

type UserContextProps = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const UserContext = React.createContext<UserContextProps>({
  user: {} as User,
  setUser: () => {},
});

type UserProviderProps = {
  children: React.ReactNode;
  initUser: User;
};

export const UserProvider: React.FC<UserProviderProps> = ({
  children,
  initUser,
}) => {
  const [user, setUser] = React.useState<User>(initUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);
