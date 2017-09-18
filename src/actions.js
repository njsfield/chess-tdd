import { CONFIRM_MOVE, SHOW_PIECE_OPTIONS, PREPARE_MOVE } from './constants';
// Actions
export const show_piece_options = from => {
  return {
    type: SHOW_PIECE_OPTIONS,
    from
  };
};

export const prepare_move = to => {
  return {
    type: PREPARE_MOVE,
    to
  };
};

export const confirm_move = to => {
  return {
    type: CONFIRM_MOVE,
    to
  };
};
