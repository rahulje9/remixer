import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {CircularProgressWithChild} from 'react-native-circular-progress-indicator';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import DropletIcon from '../../../assets/images/droplet.svg';
import colors from '../../utils/colors';
import Player from '../audioPlayer';
import useFetchAudio from '../../hooks/useFetchAudio';
import {
  PanGestureHandler,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';

const _props = {
  activeStrokeWidth: 2,
  inActiveStrokeWidth: 2,
  inActiveStrokeOpacity: 2,
};

const ProgressBarWithButton = ({onPlay = () => {}}) => {
  const [isButtonOn, setisButtonOn] = useState(false);
  const translateY = useSharedValue(0);

  const {progress, track, cacheSuccess} = useFetchAudio();

  const colorValue = useDerivedValue(() => {
    return isButtonOn === true ? withTiming(1) : withTiming(0);
  }, [isButtonOn]);

  const offset = useDerivedValue(() => {
    return isButtonOn === true ? withTiming(1) : withTiming(0.1);
  }, [isButtonOn]);

  const renderIcon = () => (
    <DropletIcon color={isButtonOn ? colors.default_blue : colors.white} />
  );

  const _setisButtonOn = () => {
    setisButtonOn(!isButtonOn);
    onPlay(!isButtonOn);
  };

  // const handler = useAnimatedGestureHandler({
  //   onStart: (event, context) => {
  //     context.translateY = translateY.value;
  //   },
  //   onEnd: (event, context) => {},
  //   onActive: (event, context) => {
  //     'worklet';
  //     if (isButtonOn)
  //       translateY.value = withSpring(event.translationY + context.translateY);
  //   },
  // });

  const yAxisMovement = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  const animatedStyles = useAnimatedStyle(() => {
    const translateY = interpolate(
      offset.value,
      [0, 1],
      [0, -offset.value * 150],
    );
    const backgroundColor = interpolateColor(
      colorValue.value,
      [0, 1],
      [colors.transparent, colors.white],
    );
    const borderWidth = interpolate(offset.value, [0, 1], [1, 0]);

    return {
      backgroundColor,
      borderWidth,
      borderColor: colors.white,
      transform: [{translateY}],
    };
  });

  return (
    <View style={[styles.container]}>
      {progress === 100 || cacheSuccess ? (
        // <PanGestureHandler onGestureEvent={handler}>
        <Animated.View
          style={[yAxisMovement, animatedStyles, styles.buttonStyle]}>
          <TouchableOpacity
            onPress={_setisButtonOn}
            activeOpacity={0.5}
            style={[styles.buttonStyle]}>
            {renderIcon()}
          </TouchableOpacity>
        </Animated.View>
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
      <Player status={isButtonOn} track={track} />
    </View>
  );
};

export default ProgressBarWithButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
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
