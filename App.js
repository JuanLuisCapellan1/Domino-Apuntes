import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context'; 
import GameScreen from './src/screens/GameScreen';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <SafeAreaProvider> 
      <StatusBar style="light" /> 
      <GameScreen />
    </SafeAreaProvider>
  );
}