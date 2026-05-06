import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, GOLD, GOLD_GRAD, BLUE_GRAD, spacing } from '../theme';
import { SearchIcon, ArrowLIcon, ChevronRightIcon, BookIcon, ClockIcon, UsersIcon, LockIcon, CheckIcon } from '../components/Icons';

const W = Dimensions.get('window').width;

const SUBJECTS = [
  { id: 1, name: 'الرياضيات', teacher: 'أ. سارة المهدي', lessons: 24, hours: '18 ساعة', status: 'doing', progress: 72, emoji: '∫' },
  { id: 2, name: 'الفيزياء', teacher: 'أ. محمد عثمان', lessons: 18, hours: '14 ساعة', status: 'new', progress: 0, emoji: '⚛' },
  { id: 3, name: 'الكيمياء', teacher: 'أ. فاطمة النور', lessons: 16, hours: '12 ساعة', status: 'locked', progress: 0, emoji: '⚗' },
  { id: 4, name: 'الأحياء', teacher: 'أ. عمر الشيخ', lessons: 20, hours: '15 ساعة', status: 'done', progress: 100, emoji: '🧬' },
  { id: 5, name: 'اللغة العربية', teacher: 'أ. نور الهدى', lessons: 30, hours: '22 ساعة', status: 'doing', progress: 45, emoji: 'ع' },
  { id: 6, name: 'التاريخ', teacher: 'أ. خالد البشير', lessons: 14, hours: '10 ساعة', status: 'new', progress: 0, emoji: '🏛' },
  { id: 7, name: 'الجغرافيا', teacher: 'أ. إيمان حسن', lessons: 12, hours: '9 ساعة', status: 'locked', progress: 0, emoji: '🌍' },
  { id: 8, name: 'الإنجليزية', teacher: 'أ. آدم محمود', lessons: 26, hours: '20 ساعة', status: 'doing', progress: 31, emoji: 'A' },
];

const STATUS_CONFIG = {
  doing: { label: 'جاري', bg: 'rgba(59,130,246,0.12)', color: '#3B82F6', dotColor: '#3B82F6' },
  new: { label: 'جديد', bg: 'rgba(34,197,94,0.12)', color: '#22C55E', dotColor: '#22C55E' },
  done: { label: 'مكتمل', bg: 'rgba(201,168,76,0.15)', color: GOLD, dotColor: GOLD },
  locked: { label: 'مقفول', bg: 'rgba(150,150,160,0.1)', color: '#9CA3AF', dotColor: '#9CA3AF' },
};

function SubjectCard({ subject, onPress }) {
  const { t } = useTheme();
  const st = STATUS_CONFIG[subject.status] || STATUS_CONFIG.new;
  const isLocked = subject.status === 'locked';

  return (
    <TouchableOpacity
      activeOpacity={isLocked ? 0.5 : 0.85}
      onPress={isLocked ? null : onPress}
      style={[styles.subjectCard, { backgroundColor: t.surface, borderColor: t.border, opacity: isLocked ? 0.6 : 1 }]}
    >
      <View style={[styles.subjectCoverWrap]}>
        <LinearGradient
          colors={isLocked ? ['#2A2A3A', '#1A1A2A'] : BLUE_GRAD}
          style={styles.subjectCover}
        >
          <Text style={styles.subjectEmoji}>{subject.emoji}</Text>
          {isLocked && (
            <View style={styles.lockOverlay}>
              <LockIcon size={18} color="rgba(255,255,255,0.6)" />
            </View>
          )}
        </LinearGradient>
      </View>

      <View style={styles.subjectBody}>
        <View style={styles.subjectTopRow}>
          <Text style={[styles.subjectName, { color: t.ink }]} numberOfLines={1}>{subject.name}</Text>
          <View style={[styles.statusBadge, { backgroundColor: st.bg }]}>
            <View style={[styles.statusDot, { backgroundColor: st.dotColor }]} />
            <Text style={[styles.statusText, { color: st.color }]}>{st.label}</Text>
          </View>
        </View>
        <Text style={[styles.subjectTeacher, { color: t.ink3 }]}>{subject.teacher}</Text>
        <View style={styles.subjectMeta}>
          <BookIcon size={11} color={t.ink3} />
          <Text style={[styles.subjectMetaTxt, { color: t.ink3 }]}>{subject.lessons} درس</Text>
          <Text style={[styles.dot, { color: t.border }]}>·</Text>
          <ClockIcon size={11} color={t.ink3} />
          <Text style={[styles.subjectMetaTxt, { color: t.ink3 }]}>{subject.hours}</Text>
        </View>
        {subject.status === 'doing' && (
          <View style={styles.progressWrap}>
            <View style={[styles.progressBar, { backgroundColor: t.border }]}>
              <View style={[styles.progressFill, { width: `${subject.progress}%`, backgroundColor: '#3B82F6' }]} />
            </View>
            <Text style={[styles.progressPct, { color: t.ink3 }]}>{subject.progress}%</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function GradeSubjectsScreen({ navigation, route }) {
  const { t } = useTheme();
  const grade = route?.params?.grade || { id: 12, label: 'الصف الثاني عشر', stage: 'ثانوي' };
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { backgroundColor: t.bg }]}>
      {/* Hero */}
      <LinearGradient
        colors={BLUE_GRAD}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={[styles.hero, { paddingTop: insets.top + 12 }]}
      >
        {/* Back */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation?.goBack()}
          style={styles.backBtn}
        >
          <ChevronRightIcon size={20} color="#fff" />
        </TouchableOpacity>

        <View style={styles.heroContent}>
          <View style={styles.heroBreadcrumb}>
            <Text style={styles.breadcrumbText}>الصفوف</Text>
            <Text style={styles.breadcrumbSep}>›</Text>
            <Text style={[styles.breadcrumbText, { color: GOLD }]}>{grade.label}</Text>
          </View>
          <Text style={styles.heroTitle}>{grade.label}</Text>
          <Text style={styles.heroSub}>{grade.stage} · {SUBJECTS.length} مواد</Text>

          {/* Stats */}
          <View style={styles.heroStats}>
            {[
              { v: SUBJECTS.filter(s => s.status === 'done').length, l: 'مكتمل' },
              { v: SUBJECTS.filter(s => s.status === 'doing').length, l: 'جاري' },
              { v: SUBJECTS.filter(s => s.status === 'locked').length, l: 'مقفول' },
            ].map((s, i) => (
              <View key={i} style={styles.heroStat}>
                <Text style={styles.heroStatV}>{s.v}</Text>
                <Text style={styles.heroStatL}>{s.l}</Text>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>

      {/* Search */}
      <View style={[styles.searchWrap, { paddingHorizontal: spacing.xl, paddingTop: 12, paddingBottom: 8 }]}>
        <TouchableOpacity activeOpacity={0.8} style={[styles.searchBar, { backgroundColor: t.surfaceAlt, borderColor: t.border }]}>
          <SearchIcon size={18} color={t.ink3} />
          <Text style={[styles.searchPlaceholder, { color: t.ink3 }]}>ابحث عن مادة...</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {SUBJECTS.map((s) => (
          <SubjectCard
            key={s.id}
            subject={s}
            onPress={() => navigation?.navigate('SubjectDetails', { subject: s })}
          />
        ))}
        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  hero: { paddingHorizontal: spacing.xl, paddingBottom: 20 },
  backBtn: {
    alignSelf: 'flex-start',
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  heroContent: {},
  heroBreadcrumb: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  breadcrumbText: { color: 'rgba(255,255,255,0.65)', fontSize: 12, fontFamily: 'Tajawal_400Regular' },
  breadcrumbSep: { color: 'rgba(255,255,255,0.4)', fontSize: 12 },
  heroTitle: { color: '#fff', fontSize: 26, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold' },
  heroSub: { color: 'rgba(255,255,255,0.65)', fontSize: 13, fontFamily: 'Tajawal_400Regular', marginTop: 2, marginBottom: 14 },
  heroStats: { flexDirection: 'row', gap: 12 },
  heroStat: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  heroStatV: { color: GOLD, fontSize: 20, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold' },
  heroStatL: { color: 'rgba(255,255,255,0.6)', fontSize: 11, fontFamily: 'Tajawal_400Regular', marginTop: 2 },
  searchWrap: {},
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 14, height: 46, borderRadius: 14, borderWidth: 1,
  },
  searchPlaceholder: { flex: 1, fontSize: 14, fontFamily: 'Tajawal_400Regular' },
  list: { paddingHorizontal: spacing.xl, gap: 10 },
  subjectCard: {
    flexDirection: 'row',
    gap: 12,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#141B33',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  subjectCoverWrap: { flexShrink: 0 },
  subjectCover: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subjectEmoji: { fontSize: 22, color: 'rgba(255,255,255,0.7)' },
  lockOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subjectBody: { flex: 1 },
  subjectTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 },
  subjectName: { fontSize: 14, fontWeight: '700', fontFamily: 'Tajawal_700Bold', flex: 1 },
  statusBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8,
  },
  statusDot: { width: 5, height: 5, borderRadius: 2.5 },
  statusText: { fontSize: 10, fontWeight: '600', fontFamily: 'Tajawal_700Bold' },
  subjectTeacher: { fontSize: 11, fontFamily: 'Tajawal_400Regular', marginBottom: 4 },
  subjectMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  subjectMetaTxt: { fontSize: 11, fontFamily: 'Tajawal_400Regular' },
  dot: { fontSize: 11 },
  progressWrap: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  progressBar: { flex: 1, height: 4, borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 2 },
  progressPct: { fontSize: 10, fontFamily: 'Tajawal_500Medium', width: 28, textAlign: 'right' },
});
