import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TapArea from '../TapArea';
import { Text } from 'react-native';

describe('TapArea Component', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <TapArea>
        <Text>Tap Here</Text>
      </TapArea>
    );
    expect(getByText('Tap Here')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <TapArea onPress={mockOnPress}>
        <Text>Tap Here</Text>
      </TapArea>
    );
    fireEvent.press(getByText('Tap Here'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
