import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import PointsGroup from '../atoms/PointsGroup';

const Points = ({ totalPoints, points }) => {
  const fullGroups = Math.floor(totalPoints / 5);
  const remPoints = totalPoints % 5;
  
  const [size, setSize] = useState(100);

  useEffect(() => {
    if (totalPoints > 25) setSize(40);
    else if (totalPoints > 20) setSize(55);
    else if (totalPoints > 15) setSize(70);
    else if (totalPoints > 10) setSize(85);
    else setSize(100);
  }, [totalPoints]);

  const fullPoints = Math.floor(points / 5);
  const rem = points % 5;

  const groups = [];
    
  for (let i = 0; i < fullPoints; i++) {
    groups.push(5);
  }
    
  if (rem > 0) {
    groups.push(rem);
  }

  return (
    <View style={styles.container}>
      {Array.from({ length: fullGroups }).map((_, index) => (
        <PointsGroup key={index} points={groups[index]} height={size} width={size} />
      ))}
      
      {remPoints > 0 && (
        <PointsGroup key="remPoints" points={groups[fullGroups]} height={size} width={size} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default Points;
