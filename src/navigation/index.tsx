import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {TransitionSpec} from '@react-navigation/stack/lib/typescript/src/types';
import React, {FC} from 'react';
// import {StatusBar} from 'react-native';
// import {Menu} from '../components/menu';
import {COLORS} from '../constants/colors';
import {ARROW_LEFT_ICON} from '../constants/images';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {setIsTheme} from '../redux/store/actionCreator/actionCreatorTheme';
import {HeaderNavigation} from './headerNavigation';
import {routesStack} from './routes';

const Stack = createStackNavigator();
const config: TransitionSpec = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

export const NavigationContainerFC: FC = () => {
  const {isTheme} = useAppSelector(reducer => reducer.themeReducer);

  const color = isTheme ? COLORS.BLACK : COLORS.WHITE;

  const dispatch = useAppDispatch();

  const setTheme = () => {
    dispatch(setIsTheme(isTheme));
  };

  return (
    <NavigationContainer>
      {/* <StatusBar
        backgroundColor={isTheme ? COLORS.CLOUD_BURST : COLORS.TRANSPARENT}
      /> */}
      {/* <StatusBar translucent={true} backgroundColor={COLORS.TRANSPARENT} /> */}
      <Stack.Navigator
        screenOptions={{
          cardStyle: {
            backgroundColor: color,
          },
        }}>
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
              // cardStyle: {
              //   backgroundColor: color,
              // },
            }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
