import PropTypes from 'prop-types';

import './Navbar.scss';

export const Navbar = ({ className, style, brand }) => {
	return (
		<>
			<nav
				className={
					className
						? `core-components-navbars-navbar ${className}`
						: 'core-components-navbars-navbar'
				}
				style={{
					...style,
				}}
			>
				<div className="core-components-navbars-navbar-brands-container cap-navbar-piramide-container">
					{brand}
				</div>
			</nav>
		</>
	);
};

Navbar.propTypes = {
	className: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([undefined])]),
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([undefined])]),
	brand: PropTypes.element,
};

Navbar.defaultProps = {};
