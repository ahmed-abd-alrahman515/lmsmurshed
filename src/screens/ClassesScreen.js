import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, GOLD, GOLD_GRAD, BLUE_GRAD, spacing, fontSize, radius } from '../theme';
import { SearchIcon, ArrowLIcon, UsersIcon, BookIcon, ChevronRightIcon } from '../components/Icons';
import SectionHeader from '../components/SectionHeader';

const W = Dimensions.get('window').width;

const FILTERS = [
  { id: 'all', label: 'الكل' },
  { id: 'primary', label: 'ابتدائي' },
  { id: 'middle', label: 'متوسط' },
  { id: 'secondary', label: 'ثانوي' },
];

const GRADES = [
  { id: 12, label: 'الصف الثاني عشر', stage: 'ثانوي', subjects: 8, students: '2.4k', featured: true },
  { id: 11, label: 'الصف الحادي عشر', stage: 'ثانوي', subjects: 8, students: '1.9k', featured: false },
  { id: 10, label: 'الصف العاشر', stage: 'ثانوي', subjects: 7, students: '2.1k', featured: false },
  { id: 9, label: 'الصف التاسع', stage: 'متوسط', subjects: 7, students: '1.6k', featured: false },
  { id: 8, label: 'الصف الثامن', stage: 'متوسط', subjects: 7, students: '1.4k', featured: false },
  { id: 7, label: 'الصف السابع', stage: 'متوسط', subjects: 6, students: '1.2k', featured: false },
];

function FilterTabs({ active, onChange }) {
  const { t } = useTheme();
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.filterRow, { paddingHorizontal: spacing.xl }]}>
      {FILTERS.map(f => (
        <TouchableOpacity
          key={f.id}
          activeOpacity={0.7}
          onPress={() => onChange(f.id)}
          style={[styles.filterChip,
            { backgroundColor: active === f.id ? GOLD : t.chip, borderColor: active === f.id ? GOLD : t.border }
          ]}
        >
          <Text style={[styles.filterText, { color: active === f.id ? '#2a1d00' : t.ink2 }]}>
            {f.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function GradeCard({ grade, onPress }) {
  const { t, isDark } = useTheme();

  if (grade.featured) {
    return (
      <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={styles.featuredWrap}>
        <LinearGradient
          colors={BLUE_GRAD}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.featuredCard}
        >
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredBadgeText}>الأكثر تفضيلاً</Text>
          </View>
          <Text style={styles.featuredLabel}>{grade.label}</Text>
          <Text style={styles.featuredStage}>{grade.stage}</Text>
          <View style={styles.featuredStats}>
            <View style={styles.statItem}>
              <BookIcon size={14} color="rgba(255,255,255,0.7)" />
              <Text style={styles.statText}>{grade.subjects} مادة</Text>
            </View>
            <View style={styles.statItem}>
              <UsersIcon size={14} color="rgba(255,255,255,0.7)" />
              <Text style={styles.statText}>{grade.students} طالب</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onPress}
            style={styles.featuredCtaWrap}
          >
            <LinearGradient
              colors={GOLD_GRAD}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.featuredCta}
            >
              <Text style={styles.featuredCtaText}>ابدأ الآن</Text>
              <ArrowLIcon size={14} color="#2a1d00" />
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.gradeRow, { backgroundColor: t.surface, borderColor: t.border }]}
    >
      <LinearGradient
        colors={['#2B3F7A', '#1A2350']}
        style={styles.gradeNum}
      >
        <Text style={styles.gradeNumText}>{grade.id}</Text>
      </LinearGradient>
      <View style={{ flex: 1 }}>
        <Text style={[styles.gradeName, { color: t.ink }]}>{grade.label}</Text>
        <View style={styles.gradeMeta}>
          <Text style={[styles.gradeStage, { color: t.ink3 }]}>{grade.stage}</Text>
          <Text style={[styles.gradeDot, { color: t.border }]}>·</Text>
          <BookIcon size={11} color={t.ink3} />
          <Text style={[styles.gradeSub, { color: t.ink3 }]}>{grade.subjects} مادة</Text>
          <Text style={[styles.gradeDot, { color: t.border }]}>·</Text>
          <UsersIcon size={11} color={t.ink3} />
          <Text style={[styles.gradeSub, { color: t.ink3 }]}>{grade.students}</Text>
        </View>
      </View>
      <ChevronRightIcon size={16} color={t.ink3} />
    </TouchableOpacity>
  );
}

export default function ClassesScreen({ navigation }) {
  const { t } = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');
  const insets = useSafeAreaInsets();

  const filtered = activeFilter === 'all' ? GRADES :
    GRADES.filter(g => {
      if (activeFilter === 'secondary') return g.stage === 'ثانوي';
      if (activeFilter === 'middle') return g.stage === 'متوسط';
      if (activeFilter === 'primary') return g.stage === 'ابتدائي';
      return true;
    });

  return (
    <View style={[styles.root, { backgroundColor: t.bg }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 12, backgroundColor: t.bg }]}>
        <Text style={[styles.screenTitle, { color: t.ink }]}>الصفوف الدراسية</Text>
        <Text style={[styles.screenSub, { color: t.ink3 }]}>اختر صفّك وابدأ رحلتك</Text>
      </View>

      {/* Search */}
      <View style={[styles.searchWrap, { paddingHorizontal: spacing.xl }]}>
        <TouchableOpacity activeOpacity={0.8} style={[styles.searchBar, { backgroundColor: t.surfaceAlt, borderColor: t.border }]}>
          <SearchIcon size={18} color={t.ink3} />
          <Text style={[styles.searchPlaceholder, { color: t.ink3 }]}>ابحث عن صف...</Text>
        </TouchableOpacity>
      </View>

      <FilterTabs active={activeFilter} onChange={setActiveFilter} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {filtered.map((g) => (
          <GradeCard
            key={g.id}
            grade={g}
            onPress={() => navigation?.navigate('GradeSubjects', { grade: g })}
          />
        ))}
        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { paddingHorizontal: spacing.xl, paddingBottom: 12 },
  screenTitle: { fontSize: 24, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold' },
  screenSub: { fontSize: 14, fontFamily: 'Tajawal_400Regular', marginTop: 2 },
  searchWrap: { marginBottom: 12 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    height: 46,
    borderRadius: 14,
    borderWidth: 1,
  },
  searchPlaceholder: { flex: 1, fontSize: 14, fontFamily: 'Tajawal_400Regular' },
  filterRow: { gap: 8, paddingBottom: 14 },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 99,
    borderWidth: 1,
  },
  filterText: { fontSize: 13, fontWeight: '600', fontFamily: 'Tajawal_700Bold' },
  list: { paddingHorizontal: spacing.xl, gap: 10 },
  featuredWrap: { borderRadius: 24, overflow: 'hidden', marginBottom: 4 },
  featuredCard: {
    padding: 20,
    borderRadius: 24,
  },
  featuredBadge: {
    alignSelf: 'flex-start',
    backgroundColor: GOLD,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 12,
  },
  featuredBadgeText: { color: '#2a1d00', fontSize: 11, fontWeight: '700', fontFamily: 'Tajawal_700Bold' },
  featuredLabel: { color: '#fff', fontSize: 22, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold' },
  featuredStage: { color: 'rgba(255,255,255,0.65)', fontSize: 13, fontFamily: 'Tajawal_400Regular', marginTop: 2 },
  featuredStats: { flexDirection: 'row', gap: 16, marginTop: 12, marginBottom: 14 },
  statItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statText: { color: 'rgba(255,255,255,0.75)', fontSize: 13, fontFamily: 'Tajawal_400Regular' },
  featuredCtaWrap: { borderRadius: 14, overflow: 'hidden' },
  featuredCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 14,
  },
  featuredCtaText: { color: '#2a1d00', fontSize: 15, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold' },
  gradeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#141B33',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  gradeNum: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  gradeNumText: { color: '#fff', fontSize: 16, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold' },
  gradeName: { fontSize: 15, fontWeight: '700', fontFamily: 'Tajawal_700Bold' },
  gradeMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  gradeStage: { fontSize: 12, fontFamily: 'Tajawal_400Regular' },
  gradeDot: { fontSize: 12 },
  gradeSub: { fontSize: 12, fontFamily: 'Tajawal_400Regular' },
});
