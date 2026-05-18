import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import GameScreen from './src/screens/GameScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import GameDetailScreen from './src/screens/GameDetailScreen';

// Conmutación de pantallas por estado: el proyecto no usa librería de navegación
// y para esta funcionalidad un stack de 3 pantallas es suficiente.
// Si en el futuro crece, considerar migrar a expo-router.
export default function App() {
  const [route, setRoute] = useState({ name: 'game' });

  const goHistory = useCallback(() => setRoute({ name: 'history' }), []);
  const goGame = useCallback(() => setRoute({ name: 'game' }), []);
  const goDetail = useCallback((game) => setRoute({ name: 'detail', game }), []);
  const backFromDetail = useCallback(() => setRoute({ name: 'history' }), []);

  const isGame = route.name === 'game';

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      {/* GameScreen siempre montado para preservar el estado de la partida en curso */}
      <View style={{ flex: 1, display: isGame ? 'flex' : 'none' }}>
        <GameScreen onOpenHistory={goHistory} />
      </View>
      {route.name === 'history' && (
        <HistoryScreen onBack={goGame} onOpenGame={goDetail} />
      )}
      {route.name === 'detail' && (
        <GameDetailScreen game={route.game} onBack={backFromDetail} />
      )}
    </SafeAreaProvider>
  );
}
