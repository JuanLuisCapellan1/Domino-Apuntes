import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@domino_apuntes:history:v1';
const MAX_GAMES = 200; // tope blando para evitar crecimiento ilimitado

// Hook minimal para gestionar el historial persistente de partidas.
// Carga al montar, persiste cada cambio. Sin librería externa para mantenerlo simple.
export function useHistory() {
  const [games, setGames] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!cancelled) {
          setGames(raw ? JSON.parse(raw) : []);
          setLoaded(true);
        }
      } catch {
        if (!cancelled) setLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const persist = useCallback(async (next) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // En producción registraríamos esto en un logger; aquí lo silenciamos.
    }
  }, []);

  const addGame = useCallback(
    (game) => {
      setGames((prev) => {
        const next = [game, ...prev].slice(0, MAX_GAMES);
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const removeGame = useCallback(
    (id) => {
      setGames((prev) => {
        const next = prev.filter((g) => g.id !== id);
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const clearAll = useCallback(() => {
    setGames([]);
    persist([]);
  }, [persist]);

  return { games, loaded, addGame, removeGame, clearAll };
}
