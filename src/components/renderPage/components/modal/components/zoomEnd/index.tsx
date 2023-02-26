import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {ModalContainer} from '../../../../../../common/modal';
import {COLORS} from '../../../../../../constants/colors';
import {dw} from '../../../../../../utils/dimensions';

import {ButtonContainer} from '../../../../../common/button';

interface ModalEndProps {
  textHeader?: string;
  isModalEnd?: boolean;
  changeImageFunc: any;
  seconds?: number;
  minutes?: number;
  isModalEndFunc: () => void;
  goToMainFunc: () => void;
}

export const ModalEnd: FC<ModalEndProps> = ({
  textHeader = 'Congratulation you won the game',
  isModalEnd = false,
  changeImageFunc,
  seconds = 0,
  minutes = 0,
  isModalEndFunc,
  goToMainFunc,
}) => {
  return (
    <ModalContainer isModal={isModalEnd} onPress={isModalEndFunc}>
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>{textHeader}</Text>
          <View>
            <Text style={styles.text}>
              Your time: {minutes < 10 ? `0${minutes}` : minutes} :
              {seconds < 10 ? `0${seconds}` : seconds === 60 ? '00' : seconds}
            </Text>
          </View>
        </View>
        <View style={styles.containerButton}>
          <ButtonContainer
            onPress={changeImageFunc}
            text={'New game'}
            buttonStyle={styles.button}
          />
          <ButtonContainer
            onPress={goToMainFunc}
            text={'Menu'}
            buttonStyle={styles.button}
          />
        </View>
      </View>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BISCAY_OPACITY_04,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    paddingHorizontal: dw(20),
  },
  containerButton: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    marginTop: 50,
  },
  button: {
    width: dw(160),
    paddingHorizontal: dw(16),
  },
  text: {
    fontSize: 32,
    fontWeight: '500',
    color: COLORS.WHITE,
    textAlign: 'center',
    letterSpacing: 2,
    textShadowRadius: 50,
  },
});
