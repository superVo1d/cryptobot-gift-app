import classNames from "classnames";
import { useEffect, useState, FC } from "react";

interface IconProps {
  icon: string;
}

const AppIcon: FC<IconProps> = ({ icon }) => {
  const [LoadedIcon, setLoadedIcon] = useState<FC<{
    className?: string;
  }> | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const loadIcon = async () => {
      try {
        const iconModule = await import(`../assets/icons/${icon}.svg`);
        setLoadedIcon(() => iconModule.default);
      } catch (err) {
        setError(true);
      }
    };

    loadIcon();
  }, [icon]);

  const classes = {
    icon: true,
    [`icon_type-${icon}`]: icon,
  };

  if (error) return null;

  return LoadedIcon ? <LoadedIcon className={classNames(classes)} /> : null;
};

export default AppIcon;
