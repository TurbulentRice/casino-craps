/**
 * Main Craps Table Component
 * Orchestrates all table elements and betting areas
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import TableLayout, {
  PassLineArea,
  DontPassArea,
  ComeArea,
  FieldArea,
  PointNumbersArea,
  PointBox,
} from './TableLayout';

interface CrapsTableProps {
  onBetPress?: (betType: string) => void;
}

export default function CrapsTable({ onBetPress }: CrapsTableProps) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <TableLayout>
        {/* Point Numbers Row */}
        <PointNumbersArea>
          <PointBox number={4} odds="9:5" />
          <PointBox number={5} odds="7:5" />
          <PointBox number={6} odds="7:6" />
          <PointBox number={8} odds="7:6" />
          <PointBox number={9} odds="7:5" />
          <PointBox number={10} odds="9:5" />
        </PointNumbersArea>

        {/* Come Area */}
        <ComeArea />

        {/* Field Area */}
        <FieldArea />

        {/* Pass Line */}
        <PassLineArea />

        {/* Don't Pass */}
        <DontPassArea />
      </TableLayout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Theme.spacing.xl,
  },
});
