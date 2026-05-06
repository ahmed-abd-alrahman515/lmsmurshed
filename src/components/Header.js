import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, GOLD, spacing } from '../theme';
import BrandMark from './BrandMark';
import { MenuIcon, BellIcon } from './Icons';

export default function Header({ onBell }) {
  const { t, tr, setDrawerOpen } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8, backgroundColor: t.bg }]}>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => setDrawerOpen(true)}
          activeOpacity={0.7}
          style={[styles.iconBtn, { backgroundColor: t.surface, borderColor: t.border }]}
        >
          <MenuIcon size={20} color={t.ink} />
        </TouchableOpacity>

        <View style={styles.brand}>
          <BrandMark size={34} />
          <View style={styles.brandText}>
            <Text style={[styles.appName, { color: t.ink }]}>{tr.appName}</Text>
            <Text style={[styles.tagline, { color: t.ink3 }]}>{tr.appTagline}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={onBell}
          activeOpacity={0.7}
          style={[styles.iconBtn, { backgroundColor: t.surface, borderColor: t.border }]}
        >
          <BellIcon size={20} color={t.ink} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: spacing.md, paddingHorizontal: spacing.xl },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBtn: {
    width: 42, height: 42, borderRadius: 14, borderWidth: 1,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#141B33', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  brand: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  brandText: { alignItems: 'center' },
  appName: { fontSize: 18, fontWeight: '900', fontFamily: 'Tajawal_800ExtraBold', letterSpacing: -0.2, lineHeight: 22 },
  tagline: { fontSize: 9.5, fontWeight: '600', fontFamily: 'Tajawal_500Medium', letterSpacing: 0.2, marginTop: 1 },
  badge: {
    position: 'absolute', top: -4, right: -4,
    width: 16, height: 16, borderRadius: 8,
    backgroundColor: '#EF4444', alignItems: 'center', justifyContent: 'center',
  },
  badgeText: { color: '#fff', fontSize: 9, fontWeight: '700' },
});
