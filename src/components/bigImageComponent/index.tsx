import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {PressableTextView} from '../../common/pressableTextView';
import {COLORS} from '../../constants/colors';

interface BigImageComponentProps {
  isTheme?: boolean;
  imageIcon?: any;
  containerStyle?: any;
  onPress: () => void;
}

export const BigImageComponent: FC<BigImageComponentProps> = ({
  isTheme,
  imageIcon,
  containerStyle,
  onPress,
}) => {
  return (
    <PressableTextView
      containerStyle={[styles.container, containerStyle && containerStyle]}
      data={true}
      isTheme={isTheme}
      type={'image'}
      imageIcon={imageIcon}
      imageStyle={styles.image}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '61%',
    height: '100%',
    backgroundColor: COLORS.TRANSPARENT,
  },
  image: {
    width: '100%',
    height: '100%',
    // resizeMode: 'contain',
    backgroundColor: COLORS.TRANSPARENT,
  },
});
