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
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressBack}>
        {props[0].componentName !== 'Menu' && (
          <Image
            source={props[0].leftIcon}
            style={[
              styles.image,
              props[0].isTheme && styles.imageTheme,
              props[0].leftIconStyle && props[0].leftIconStyle,
            ]}
          />
        )}
      </TouchableOpacity>
      <SwitchComponent isTheme={props[0].isTheme} onPress={onPressTheme} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: dw(10),
  },
  image: {
    resizeMode: 'contain',
    backgroundColor: COLORS.TRANSPARENT,
  },
  imageTheme: {
    tintColor: COLORS.WHITE,
  },
});
