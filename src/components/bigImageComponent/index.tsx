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
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  image: {
    width: dw(160),
    height: dw(160),
    // resizeMode: 'contain',
    backgroundColor: COLORS.TRANSPARENT,
  },
});
