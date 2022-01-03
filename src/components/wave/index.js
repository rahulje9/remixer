import React from 'react';
import LottieView from 'lottie-react-native';

const WaveLoader = ({customStyle = {}}) => {
  return (
    <>
      <LottieView
        source={require('../../../assets/lottie/wave.json')}
        autoPlay
        loop
        style={customStyle}
      />
    </>
  );
};

export default WaveLoader;
