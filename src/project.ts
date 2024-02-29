import {makeProject} from '@motion-canvas/core';

import main from './scenes/main?scene';
import intuition from './scenes/intuition?scene';
import derive from './scenes/derive?scene';

export default makeProject({
  scenes: [main, intuition, derive],
  variables: {
    
  },
  name: 'Funktionenscharen',
});
