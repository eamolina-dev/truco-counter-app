const useGame = (initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatchAction = (type, payload = {}) => dispatch({ type, ...payload });

  const increment = (team) => dispatchAction('INCREMENT', { team });
  const decrement = (team) => dispatchAction('DECREMENT', { team });
  const resetGame = () => dispatchAction('RESET_GAME');
  
  return { state, increment, decrement, resetGame, dispatchAction };
};
