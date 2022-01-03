import {CircularProgressWithChild} from 'react-native-circular-progress-indicator';
import React from 'react';
import {View} from 'react-native';

const ProgressBar = ({child}) => {
  const _props = {
    activeStrokeWidth: 2,
    inActiveStrokeWidth: 2,
    inActiveStrokeOpacity: 2,
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
      }}>
      <CircularProgressWithChild
        {..._props}
        value={5}
        radius={35}
        activeStrokeColor={'#e84118'}
        inActiveStrokeColor={'blue'}>
        {child}
      </CircularProgressWithChild>
    </View>
  );
};

export default ProgressBar;
