import React from 'react';
import { render } from '@testing-library/react-native';
import ScoreBoard from '../ScoreBoard';

describe('ScoreBoard Component', () => {
  test('should render two ScoreColumn components with correct props', () => {
    const { getByText } = render(
      <ScoreBoard points={10} leftPoints={5} rightPoints={3} />
    );

    // Check if the left and right columns have the correct points
    expect(getByText('5')).toBeTruthy(); // Left column points
    expect(getByText('3')).toBeTruthy(); // Right column points
  });
});
