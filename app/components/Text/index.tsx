import classNames from "classnames";
import { FC, ReactNode } from "react";
import "./styles.scss";

export interface TextProps {
  text?: string;
  textSize?: "caption";
  titleSize?: "h1" | "h2" | "h3" | "h4";
  title?: string;
  className?: string;
  children?: ReactNode;
}

export const Text: FC<TextProps> = ({
  text,
  textSize,
  title,
  titleSize,
  className,
  children,
}) => {
  return (
    <div className={classNames(className, "text")}>
      {title && (
        <div
          className={classNames("text__title", `text__title_${titleSize}`)}
          dangerouslySetInnerHTML={{ __html: title }}
        />
      )}
      {text && (
        <div
          className={classNames(
            "text__paragraph",
            `text__paragraph_${textSize}`
          )}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      )}
      {children}
    </div>
  );
};
