import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import CloseIcon from '../../../assets/images/x.svg';
import colors from '../../utils/colors';

const CustomHeader = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.5} style={styles.closeIconView}>
        <CloseIcon height={30} width={30} color={colors.default_blue} />
      </TouchableOpacity>
      <Text style={styles.instructionsLabel}>Instructions</Text>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    height: 52,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  closeIconView: {
    height: 35,
    width: 35,
    borderRadius: 5,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionsLabel: {
    fontSize: 18,
    color: colors.white,
    fontWeight: '700',
  },
});
