import React, { useState, FC } from "react";
import classNames from "classnames";
import lazyImageStyles from "./styles.module.scss";

export interface ILazyImage {
  src: string;
  alt?: string;
}

const LazyImage: FC<ILazyImage> = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  const letter = alt?.charAt(0).toLowerCase();

  return (
    <figure
      className={classNames(lazyImageStyles.image, {
        [lazyImageStyles.image_loaded]: !src || loaded,
      })}
    >
      {src && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
      )}
      <div className={lazyImageStyles.placeholder}>
        <span className={lazyImageStyles.placeholder__text}>{letter}</span>
      </div>
    </figure>
  );
};

export default LazyImage;
