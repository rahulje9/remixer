import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {CircularProgressWithChild} from 'react-native-circular-progress-indicator';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import DropletIcon from '../../../assets/images/droplet.svg';
import colors from '../../utils/colors';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const ProgressBarWithButton = ({onPlay = () => {}}) => {
  const _props = {
    activeStrokeWidth: 2,
    inActiveStrokeWidth: 2,
    inActiveStrokeOpacity: 2,
  };
  const [isButtonOn, setisButtonOn] = useState(false);

  const colorValue = useDerivedValue(() => {
    return isButtonOn === true ? withTiming(1) : withTiming(0);
  }, [isButtonOn]);

  const offset = useDerivedValue(() => {
    return isButtonOn === true ? withTiming(1) : withTiming(0.1);
  }, [isButtonOn]);

  const [progress, setprogress] = useState(100);

  const renderIcon = () => (
    <DropletIcon
      // color={'#fff'}
      color={isButtonOn ? colors.default_blue : colors.white}
    />
  );

  const _setisButtonOn = () => {
    setisButtonOn(!isButtonOn);
    onPlay(!isButtonOn);
  };

  const animatedButtonStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      colorValue.value,
      [0, 1],
      [colors.transparent, colors.white],
    );

    return {
      backgroundColor,
    };
  });

  const animatedStyles = useAnimatedStyle(() => {
    const translateY = interpolate(
      offset.value,
      [0, 1],
      [0, -offset.value * 150],
    );
    return {
      transform: [{translateY}],
    };
  });

  return (
    <View style={styles.container}>
      {progress === 100 ? (
        <AnimatedTouchableOpacity
          onPress={_setisButtonOn}
          style={[
            styles.buttonStyle,
            animatedButtonStyle,
            !isButtonOn && styles.whiteBorder,
            animatedStyles,
          ]}>
          {renderIcon()}
        </AnimatedTouchableOpacity>
      ) : (
        <CircularProgressWithChild
          {..._props}
          value={progress}
          radius={35}
          activeStrokeColor={colors.white}
          inActiveStrokeColor={colors.progress_blue}>
          {renderIcon()}
        </CircularProgressWithChild>
      )}
    </View>
  );
};

export default ProgressBarWithButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBorder: {
    borderWidth: 1,
    borderColor: colors.white,
  },
});
