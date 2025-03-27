import { jest } from '@jest/globals';

// Mock de FontAwesome6
jest.mock('@expo/vector-icons', () => ({
  FontAwesome6: ({ name, size, color, testID }) => (
    <div data-testid={testID} className={`icon ${name}`} style={{ fontSize: size, color }}>
      {name}
    </div>
  ),
}));

// Mockear el componente Match (SVG)
jest.mock('./assets/svg/match.svg', () => 'Match');

// Mock de expo-font
jest.mock('expo-font', () => ({
  useFonts: jest.fn(() => [true, {}]),
}));
