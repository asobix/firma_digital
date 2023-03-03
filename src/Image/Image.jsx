import PropTypes from 'prop-types';
import Img from 'react-cool-img';

import './Image.scss';

export const Image = ({
  className,
  style,
  width = '100%',
  height = 'auto',
  src = '',
  alt = '',
  lazy = false,
  cache = false,
}) => {
  return (
    <>
      <div
        className={
          className
            ? `core-components-images-image ${className}`
            : 'core-components-images-image'
        }
        style={{
          ...style,
          width: `${width && width}`,
          height: `${height && height}`,
        }}
      >
        <Img
          style={{
            width: '100%',
            height: '100%',
          }}
          src={src}
          alt={alt}
          lazy={lazy}
          cache={cache}
        />
      </div>
    </>
  );
};

Image.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([undefined]),
  ]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([undefined])]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  src: PropTypes.string,
  alt: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([undefined])]),
  lazy: PropTypes.bool,
  cache: PropTypes.bool,
};

Image.defaultProps = {
  width: '100%',
  height: 'auto',
  alt: 'Image',
  lazy: false,
  cache: false,
};
