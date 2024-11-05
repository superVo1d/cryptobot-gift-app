"use client";

import { useEffect, useState } from "react";
import Icon from "../components/Icon";
import { useLangContext } from "../contexts/LangContext";
import { useTelegramApi } from "../contexts/TelegramApiContext";
import storePageStyles from "./styles.module.scss";
import { IGift } from "../types/gift";
import { GiftPreview } from "../components/GiftPreview";
import classNames from "classnames";

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
    <div className={classNames("page", storePageStyles.store)}>
      <div className={storePageStyles.store__header}>
        <Icon className={storePageStyles.store__icon} icon="gift" />
        <div
          className={storePageStyles.store__title}
          dangerouslySetInnerHTML={{ __html: langData["store_title"] }}
        />
        <div
          className={storePageStyles.store__subtitle}
          dangerouslySetInnerHTML={{ __html: langData["store_subtitle"] }}
        />
      </div>
      <div className={storePageStyles.store__list}>
        {gifts?.map((item, index) => (
          <GiftPreview gift={item} key={index} />
        ))}
      </div>
    </div>
  );
}
