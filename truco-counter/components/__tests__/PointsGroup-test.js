import React from 'react';
import { render } from '@testing-library/react-native';
import PointsGroup from '../PointsGroup';

describe('PointsGroup Component', () => {
  it('renders with correct dimensions', () => {
    const { getByTestId } = render(
      <PointsGroup points={3} height={150} width={150} />
    );
    const container = getByTestId('points-group');
    console.log(container.props.style);
    expect(container.props.style.height).toBe(150);
    expect(container.props.style.width).toBe(150);
  });
  
  it('renders correct number of visible matches based on points', () => {
    const { getAllByTestId } = render(<PointsGroup points={3} />);
    const matches = getAllByTestId('match');
    matches.forEach((match, index) => {
      console.log(match.props.style.opacity);
      if (index < 3) {
        expect(match.props.style.opacity).toBe(0.9);
      } else {
        expect(match.props.style.opacity).toBe(0);
      }
    });
  });  

  it('applies correct scaling based on height', () => {
    const height = 200;
    const scale = height / 100;
    const { getAllByTestId } = render(<PointsGroup points={5} height={height} />);
    const matches = getAllByTestId('match');
    matches.forEach(match => {
      expect(match.props.height).toBe(64 * scale);
      expect(match.props.width).toBe(64 * scale);
    });
  });
});
