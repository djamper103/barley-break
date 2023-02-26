import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {IMAGES_BY_KEYS} from '../../../../constants/images';
import {dw, height, width} from '../../../../utils/dimensions';
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
    <View
      style={[
        isImageComponent ? styles.containerImageComponent : styles.container,
      ]}>
      {isImageComponent && (
        <BigImageComponent
          isTheme={isTheme}
          imageIcon={IMAGES_BY_KEYS[numberOfImage]}
          containerStyle={styles.containerImage}
          onPress={modalImageFunc}
        />
      )}
      <View style={[isImageComponent && styles.containerRightImage]}>
        {isImageComponent && !isImageChoose && (
          <ButtonContainer
            onPress={changeImageFunc}
            text={'Change image'}
            buttonStyle={styles.containerButton}
            textStyle={styles.textButton}
          />
        )}
        <ButtonContainer
          onPress={onRandomArray}
          text={'Random array'}
          buttonStyle={isImageComponent && styles.containerButton}
          textStyle={[
            styles.textButton,
            !isImageComponent && styles.textButtonClassic,
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: '9%',
    marginTop: '5%',
  },
  containerImageComponent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '24%',
    marginTop: 0,
  },
  containerRightImage: {
    height: '100%',
    width: width / 2.6,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: dw(5),
  },
  containerImage: {
    width: width / 1.77,
  },
  containerButton: {
    paddingVertical: height / 80,
    width: width / 2.8,
    marginBottom: height / 70,
    paddingHorizontal: 0,
  },
  textButton: {
    fontSize: 15,
    fontWeight: '500',
  },
  textButtonClassic: {
    fontSize: 20,
  },
});
