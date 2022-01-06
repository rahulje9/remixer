import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomHeader from '../../components/customHeader';
import ProgressBarWithButton from '../../components/progressBarWithButton';
import WaveLoader from '../../components/wave';
import colors from '../../utils/colors';

const Home = () => {
  const [playing, setPlaying] = useState(false);

  const _setPlaying = () => {
    setPlaying(!playing);
  };
  return (
    <LinearGradient colors={colors.gradient_colors} style={styles.flexOne}>
      <SafeAreaView style={styles.flexOne}>
        <CustomHeader />
        <View style={styles.headingView}>
          <Text style={styles.headingLabel}>Passing Storm</Text>
        </View>
        <View style={styles.lottieView}>
          <WaveLoader
            playing={playing}
            customStyle={styles.waveOneCustomStyle}
          />
          <WaveLoader
            playing={playing}
            customStyle={styles.waveTwoCustomStyle}
          />
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.row}>
            <ProgressBarWithButton onPlay={_setPlaying} />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Home;

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  headingView: {
    alignItems: 'center',
    flex: 0.28,
    justifyContent: 'center',
  },
  headingLabel: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '800',
  },
  waveOneCustomStyle: {
    marginBottom: 15,
  },
  waveTwoCustomStyle: {
    marginTop: 15,
  },
  lottieView: {
    flex: 0.28,
  },
  row: {
    flexDirection: 'row',
  },
  bottomContainer: {
    flex: 0.44,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
