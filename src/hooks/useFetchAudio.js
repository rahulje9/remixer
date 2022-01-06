import React, {useState, useEffect} from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import {MUSIC_LINK, FILE_PATH_KEY} from '../constants/constants';
import {storeData, getData} from '../utils/asyncStorage';
import {useNetInfo} from '@react-native-community/netinfo';

const useFetchAudio = () => {
  const [progress, setprogress] = useState(0);
  const [cacheSuccess, setcacheSuccess] = useState(false);
  const [track, settrack] = useState({});
  const netInfo = useNetInfo();

  let dirs = RNFetchBlob.fs.dirs;

  useEffect(() => {
    checkCacheOrDownload();
  }, [netInfo.isConnected, netInfo.isInternetReachable]);

  const checkCacheOrDownload = async () => {
    const path = await getData(FILE_PATH_KEY);

    if (path) {
      if (await RNFetchBlob.fs.exists(path)) {
        setcacheSuccess(true);
        const _track = {
          url: path,
          artist: 'file-name',
          title: 'file-name',
        };
        settrack(_track);
      } else {
        _checkNetworkAndfetchAudio();
      }
    } else {
      _checkNetworkAndfetchAudio();
    }
  };

  const _checkNetworkAndfetchAudio = () => {
    setcacheSuccess(false);

    if (netInfo.isConnected && netInfo.isInternetReachable) {
      fetchAudio();
    }
  };

  const fetchAudio = () => {
    RNFetchBlob.config({
      path: dirs.DocumentDir + '/file-name.mp3',
      fileCache: true,
    })
      .fetch('GET', MUSIC_LINK) // audio url
      .progress({interval: 500}, (received, total) => {
        let percentage = Math.floor(received / total);
        // setprogress(percentage);
      })
      .then(res => {
        setcacheSuccess(true);
        _track = {
          url: 'file://' + res.path(),
          artist: 'file-name',
          title: 'file-name',
        };
        settrack(_track);
        storeData(FILE_PATH_KEY, 'file://' + res.path());
      })
      .catch(error => {
        setcacheSuccess(false);
      });
  };

  return {
    progress,
    track,
    cacheSuccess,
  };
};

export default useFetchAudio;
