import PropTypes from 'prop-types';

import { Image as Img } from '../../Image/Image';

import OceanicaBrandImage from './assets/images/Oceanica.png';

export const OceanicaBrand = ({ width = '100%', height = 'auto' }) => {
  return (
    <>
      <Img
        width={width}
        height={height}
        src={OceanicaBrandImage}
        alt="Logo Oceánica"
        lazy={true}
        cache={true}
      />
    </>
  );
};

OceanicaBrand.propTypes = {
  width: PropTypes.string | PropTypes.number,
  height: PropTypes.string | PropTypes.number,
};

OceanicaBrand.defaultProps = {
  width: '100%',
  height: 'auto',
};
