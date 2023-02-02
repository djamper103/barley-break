import {ChooseImage} from '../../components/chooseImage';
import {ClassicGame} from '../../components/classicGame';
import {GameSize} from '../../components/common/gameSize';
import {Menu} from '../../components/menu';
import {RandomImageGame} from '../../components/randomImage';
import {RenderStart} from '../../components/renderStart';

export const routesStack = [
  {name: 'Menu', component: Menu},
  {name: 'Classic game', component: ClassicGame},
  {name: 'Random image', component: RandomImageGame},
  {name: 'Choose image', component: ChooseImage},
  {name: 'Game size', component: GameSize},
  // {name: 'Settings', component: Settings},
  {name: 'Render start', component: RenderStart},
];
