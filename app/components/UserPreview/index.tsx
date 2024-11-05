import { FC } from "react";
import { ITelegramUser } from "../../contexts/TelegramApiContext";
import userPreviewStyles from "./styles.module.scss";
import Icon from "../Icon";
import LazyImage from "../LazyImage";

export interface IUserPreview {
  user: ITelegramUser;
}

export const UserPreview: FC<IUserPreview> = ({ user }) => {
  return (
    <div className={userPreviewStyles.preview}>
      <div className={userPreviewStyles.preview__photo}>
        <LazyImage src={`/f/${user.id}.jpg`} />
        <div className={userPreviewStyles.preview__label}>{"#1"}</div>
      </div>
      <div className={userPreviewStyles.preview__text}>
        <div className={userPreviewStyles.preview__title}>
          <div dangerouslySetInnerHTML={{ __html: user.first_name }} />
          {user.is_premium && <Icon icon="premium" />}
        </div>
        <div className={userPreviewStyles.preview__caption}>
          {"1 000 gifts received"}
        </div>
      </div>
    </div>
  );
};
