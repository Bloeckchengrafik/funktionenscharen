import {makeProject} from '@motion-canvas/core';

import main from './scenes/main?scene';
import intuition from './scenes/intuition?scene';
import intuition2 from './scenes/intuition2?scene';
import derive from './scenes/derive?scene';
import integrate from './scenes/integrate?scene';
import zeropoints from './scenes/zeropoints?scene';
import valueofparam1 from './scenes/valueofparam1?scene';
import valueofparam2 from './scenes/valueofparam2?scene';
import end from './scenes/end?scene';

export default makeProject({
    scenes: [
        main,
        intuition,
        intuition2,
        derive,
        integrate,
        zeropoints,
        valueofparam1,
        valueofparam2,
        end
    ],
    variables: {},
    name: 'Funktionenscharen',
});
