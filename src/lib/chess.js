import Chess from 'chess.js';

// For development purposes...
// Assert that single Chess constructor is extracted for
// other modules
export default (typeof Chess === 'object' ? Chess.Chess : Chess);
