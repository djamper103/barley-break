import React, {FC} from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SwitchComponent} from '../../components/common/switch';
import {COLORS} from '../../constants/colors';

interface HeaderNavigationProps {
  navigation?: any;
  leftIcon?: ImageSourcePropType;
  leftIconStyle?: ImageStyle;
  componentName: string;
  props?: any;
  isTheme?: boolean;
  setTheme: () => void;
}

export const HeaderNavigation: FC<HeaderNavigationProps> = (...props) => {
  //go back to last component
  const onPressBack = () => {
    props[0].props.navigation.goBack();
  };

  //change theme
  const onPressTheme = () => {
    props[0].setTheme();
  };

  return (
    <View
      style={[
        styles.container,
        props[0].componentName !== 'Menu' && styles.containerTheme,
      ]}>
      {props[0].componentName !== 'Menu' && (
        <TouchableOpacity onPress={onPressBack}>
          <Image
            source={props[0].leftIcon}
            style={[
              styles.image,
              props[0].isTheme && styles.imageTheme,
              props[0].leftIconStyle && props[0].leftIconStyle,
            ]}
          />
        </TouchableOpacity>
      )}
      <SwitchComponent isTheme={props[0].isTheme} onPress={onPressTheme} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '2%',
  },
  containerTheme: {
    justifyContent: 'space-between',
  },
  image: {
    resizeMode: 'contain',
    tintColor: COLORS.DUNE,
  },
  imageTheme: {
    tintColor: COLORS.WHITE,
  },
});
