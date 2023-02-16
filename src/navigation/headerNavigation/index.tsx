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
import {dw} from '../../utils/dimensions';

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
  const onPressBack = () => {
    props[0].props.navigation.goBack();
  };
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
        <TouchableOpacity
          onPress={onPressBack}
          style={[
            styles.containerBack,
            props[0].isTheme && styles.containerBackTheme,
          ]}>
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
    paddingVertical: dw(10),
    paddingHorizontal: dw(10),
  },
  containerTheme: {
    justifyContent: 'space-between',
  },
  containerBack: {
    borderRadius: dw(50),
  },
  containerBackTheme: {
    // backgroundColor: COLORS.OXFORD_BLUE,
  },
  image: {
    resizeMode: 'contain',
    tintColor: COLORS.DUNE,
  },
  imageTheme: {
    tintColor: COLORS.WHITE,
  },
});
