import React from 'react';
import { render } from '@testing-library/react-native';
import ScoreColumn from '../ScoreColumn';
import Points from '../Points';

jest.mock('../Points', () => 'Points'); // Mocking Points component

describe('ScoreColumn Component', () => {
  test('should render two Points components', () => {
    const { getAllByType } = render(
      <ScoreColumn pointsGoal={10} points={5} />
    );
    
    const pointsComponents = getAllByType('Points');
    
    // There should be two Points components rendered
    expect(pointsComponents.length).toBe(2);
  });

  test('should pass correct props to Points component', () => {
    const { getAllByType } = render(
      <ScoreColumn pointsGoal={10} points={5} />
    );
    
    const pointsComponents = getAllByType('Points');
    
    // The Points components should receive the correct props
    pointsComponents.forEach((pointsComponent) => {
      expect(pointsComponent.props.fullGroups).toBe(1); // fullGroups is 1 for pointsGoal of 10
      expect(pointsComponent.props.rest).toBe(0); // rest is 0 for pointsGoal of 10
      expect(pointsComponent.props.points).toBe(5); // points is 5 passed in the test
    });
  });
});
import React from 'react';
import { render } from '@testing-library/react-native';
import ScoreColumn from '../ScoreColumn';
import Points from '../Points';

jest.mock('../Points', () => 'Points'); // Mocking Points component

describe('ScoreColumn Component', () => {
  test('should render two Points components', () => {
    const { getAllByType } = render(
      <ScoreColumn pointsGoal={10} points={5} />
    );
    
    const pointsComponents = getAllByType('Points');
    
    // There should be two Points components rendered
    expect(pointsComponents.length).toBe(2);
  });

  test('should pass correct props to Points component', () => {
    const { getAllByType } = render(
      <ScoreColumn pointsGoal={10} points={5} />
    );
    
    const pointsComponents = getAllByType('Points');
    
    // The Points components should receive the correct props
    pointsComponents.forEach((pointsComponent) => {
      expect(pointsComponent.props.fullGroups).toBe(1); // fullGroups is 1 for pointsGoal of 10
      expect(pointsComponent.props.rest).toBe(0); // rest is 0 for pointsGoal of 10
      expect(pointsComponent.props.points).toBe(5); // points is 5 passed in the test
    });
  });
});
