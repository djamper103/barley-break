import React, {FC} from 'react';
import {Modal} from 'react-native';

interface ModalContainerProps {
  children?: any;
  isModal?: boolean;
  onPress?: () => void;
}

export const ModalContainer: FC<ModalContainerProps> = ({
  children,
  isModal,
  onPress,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModal}
      onRequestClose={onPress}>
      {children}
    </Modal>
  );
};
