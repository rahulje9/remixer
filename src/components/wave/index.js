import LottieView from 'lottie-react-native';
import React, {useEffect, useRef} from 'react';

const WaveLoader = ({customStyle = {}, playing = false}) => {
  const lottieRef = useRef();

  useEffect(() => {
    if (playing) {
      lottieRef.current?.play();
    } else {
      lottieRef.current?.pause();
    }
  }, [playing]);
  return (
    <>
      <LottieView
        ref={lottieRef}
        source={require('../../../assets/lottie/wave.json')}
        loop
        style={customStyle}
      />
    </>
  );
};

export default WaveLoader;
