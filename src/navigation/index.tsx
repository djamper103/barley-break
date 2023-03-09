import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {TransitionSpec} from '@react-navigation/stack/lib/typescript/src/types';
import React, {FC} from 'react';
import {StatusBar} from 'react-native';
import {COLORS} from '../constants/colors';
import {ARROW_LEFT_ICON} from '../constants/images';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {setIsTheme} from '../redux/store/actionCreator/actionCreatorTheme';
import {HeaderNavigation} from './headerNavigation';
import {routesStack} from './routes';

const Stack = createStackNavigator();
const config: TransitionSpec = {
  animation: 'timing',
  config: {
    duration: 500,
  },
};

export const NavigationContainerFC: FC = () => {
  const {isTheme} = useAppSelector(reducer => reducer.themeReducer);

  const color = isTheme ? COLORS.BLACK : COLORS.WHITE;

  const barStyle = isTheme ? 'light-content' : 'dark-content';

  const dispatch = useAppDispatch();

  //set theme
  const setTheme = () => {
    dispatch(setIsTheme(isTheme));
  };

  //needed to change main backgroundColor
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: color,
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar barStyle={barStyle} backgroundColor={color} />
      <Stack.Navigator>
        {routesStack.map(el => (
          <Stack.Screen
            name={el.name}
            component={el.component}
            key={el.name}
            options={{
              header: (props: any) => (
                <HeaderNavigation
                  leftIcon={ARROW_LEFT_ICON}
                  componentName={el.name}
                  isTheme={isTheme}
                  props={props}
                  setTheme={setTheme}
                />
              ),
              transitionSpec: {
                open: config,
                close: config,
              },
            }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
