import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import CustomHeader from '../../components/customHeader';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../utils/colors';
import WaveLoader from '../../components/wave';
import ProgressBarWithButton from '../../components/progressBarWithButton';

const Home = () => {
  return (
    <LinearGradient colors={colors.gradient_colors} style={styles.flexOne}>
      <SafeAreaView style={styles.flexOne}>
        <CustomHeader />
        <View style={styles.headingView}>
          <Text style={styles.headingLabel}>Passing Storm</Text>
        </View>
        <View style={styles.lottieView}>
          <WaveLoader customStyle={styles.waveOneCustomStyle} />
          <WaveLoader customStyle={styles.waveTwoCustomStyle} />
        </View>
        <View
          style={{
            borderWidth: 1,
            flex: 0.44,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          {/* <TouchableOpacity></TouchableOpacity> */}
          <View
            style={{
              flexDirection: 'row',
            }}>
            <ProgressBarWithButton />
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
});
