import React from 'react';
import { View, StyleSheet } from 'react-native';
import Points from './Points';
import { Colors } from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';

const ScoreColumn = ({ pointsGoal, points, markMidLine }) => {
  const half = Math.floor(pointsGoal / 2);
  const bads = points >= half ? half : points;
  const goods = points >= half ? points - half : 0;

  return (
    <View style={[styles.container, { borderTopColor: goods > 0 ? Colors.teal : Colors.red, borderTopWidth: 3 }]}>
      <LinearGradient 
        colors={[points <= half ? 'transparent' : 'transparent', 'transparent']} 
        style={styles.scoreboardGradient}
        start={{ x: 0, y: 0.25 }}
        end={{ x: 0, y: 0.75 }}
      />
        <View style={styles.pointsContainer}>
          <Points totalPoints={half} points={bads} />
          {markMidLine && <View style={styles.divider} />}
          <Points totalPoints={half} points={goods} />
        </View>
    </View>    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  pointsContainer: {
    flex: 1,
    height: '100%',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  divider: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '49%',
    backgroundColor: Colors.darkblue,
    height: 3,
  },
  scoreboardGradient: {
    position: 'absolute',
    top: 0,
    height: 12,
    width: '100%',
  },
});

export default ScoreColumn;
