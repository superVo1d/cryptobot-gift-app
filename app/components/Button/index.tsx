import React, { FC, ReactNode, MouseEvent } from "react";
import classNames from "classnames";
import Icon from "../Icon";
import buttonStyles from "./styles.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface IButton {
  label: string;
  to?: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  children?: ReactNode;
  className?: string;
  icon?: string;
}

const Button: FC<IButton> = ({
  label,
  to,
  disabled = false,
  onClick,
  children,
  className,
  icon,
}) => {
  const router = useRouter();

  const handleClick = (
    event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    if (disabled) return;

    if (onClick) {
      onClick(event);
    }

    if (to) {
      router.push(to);
    }
  };

  const classes = classNames(className, buttonStyles.button, {
    [buttonStyles.button_disabled]: disabled,
  });

  return (
    <button className={classes} onClick={handleClick} disabled={disabled}>
      {icon && <Icon className={buttonStyles.button__icon} icon={icon} />}
      {label}
      {children}
    </button>
  );
};

export default Button;
