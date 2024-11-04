import React, { createContext, useContext, useState } from "react";
import TelegramApi from "../services/telegram";
import { useClientOnce } from "../hooks/useClientOnce";

const TelegramApiContext = createContext<{
  telegramApi?: TelegramApi;
  user?: IUser;
}>({
  telegramApi: undefined,
  user: undefined,
});

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
  is_premium: true;
  allows_write_to_pm: true;
}

export const TelegramApiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [telegramApi, setTelelgramApi] = useState<TelegramApi>();
  const [user, setUser] = useState<IUser>();

  useClientOnce(() => {
    const telegramApiInstance = TelegramApi.getInstance();
    const initData = telegramApiInstance.initData;

    if (initData) {
      fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ initData }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.success) {
            console.log("error");
          } else {
            console.log("success");
            setUser(data.user);
          }
        });
    }

    setTelelgramApi(telegramApiInstance);
  });

  return (
    <TelegramApiContext.Provider value={{ telegramApi, user }}>
      {children}
    </TelegramApiContext.Provider>
  );
};

export const useTelegramApi = () => {
  const context = useContext(TelegramApiContext);
  if (!context) {
    throw new Error("useTelegramApi must be used within a TelegramApiProvider");
  }
  return context;
};
