import { SELECT } from './constants';
// Actions
export const select = position => {
  return {
    type: SELECT,
    position
  };
};
