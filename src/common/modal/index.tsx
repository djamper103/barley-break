import React, {FC} from 'react';
import {Modal, Pressable} from 'react-native';

interface ModalContainerProps {
  children?: any;
  isModal?: boolean;
  containerStyle?: any;
  onPress?: () => void;
}

export const ModalContainer: FC<ModalContainerProps> = ({
  children,
  isModal,
  containerStyle,
  onPress,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModal}
      onLayout={onPress}>
      <Pressable style={containerStyle && containerStyle} onPressOut={onPress}>
        {children}
      </Pressable>
    </Modal>
  );
};
