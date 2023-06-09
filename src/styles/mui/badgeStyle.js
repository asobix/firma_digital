import {
	primaryColor,
	warningColor,
	dangerColor,
	successColor,
	infoColor,
	roseColor,
	grayColor,
	whiteColor,
} from 'Core/infrastructure/styles/mui/material-dashboard-pro-react';

const badgeStyle = {
	badge: {
		borderRadius: '10px',
		padding: '5px 12px',
		paddingBottom: '3px',
		textTransform: 'uppercase',
		fontSize: '9px',
		lineHeight: '1',
		color: whiteColor,
		textAlign: 'center',
		verticalAlign: 'baseline',
		display: 'inline-block',
	},
	primary: {
		backgroundColor: primaryColor[0],
	},
	warning: {
		backgroundColor: warningColor[0],
	},
	danger: {
		backgroundColor: dangerColor[0],
	},
	success: {
		backgroundColor: successColor[0],
	},
	info: {
		backgroundColor: infoColor[0],
	},
	rose: {
		backgroundColor: roseColor[0],
	},
	gray: {
		backgroundColor: grayColor[0],
	},
};

export default badgeStyle;
