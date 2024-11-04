import classNames from "classnames";
import { useEffect, useState, FC } from "react";

interface IconProps {
  icon: string;
  className?: string;
}

const Icon: FC<IconProps> = ({ icon, className = "" }) => {
  const [LoadedIcon, setLoadedIcon] = useState<FC<{
    className?: string;
  }> | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const loadIcon = async () => {
      try {
        const iconModule = await import(`../../assets/media/icons/${icon}.svg`);
        setLoadedIcon(() => iconModule.default);
      } catch (err) {
        console.log(err);
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

  return LoadedIcon ? (
    <LoadedIcon className={classNames(className, classes)} />
  ) : null;
};

export default Icon;
