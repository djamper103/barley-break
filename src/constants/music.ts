import DEFAULT_END from '../../assets/music/end/default.mp3';
import DEFAULT_MOVE from '../../assets/music/move/default.mp3';

export const DEFAULT_END_MUSIC = DEFAULT_END;
export const DEFAULT_MOVE_MUSIC = DEFAULT_MOVE;

type SoundMap = {[key: string]: any};

export const SOUND_BY_KEYS: SoundMap = {
  DEFAULT_MOVE: DEFAULT_MOVE_MUSIC,
  DEFAULT_END: DEFAULT_END_MUSIC,
};
