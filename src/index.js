/* eslint-disable max-lines-per-function, max-lines */

//System
import React from 'react';
import ReactDOM from 'react-dom/client';

//Components
import { MapLocationIq } from './components/mapLocationIq';

//PropSpecs
import propsMapLocationIq from './components/mapLocationIq/props';

//Opus Lib
import Opus from '@intenda/opus-ui';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<Opus
		registerComponentTypes={[{
			type: 'mapLocationIq',
			component: MapLocationIq,
			propSpec: propsMapLocationIq
		}]}
		startupMda={{
			type: 'containerSimple',
			prps: {
				singlePage: true,
				mainAxisAlign: 'center',
				crossAxisAlign: 'center'
			},
			wgts: [{
				type: 'mapLocationIq',
				prps: { }
			}]
		}}
	/>
);
