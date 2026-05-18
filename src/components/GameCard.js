import React, { memo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/theme';
import { gameFinal, gameWinner, formatTime } from '../utils/gameHelpers';

// Variante "Minimal": tarjeta limpia con dos marcadores grandes,
// nombres de equipos, hora y meta. Replica el diseño de Historial.html (CardMinimal).
function GameCard({ game, onPress }) {
  const final = gameFinal(game);
  const winner = gameWinner(game);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPress(game)}
      accessibilityRole="button"
      accessibilityLabel={`Partida ${game.teamA} ${final.A} contra ${game.teamB} ${final.B}, meta ${game.meta}`}
      style={styles.card}
    >
      <View style={styles.topRow}>
        <Text style={styles.topMeta}>
          {formatTime(game.date)}
          {game.durationMin ? ` · ${game.durationMin} min` : ''}
        </Text>
        <Text style={styles.metaPill}>
          META <Text style={styles.metaPillVal}>{game.meta}</Text>
        </Text>
      </View>

      <View style={styles.scoresRow}>
        <View style={[styles.side, styles.sideLeft]}>
          <Text style={[styles.sideLabel, { color: COLORS.primary }]} numberOfLines={1}>
            {(game.teamA || 'NOSOTROS').toUpperCase()}
          </Text>
          <Text style={[styles.sideScore, winner !== 'A' && styles.sideScoreLose]}>
            {final.A}
          </Text>
        </View>

        <Text style={styles.vs}>VS</Text>

        <View style={[styles.side, styles.sideRight]}>
          <Text style={[styles.sideLabel, { color: COLORS.secondary }]} numberOfLines={1}>
            {(game.teamB || 'ELLOS').toUpperCase()}
          </Text>
          <Text style={[styles.sideScore, winner !== 'B' && styles.sideScoreLose]}>
            {final.B}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default memo(GameCard);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  topMeta: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  metaPill: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  metaPillVal: {
    color: COLORS.accent,
    fontWeight: '800',
    fontSize: 13,
  },
  scoresRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  side: {
    flex: 1,
  },
  sideLeft: {
    alignItems: 'flex-start',
  },
  sideRight: {
    alignItems: 'flex-end',
  },
  sideLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 4,
    maxWidth: '100%',
  },
  sideScore: {
    fontSize: 34,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -1,
    lineHeight: 36,
  },
  sideScoreLose: {
    color: '#5a5a62',
  },
  vs: {
    color: '#5a5a62',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    paddingHorizontal: 8,
  },
});
