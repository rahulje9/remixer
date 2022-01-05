import axios from 'axios';

import {BASE_URL, FREE_SOUND_KEY} from '../constants/constants';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${FREE_SOUND_KEY}`,
  },
});
