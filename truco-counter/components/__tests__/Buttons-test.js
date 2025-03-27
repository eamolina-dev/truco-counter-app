import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Buttons from '../Buttons';
import { FontAwesome6 } from '@expo/vector-icons';

describe('Buttons Component', () => {
  const mockLeftPress = jest.fn();
  const mockRightPress = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders left and right buttons with icons', () => {
    const { getByTestId } = render(
      <Buttons
        leftButton="arrow-left"
        rightButton="arrow-right"
        onPressLeft={mockLeftPress}
        onPressRight={mockRightPress}
        color="black"
      />
    );

    const leftButton = getByTestId('left-button');
    const rightButton = getByTestId('right-button');

    expect(leftButton).toBeTruthy();
    expect(rightButton).toBeTruthy();
  });

  it('calls onPressLeft when left button is pressed', () => {
    const { getByTestId } = render(
      <Buttons
        leftButton="arrow-left"
        rightButton="arrow-right"
        onPressLeft={mockLeftPress}
        onPressRight={mockRightPress}
        color="black"
      />
    );

    fireEvent.press(getByTestId('left-button'));
    expect(mockLeftPress).toHaveBeenCalledTimes(1);
  });

  it('calls onPressRight when right button is pressed', () => {
    const { getByTestId } = render(
      <Buttons
        leftButton="arrow-left"
        rightButton="arrow-right"
        onPressLeft={mockLeftPress}
        onPressRight={mockRightPress}
        color="black"
      />
    );

    fireEvent.press(getByTestId('right-button'));
    expect(mockRightPress).toHaveBeenCalledTimes(1);
  });
});
