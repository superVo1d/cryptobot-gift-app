import { FC, useMemo } from "react";
import { IGift } from "../../types/gift";
import giftPreviewStyles from "./styles.module.scss";
import { useLangContext } from "../../contexts/LangContext";
import classNames from "classnames";
import GiftPattern from "./../../assets/media/pattern.svg";
import Icon from "../Icon";
import Button from "../Button";

export interface IGiftPreview {
  gift: IGift;
}

export const GiftPreview: FC<IGiftPreview> = ({ gift }) => {
  const { langData } = useLangContext();
  const { id, name, price, currency, type, from, to } = gift;

  const label = useMemo(() => {
    return `${from} ${langData.of} ${to}`;
  }, [langData]);

  return (
    <div className={giftPreviewStyles.gift}>
      <div className={giftPreviewStyles.gift__content}>
        <div
          className={giftPreviewStyles.gift__label}
          dangerouslySetInnerHTML={{ __html: label }}
        />
        <div className={giftPreviewStyles.gift__image}>
          <Icon icon={`gift-${type}`} />
        </div>
        <div
          className={giftPreviewStyles.gift__name}
          dangerouslySetInnerHTML={{ __html: name }}
        />
        <Button
          to={`gifts/${id}`}
          label={`${price} ${currency}`}
          icon={currency?.toLowerCase()}
        />
      </div>
      <div
        className={classNames(
          giftPreviewStyles.gift__background,
          giftPreviewStyles[`gift__background_type-${type}`]
        )}
      >
        <GiftPattern />
      </div>
    </div>
  );
};
