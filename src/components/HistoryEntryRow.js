import React, { memo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/theme';

// Fila del historial in-game (lista de jugadas durante la partida).
// Extraída de GameScreen y memoizada: el padre re-renderiza con cada `setHistory`
// pero solo las filas cuya entry cambia (o cuyo teamName cambia) deben repintarse.
function HistoryEntryRow({ entry, teamName, onLongPress }) {
  const isA = entry.team === 'A';
  return (
    <TouchableOpacity
      onLongPress={() => onLongPress(entry)}
      delayLongPress={500}
      activeOpacity={0.7}
    >
      <View style={[styles.row, entry.voided && styles.rowVoided]}>
        <View style={styles.left}>
          <View
            style={[
              styles.dot,
              { backgroundColor: entry.voided ? COLORS.textDim : isA ? COLORS.primary : COLORS.secondary },
            ]}
          />
          <Text style={[styles.name, entry.voided && styles.textVoided]}>
            {teamName} {entry.voided ? '(Anulado)' : ''}
          </Text>
        </View>
        <Text style={[styles.points, entry.voided && styles.textVoided]}>
          {entry.voided ? -entry.points : `+${entry.points}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

// `entry` y `teamName` son primitivas/inmutables: comparación shallow basta.
export default memo(HistoryEntryRow);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  rowVoided: { opacity: 0.5, backgroundColor: 'rgba(255, 69, 58, 0.05)' },
  left: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 10, height: 10, borderRadius: 5, marginRight: 10 },
  name: { color: COLORS.text, fontSize: 16 },
  points: { color: COLORS.text, fontSize: 18, fontWeight: 'bold' },
  textVoided: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: COLORS.danger,
  },
});
