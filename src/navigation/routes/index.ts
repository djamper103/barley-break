import {Categories} from '../../components/categories';
import {ClassicGame} from '../../components/classicGame';
import {Menu} from '../../components/menu';
import {RandomImageGame} from '../../components/randomImage';
import {RenderStart} from '../../components/renderStart';

export const routesStack = [
  {name: 'Menu', component: Menu},
  {name: 'Classic game', component: ClassicGame},
  {name: 'Random image', component: RandomImageGame},
  {name: 'Categories', component: Categories},
  // {name: 'Settings', component: Settings},
  {name: 'Render start', component: RenderStart},
];
