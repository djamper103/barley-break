import React, {FC} from 'react';
import {
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ModalContainer} from '../../../../../../common/modal';
import {COLORS} from '../../../../../../constants/colors';
import {IMAGES_BY_KEYS} from '../../../../../../constants/images';
import {ZoomImageComponent} from '../../../../../zoomImageComponent';

interface ZoomModalProps {
  isModalImageCurrent?: boolean;
  numberOfImage: number;
  modalImageFunc: () => void;
}

export const ZoomModal: FC<ZoomModalProps> = ({
  isModalImageCurrent = false,
  numberOfImage = 1,
  modalImageFunc,
}) => {
  return (
    <ModalContainer isModal={isModalImageCurrent}>
      <GestureHandlerRootView>
        <Pressable style={styles.container} onPress={modalImageFunc}>
          <TouchableWithoutFeedback>
            <View>
              <ZoomImageComponent imageIcon={IMAGES_BY_KEYS[numberOfImage]} />
            </View>
          </TouchableWithoutFeedback>
        </Pressable>
      </GestureHandlerRootView>
    </ModalContainer>
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
