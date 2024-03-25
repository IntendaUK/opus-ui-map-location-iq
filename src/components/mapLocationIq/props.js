/* eslint-disable max-len */

const props = {
	key: {
		type: 'string',
		desc: 'The locationIq access key',
		dft: 'pk.740ddb9f1b472ff78613988039cd5afd'
	},
	pins: {
		type: 'array',
		desc: 'An array of pins that should be rendered. Each object needs { [keyLat], [keyLon] } based on what the properties have been set to',
		spec: [
			{
				lat: 1.23,
				lon: -3.45
			},
			{
				lat: 2.34,
				lon: -4.56,
				pinIcon: 'place',
				pinSize: '72px',
				pinColor: 'var(--colors-primary)'
			}
		]
	},
	keyLat: {
		type: 'string',
		desc: 'The key (in each pin object) that defines the latitude',
		dft: 'lat'
	},
	keyLon: {
		type: 'string',
		desc: 'The key (in each pin object) that defines the longitude',
		dft: 'lon'
	},
	keyPinIcon: {
		type: 'string',
		desc: 'The key (in each pin object) that defines an override for the pin icon',
		dft: 'pinIcon'
	},
	keyPinSize: {
		type: 'string',
		desc: 'The key (in each pin object) that defines an override for the pin\'s font size',
		dft: 'pinSize'
	},
	keyPinColor: {
		type: 'string',
		desc: 'The key (in each pin object) that defines an override for the pin color',
		dft: 'pinColor'
	},
	centerLat: {
		type: 'decimal',
		desc: 'Defines the latitude of the point around which the view should be centered',
		dft: 1.23
	},
	centerLon: {
		type: 'decimal',
		desc: 'Defines the longitude of the point around which the view should be centered',
		dft: -2.34
	},
	zoom: {
		type: 'integer',
		desc: 'Defines the zoom level of the view',
		dft: 12
	},
	hasControls: {
		type: 'boolean',
		desc: 'When set to false, the map controls will not be displayed',
		dft: false,
		classMap: true
	},
	routeFrom: {
		type: 'object',
		desc: 'Sets the coordinate of the location from which the route should be calculated',
		spec: {
			lat: 1.23,
			lon: -3.45
		}
	},
	routeTo: {
		type: 'object',
		desc: 'Sets the coordinate of the location to which the route should be calculated',
		spec: {
			lat: 2.34,
			lon: -4.56
		}
	},
	pinIcon: {
		type: 'string',
		desc: 'Defines the name of the icon that should be rendered on pin locations',
		dft: 'place'
	},
	pinColor: {
		type: 'string',
		desc: 'Defines the colour of the pins on the map',
		dft: 'var(--colors-primary)'
	},
	pinSize: {
		type: 'string',
		desc: 'The font size of the pin icons on the map',
		dft: '48px'
	},
	routeColorRgbArray: {
		type: 'array',
		desc: 'An RGB array used to render the path (if a route is defined)',
		spec: [255, 0, 0],
		dft: [0, 178, 254]
	},
	routeWidth: {
		type: 'integer',
		desc: 'Defines the width (in px) of the rendered path (if a route is defined)',
		dft: 4
	}
};

export default props;
