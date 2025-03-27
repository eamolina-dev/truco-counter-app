import React from 'react';
import { render } from '@testing-library/react-native';
import Points from '../Points';
import PointsGroup from '../PointsGroup';

jest.mock('../PointsGroup', () => 'PointsGroup'); // Mocking the PointsGroup component

describe('Points Component', () => {
  test('should render the correct number of PointsGroup components based on fullGroups', () => {
    const { getAllByType } = render(<Points fullGroups={3} rest={2} points={5} />);
    
    // Verifying that PointsGroup is rendered for fullGroups
    const pointsGroupComponents = getAllByType('PointsGroup');
    expect(pointsGroupComponents.length).toBe(4); // 3 fullGroups + 1 rest
  });

  test('should pass the correct points prop to PointsGroup for the rest', () => {
    const { getByType } = render(<Points fullGroups={2} rest={3} points={5} />);
    
    // Verifying that the PointsGroup for the rest group receives the correct points prop
    const lastPointsGroup = getByType('PointsGroup');
    expect(lastPointsGroup.props.points).toBe(3);
  });
});
