import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {IMAGES_BY_KEYS} from '../../../../constants/images';
import {dh, dw} from '../../../../utils/dimensions';
import {BigImageComponent} from '../../../bigImageComponent';
import {ButtonContainer} from '../../../common/button';

interface RenderPageHeaderProps {
  isImageComponent?: boolean;
  isTheme?: boolean;
  isImageChoose?: boolean;
  numberOfImage: number;
  modalImageFunc: () => void;
  changeImageFunc: any;
  onRandomArray: () => void;
}

export const RenderPageHeader: FC<RenderPageHeaderProps> = ({
  isImageComponent = false,
  isTheme = false,
  isImageChoose = false,
  numberOfImage = 1,
  modalImageFunc,
  changeImageFunc,
  onRandomArray,
}) => {
  return (
    <View style={styles.container}>
      {isImageComponent && (
        <BigImageComponent
          isTheme={isTheme}
          imageIcon={IMAGES_BY_KEYS[numberOfImage]}
          onPress={modalImageFunc}
        />
      )}
      <View
        style={[
          styles.containerRight,
          !isImageComponent && !isImageChoose && styles.containerRightTheme,
        ]}>
        {isImageComponent && !isImageChoose && (
          <ButtonContainer onPress={changeImageFunc} text={'Change image'} />
        )}
        <ButtonContainer onPress={onRandomArray} text={'Random array'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: dw(10),
  },
  containerRight: {
    flexDirection: 'column',
    marginLeft: dw(10),
  },
  containerRightTheme: {
    marginTop: dh(10),
  },
});
