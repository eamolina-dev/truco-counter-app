import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TeamName from '../TeamName';

describe('TeamName Component', () => {
  it('renders the team name correctly', () => {
    const { getByText } = render(<TeamName name="Team A" onChangeName={() => {}} />);
    expect(getByText('Team A')).toBeTruthy();
  });

  it('calls onChangeName when tapped', () => {
    const mockOnChangeName = jest.fn();
    const { getByText } = render(<TeamName name="Team A" onChangeName={mockOnChangeName} />);
    fireEvent.press(getByText('Team A'));
    expect(mockOnChangeName).toHaveBeenCalledTimes(1);
  });
});
