import {SOUND_BY_KEYS} from '../../constants/music';

const Sound = require('react-native-sound');

Sound.setCategory('Playback');

export const soundFunc = (type: string, soundVolume: number) => {
  const audio = new Sound(SOUND_BY_KEYS[type], null);
  audio.setVolume(soundVolume);
  setTimeout(() => {
    audio.play();
  }, 100);
  return audio.release();
};
