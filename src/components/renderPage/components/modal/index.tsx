import React, {FC} from 'react';
import {
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ModalContainer} from '../../../../common/modal';
import {COLORS} from '../../../../constants/colors';
import {IMAGES_BY_KEYS} from '../../../../constants/images';
import {dw} from '../../../../utils/dimensions';
import {ButtonContainer} from '../../../common/button';
import {ZoomImageComponent} from '../../../zoomImageComponent';

interface RenderPageHeaderProps {
  isModalImageCurrent?: boolean;
  isModalRandom?: boolean;
  isModalEnd?: boolean;
  isTheme?: boolean;
  numberOfImage: number;
  changeImageFunc: any;
  modalImageFunc: () => void;
  onRandomArray: () => void;
  goToMainFunc: () => void;
  isModalEndFunc: () => void;
}

export const RenderPageModal: FC<RenderPageHeaderProps> = ({
  isModalImageCurrent = false,
  isModalRandom = false,
  isModalEnd = false,
  numberOfImage = 1,
  changeImageFunc,
  modalImageFunc,
  onRandomArray,
  goToMainFunc,
  isModalEndFunc,
}) => {
  return (
    <>
      <ModalContainer isModal={isModalImageCurrent}>
        <GestureHandlerRootView>
          <Pressable style={styles.containerModal} onPress={modalImageFunc}>
            <TouchableWithoutFeedback>
              <View>
                <ZoomImageComponent imageIcon={IMAGES_BY_KEYS[numberOfImage]} />
              </View>
            </TouchableWithoutFeedback>
          </Pressable>
        </GestureHandlerRootView>
      </ModalContainer>

      <ModalContainer isModal={isModalRandom}>
        <ButtonContainer
          onPress={onRandomArray}
          text={'Random array'}
          containerStyle={[styles.containerModal]}
        />
      </ModalContainer>

      <ModalContainer isModal={isModalEnd} onPress={isModalEndFunc}>
        <View style={styles.containerModalEnd}>
          <ButtonContainer
            onPress={changeImageFunc}
            text={'New game'}
            containerStyle={[styles.containerButtonEnd]}
          />
          <ButtonContainer
            onPress={goToMainFunc}
            text={'Menu'}
            containerStyle={[styles.containerButtonEnd]}
          />
        </View>
      </ModalContainer>
    </>
  );
};

const styles = StyleSheet.create({
  containerModal: {
    backgroundColor: COLORS.BISCAY_OPACITY_04,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerModalEnd: {
    backgroundColor: COLORS.BISCAY_OPACITY_04,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    paddingHorizontal: dw(50),
  },
  containerButtonEnd: {},
});
