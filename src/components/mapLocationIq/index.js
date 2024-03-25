//React
import React, { useEffect } from 'react';

//External Helpers
import { runScript } from 'opus-ui';

//Plugins
import View from 'ol/View';
import * as proj from 'ol/proj';
import Overlay from 'ol/Overlay';
import Polyline from 'ol/format/Polyline';
import olms from 'ol-mapbox-style';
import Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import { Vector as VectorLayer } from 'ol/layer';
import { Stroke, Style } from 'ol/style';

//Styles
import './styles.css';

const overlays = [];

//Events
const onMount = ({ id, setState, state: { key, centerLon, centerLat, zoom } }) => {
	olms(id, 'https://tiles.locationiq.com/v3/streets/vector.json?key=' + key).then(function (map) {
		map.setView(new View({
			center: proj.fromLonLat([centerLon, centerLat]),
			zoom
		}));

		setState({
			mapReady: true,
			map
		});
	});
};

const onClickPin = ({ setState }, selectedPin) => {
	setState({ selectedPin });
};

const onMapReady = ({ getHandler, state }) => {
	const { map, mapReady, pins, pinIcon, pinColor, pinSize } = state;
	const { keyLon, keyLat, keyPinIcon, keyPinColor, keyPinSize } = state;

	if (!mapReady || !pins)
		return;

	overlays.forEach(o => map.removeOverlay(o));

	pins.forEach(p => {
		const el = document.createElement('span');
		el.className = 'material-icons';
		el.innerHTML = p[keyPinIcon] || pinIcon;
		el.style.display = 'block';
		el.style.color = p[keyPinColor] || pinColor;
		el.style['font-size'] = p[keyPinSize] || pinSize;

		const clickHandler = getHandler(onClickPin, p);

		el.addEventListener('click', clickHandler);

		const marker = new Overlay({
			position: proj.fromLonLat([p[keyLon], p[keyLat]]),
			positioning: 'bottom-center',
			element: el,
			stopEvent: false,
			className: 'marker'
		});

		map.addOverlay(marker);

		overlays.push(marker);
	});
};

const onPositionZoomChange = ({ state: { map, centerLon, centerLat, zoom } }) => {
	if (!map)
		return;

	map.setView(new View({
		center: proj.fromLonLat([centerLon, centerLat]),
		zoom
	}));
};

const onCalculateRoute = ({ id, state: { map, key, routeFrom, routeTo } }) => {
	if (!map || !routeFrom || !routeTo)
		return;

	const from = `${routeFrom.lon},${routeFrom.lat}`;
	const to = `${routeTo.lon},${routeTo.lat}`;

	/* eslint-disable-next-line max-len */
	const url = `https://api.locationiq.com/v1/directions/driving/${from};${to}?key=${key}&overview=full&geometries=polyline6`;

	runScript({
		ownerId: id,
		actions: [{
			type: 'queryUrl',
			url,
			method: 'GET',
			headers: {},
			crossDomain: true,
			extractResults: [
				{
					path: 'response',
					variable: 'route'
				}
			]
		}, {
			type: 'setState',
			target: id,
			key: 'route',
			value: '{{variable.route}}'
		}]
	});
};

const onGetRoute = ({ state: { map, route, routeColorRgbArray, routeWidth } }) => {
	if (!route)
		return;

	const polyline = (new Polyline({ factor: 1e6 }).readGeometry(route.routes[0].geometry, {
		dataProjection: 'EPSG:4326',
		featureProjection: 'EPSG:3857'
	}));

	const routeFeature = new Feature({
		type: 'route',
		geometry: polyline
	});

	const styles = {
		route: new Style({
			stroke: new Stroke({
				width: routeWidth,
				color: routeColorRgbArray
			})
		})
	};

	const vectorLayer = new VectorLayer({
		source: new VectorSource({ features: [routeFeature] }),
		style (feature) {
			return styles[feature.get('type')];
		}
	});

	map.addLayer(vectorLayer);
};

//Export
export const MapLocationIq = props => {
	const { id, classNames, styles, getHandler, attributes, state } = props;
	const { map, mapReady, pins, centerLon, centerLat, zoom, routeFrom, routeTo, route } = state;

	useEffect(getHandler(onMount), []);
	useEffect(getHandler(onMapReady), [mapReady, pins]);
	useEffect(getHandler(onPositionZoomChange), [centerLon, centerLat, zoom]);
	useEffect(getHandler(onCalculateRoute), [map, routeFrom, routeTo]);
	useEffect(getHandler(onGetRoute), [route]);

	return (
		<div
			id={id}
			className={classNames}
			style={styles}
			{...attributes}
		/>
	);
};
