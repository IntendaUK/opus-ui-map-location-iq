//Components
import { MapLocationIq } from './components/mapLocationIq';

//PropSpecs
import propsMapLocationIq from './components/mapLocationIq/props';

import { registerComponentTypes } from 'opus-ui';

registerComponentTypes([{
	type: 'mapLocationIq',
	component: MapLocationIq,
	propSpec: propsMapLocationIq
}]);
