import {useEffect} from 'react';
import TrackPlayer, {
  Capability,
  RepeatMode,
  State,
  usePlaybackState,
} from 'react-native-track-player';
import localTrack from '../../../assets/eg1.m4a';

const setupIfNecessary = async () => {
  // if app was relaunched and music was already playing, we don't setup again.
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack !== null) {
    return;
  }

  await TrackPlayer.setupPlayer({});
  await TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities: [Capability.Play, Capability.Pause, Capability.Stop],
    compactCapabilities: [Capability.Play, Capability.Pause, Capability.Stop],
  });

  await TrackPlayer.add({
    url: localTrack,
    artist: 'test',
    title: 'Pure (Demo)',
  });

  TrackPlayer.setRepeatMode(RepeatMode.Track);
};

const togglePlayback = async (playbackState, status) => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack == null) {
    // TODO: Perhaps present an error or restart the playlist?
  } else {
    if (playbackState !== State.Playing && status === true) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};

const stopPlayer = async playbackState => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack == null) {
  } else {
    await TrackPlayer.stop();
  }
};

const Player = ({status}) => {
  const playbackState = usePlaybackState();

  useEffect(() => {
    setupIfNecessary();
    return () => {
      stopPlayer(playbackState);
    };
  }, []);

  useEffect(() => {
    togglePlayback(playbackState, status);
  }, [status]);

  return null;
};

export default Player;
