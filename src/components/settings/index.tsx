import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface SettingsProps {
  navigation?: any;
}

export const Settings: FC<SettingsProps> = ({}) => {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
});
