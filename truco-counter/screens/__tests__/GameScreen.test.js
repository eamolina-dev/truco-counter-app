import GameScreen from '../GameScreen';
import { onConfirmGoal } from '../GameScreen';
import { reducer } from '../lib/reducers/gameReducer';
import { render, fireEvent } from '@testing-library/react-native';

// reducer tests

// describe('GameScreen Reducer', () => {
//   const initialState = {
//     score: 18,
//     leftPoints: 0,
//     rightPoints: 0,
//     gameOver: false,
//     leftTeamName: 'Nosotros',
//     rightTeamName: 'Ellos',
//   };

//   test('Incrementa el puntaje del equipo', () => {
//     const newState = reducer(initialState, { type: 'INCREMENT', team: 'leftPoints' });
//     expect(newState.leftPoints).toBe(1);
//   });

//   test('No incrementa si ya alcanzó el puntaje objetivo', () => {
//     const maxScoreState = { ...initialState, leftPoints: 18 };
//     const newState = reducer(maxScoreState, { type: 'INCREMENT', team: 'leftPoints' });
//     expect(newState.leftPoints).toBe(18); // No debe pasar de 18
//   });

//   test('Decrementa el puntaje del equipo sin valores negativos', () => {
//     const newState = reducer(initialState, { type: 'DECREMENT', team: 'leftPoints' });
//     expect(newState.leftPoints).toBe(0); // No debe ser negativo
//   });

//   test('Cambia correctamente el estado de fin de juego', () => {
//     const newState = reducer(initialState, { type: 'SET_GAME_OVER', gameStatus: true });
//     expect(newState.gameOver).toBe(true);
//   });

//   test('Reinicia el juego correctamente', () => {
//     const gameOverState = { ...initialState, leftPoints: 10, rightPoints: 5, gameOver: true };
//     const newState = reducer(gameOverState, { type: 'RESET_GAME' });
//     expect(newState.leftPoints).toBe(0);
//     expect(newState.rightPoints).toBe(0);
//     expect(newState.gameOver).toBe(false);
//   });

//   test('Cambia el nombre del equipo correctamente', () => {
//     const newState = reducer(initialState, { type: 'CHANGE_TEAM_NAME', team: 'left', newName: 'Campeones' });
//     expect(newState.leftTeamName).toBe('Campeones');
//   });

//   test('Cambia el puntaje objetivo correctamente', () => {
//     const newState = reducer(initialState, { type: 'CHANGE_POINTS_GOAL', newGoal: 25 });
//     expect(newState.score).toBe(25);
//     expect(newState.leftPoints).toBe(0); // Debe reiniciar puntajes
//     expect(newState.rightPoints).toBe(0);
//   });
// });

// on confirm goal

test('Botón + incrementa el puntaje', () => {
  const { getByTestId } = render(<GameScreen />);
  const plusButton = getByTestId('increment-left');

  fireEvent.press(plusButton);
  expect(getByTestId('left-score').props.children).toBe('1');
});

test('Botón - decrementa el puntaje pero no baja de 0', () => {
  const { getByTestId } = render(<GameScreen />);
  const minusButton = getByTestId('decrement-left');

  fireEvent.press(minusButton);
  expect(getByTestId('left-score').props.children).toBe('0');
});

