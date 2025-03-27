import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import IconButton from '../IconButton';
import { FontAwesome6 } from '@expo/vector-icons';

describe('IconButton Component', () => {
  it('renders icon with correct props', () => {
    const { getByTestId, debug } = render(
      <IconButton iconName="plus" iconSize={24} iconColor="blue" onPress={() => {}} />
    );
    
    const icon = getByTestId('icon-button-icon');
    expect(icon).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <IconButton iconName="plus" iconSize={24} iconColor="blue" onPress={mockOnPress} />
    );

    fireEvent.press(getByTestId('icon-button-icon'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
