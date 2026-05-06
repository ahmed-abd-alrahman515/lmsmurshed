import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme, spacing, fontSize } from '../theme';
import { GOLD } from '../theme/colors';

export default function SectionHeader({ title, subtitle, action, onAction }) {
  const { t } = useTheme();
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <Text style={[styles.title, { color: t.ink }]}>{title}</Text>
        {subtitle ? <Text style={[styles.sub, { color: t.ink3 }]}>{subtitle}</Text> : null}
      </View>
      {action ? (
        <TouchableOpacity onPress={onAction} activeOpacity={0.7}>
          <Text style={[styles.action, { color: GOLD }]}>{action}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
  },
  left: { flex: 1 },
  title: {
    fontSize: fontSize.lg,
    fontWeight: '800',
    fontFamily: 'Tajawal_800ExtraBold',
    writingDirection: 'rtl',
  },
  sub: {
    fontSize: fontSize.sm,
    marginTop: 2,
    fontFamily: 'Tajawal_400Regular',
  },
  action: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    fontFamily: 'Tajawal_700Bold',
  },
});
