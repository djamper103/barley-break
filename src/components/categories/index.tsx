import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface CategoriesProps {
  navigation?: any;
}

export const Categories: FC<CategoriesProps> = ({}) => {
  return (
    <View style={styles.container}>
      <Text>Categories</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
});