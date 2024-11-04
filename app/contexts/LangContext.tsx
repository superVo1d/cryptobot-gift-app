import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type ILocalTypes = "ru" | "en";

export interface ILangContextProps {
  langData: any;
  local: ILocalTypes;
  setLocal: (lang: ILocalTypes) => void;
  loading: boolean;
}

const LangContext = createContext<ILangContextProps | undefined>(undefined);

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [local, setLocal] = useState<ILocalTypes>("ru");
  const [langData, setLangData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLangData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/lang-${local}.json`
        );
        const data = await response.json();

        setLangData(data);
      } catch (error) {
        console.error("Error loading languages:", error);
        setLangData({});
      } finally {
        setLoading(false);
      }
    };

    loadLangData();
  }, [local]);

  return (
    <LangContext.Provider value={{ langData, local, setLocal, loading }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLangContext = (): ILangContextProps => {
  const context = useContext(LangContext);
  if (context === undefined) {
    throw new Error("useLangContext must be used within a DataProvider");
  }
  return context;
};
