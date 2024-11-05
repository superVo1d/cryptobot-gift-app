"use client";

import { useEffect, useState } from "react";
import { useLangContext } from "../../contexts/LangContext";
import giftsPageStyles from "./styles.module.scss";
import { IGift } from "../../types/gift";
import { useTelegramApi } from "../../contexts/TelegramApiContext";

export default function Page() {
  const { langData } = useLangContext();
  const { isAuthenticated } = useTelegramApi();
  const [gifts, setGifts] = useState<IGift[]>();

  const fetchGifts = () => {
    return fetch("/api/gifts", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          console.log("error");
        } else {
          console.log("success");
          setGifts(data.payload);
        }
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchGifts();
    }
  }, [isAuthenticated]);

  return (
    <div className={giftsPageStyles.gifts}>
      <div className={giftsPageStyles.gifts__header}>
        <div
          className={giftsPageStyles.gifts__title}
          dangerouslySetInnerHTML={{ __html: langData["gifts_title"] }}
        />
        <div
          className={giftsPageStyles.gifts__subtitle}
          dangerouslySetInnerHTML={{ __html: langData["gifts_subtitle"] }}
        />
      </div>
      <div>{gifts?.map((item) => item.name)}</div>
    </div>
  );
}
