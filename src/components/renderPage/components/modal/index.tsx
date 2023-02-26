import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {ModalContainer} from '../../../../common/modal';
import {COLORS} from '../../../../constants/colors';
import {ButtonContainer} from '../../../common/button';
import {ModalEnd} from './components/zoomEnd';
import {ZoomModal} from './components/zoomModal';

interface RenderPageHeaderProps {
  isModalImageCurrent?: boolean;
  isModalRandom?: boolean;
  isModalEnd?: boolean;
  isTheme?: boolean;
  numberOfImage: number;
  changeImageFunc: any;
  seconds?: number;
  minutes?: number;
  modalImageFunc: () => void;
  onRandomArray: () => void;
  goToMainFunc: () => void;
  isModalEndFunc: () => void;
}

export const RenderPageModal: FC<RenderPageHeaderProps> = ({
  isModalImageCurrent,
  isModalRandom,
  isModalEnd,
  numberOfImage,
  changeImageFunc,
  seconds,
  minutes,
  modalImageFunc,
  onRandomArray,
  goToMainFunc,
  isModalEndFunc,
}) => {
  return (
    <>
      <ZoomModal
        numberOfImage={numberOfImage}
        isModalImageCurrent={isModalImageCurrent}
        modalImageFunc={modalImageFunc}
      />

      <ModalContainer isModal={isModalRandom}>
        <ButtonContainer
          onPress={onRandomArray}
          text={'Random array'}
          containerStyle={[styles.container]}
        />
      </ModalContainer>

      <ModalEnd
        isModalEnd={isModalEnd}
        seconds={seconds}
        minutes={minutes}
        isModalEndFunc={isModalEndFunc}
        changeImageFunc={changeImageFunc}
        goToMainFunc={goToMainFunc}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BISCAY_OPACITY_04,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
