import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {PressableTextView} from '../../common/pressableTextView';
import {COLORS} from '../../constants/colors';
import {dw} from '../../utils/dimensions';

interface BigImageComponentProps {
  onPress: () => void;
  isTheme?: boolean;
  imageIcon?: any;
}

export const BigImageComponent: FC<BigImageComponentProps> = ({
  isTheme,
  imageIcon,
  onPress,
}) => {
  return (
    <PressableTextView
      containerStyle={styles.container}
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
    justifyContent: 'center',
    width: dw(200),
    height: dw(180),
  },
  image: {
    width: dw(200),
    height: dw(180),
    // resizeMode: 'contain',
    backgroundColor: COLORS.TRANSPARENT,
  },
});
