import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, GOLD, GOLD_GRAD, BLUE_GRAD, spacing } from '../theme';
import {
  ChevronRightIcon, ChevronDownIcon, PlayIcon, BookIcon,
  CheckIcon, LockIcon, ClockIcon, DownloadIcon, SparkleIcon
} from '../components/Icons';

const W = Dimensions.get('window').width;

const UNITS = [
  {
    n: 1,
    title: 'التأسيس',
    sub: 'القواعد الأساسية في النحو والصرف',
    progress: 100,
    paid: false,
    color: '#3A8C5A',
    lessons: [
      { n: 1, title: 'مدخل إلى علم النحو', dur: '12:30', type: 'video', status: 'done' },
      { n: 2, title: 'أقسام الكلام', dur: '15:42', type: 'video', status: 'done' },
      { n: 3, title: 'اختبار الوحدة الأولى', dur: '20د', type: 'test', status: 'done' },
    ],
  },
  {
    n: 2,
    title: 'التطبيق',
    sub: 'تحليل النصوص وتطبيق القواعد',
    progress: 65,
    paid: false,
    color: '#3A5A8C',
    lessons: [
      { n: 4, title: 'تحليل القصيدة الجاهلية', dur: '18:24', type: 'video', status: 'done' },
      { n: 5, title: 'الإعراب التطبيقي', dur: '22:10', type: 'video', status: 'current' },
      { n: 6, title: 'ملخص الوحدة (PDF)', dur: '4 صفحات', type: 'file', status: 'free' },
      { n: 7, title: 'اختبار الوحدة الثانية', dur: '25د', type: 'test', status: 'open' },
    ],
  },
  {
    n: 3,
    title: 'البلاغة والأدب',
    sub: 'علوم البيان والمعاني والبديع',
    progress: 0,
    paid: true,
    color: '#8C3A7A',
    lessons: [
      { n: 8, title: 'علم البيان — التشبيه', dur: '16:20', type: 'video', status: 'locked' },
      { n: 9, title: 'الاستعارة والكناية', dur: '14:55', type: 'video', status: 'locked' },
    ],
  },
  {
    n: 4,
    title: 'الإنشاء والتعبير',
    sub: 'مهارات الكتابة والإبداع',
    progress: 0,
    paid: true,
    color: '#8C6A3A',
    lessons: [],
  },
];

const STATUS_CONFIG = {
  done:    { icon: CheckIcon,  bg: '#22C55E18', iconColor: '#22C55E',  border: '#22C55E30' },
  current: { icon: PlayIcon,   bg: '#3B82F618', iconColor: '#3B82F6',  border: '#3B82F630' },
  locked:  { icon: LockIcon,   bg: '#6B728018', iconColor: '#6B7280',  border: '#6B728030' },
  free:    { icon: DownloadIcon, bg: '#C9A84C18', iconColor: GOLD,     border: '#C9A84C30' },
  open:    { icon: PlayIcon,   bg: '#8B5CF618', iconColor: '#8B5CF6',  border: '#8B5CF630' },
};

function LessonRow({ lesson, onPress }) {
  const { t } = useTheme();
  const st = STATUS_CONFIG[lesson.status] || STATUS_CONFIG.open;
  const Icon = st.icon;
  const isLocked = lesson.status === 'locked';
  const isCurrent = lesson.status === 'current';

  return (
    <TouchableOpacity
      activeOpacity={isLocked ? 0.5 : 0.8}
      onPress={isLocked ? null : onPress}
      style={[
        styles.lessonRow,
        { borderColor: isCurrent ? '#3B82F640' : t.border },
        isCurrent && { backgroundColor: '#3B82F608' },
      ]}
    >
      {/* Status icon */}
      <View style={[styles.lessonIcon, { backgroundColor: st.bg, borderColor: st.border }]}>
        <Icon size={12} color={st.iconColor} />
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={[styles.lessonTitle, { color: isLocked ? t.ink3 : t.ink }]}
          numberOfLines={1}
        >
          {lesson.title}
        </Text>
        <View style={styles.lessonMeta}>
          <Text style={[styles.lessonType, { color: t.ink3 }]}>
            {lesson.type === 'video' ? 'فيديو' : lesson.type === 'test' ? 'اختبار' : 'ملف'}
          </Text>
          <Text style={[styles.lessonDot, { color: t.border }]}>·</Text>
          <ClockIcon size={10} color={t.ink3} />
          <Text style={[styles.lessonDur, { color: t.ink3 }]}>{lesson.dur}</Text>
        </View>
      </View>

      {lesson.status === 'free' && (
        <View style={[styles.freeTag, { backgroundColor: 'rgba(201,168,76,0.12)' }]}>
          <Text style={[styles.freeTagText, { color: GOLD }]}>مجاني</Text>
        </View>
      )}
      {isCurrent && (
        <LinearGradient colors={GOLD_GRAD} style={styles.currentTag}>
          <Text style={styles.currentTagText}>جاري</Text>
        </LinearGradient>
      )}
    </TouchableOpacity>
  );
}

function UnitAccordion({ unit, isOpen, onToggle, onLessonPress }) {
  const { t } = useTheme();
  const isDone = unit.progress === 100;

  return (
    <View style={[styles.unitWrap, { borderColor: t.border, backgroundColor: t.surface }]}>
      {/* Unit Header */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onToggle}
        style={styles.unitHeader}
      >
        <LinearGradient
          colors={unit.paid ? ['#2A2A3A', '#1A1A28'] : [unit.color, unit.color + 'BB']}
          style={styles.unitCircle}
        >
          {unit.paid
            ? <LockIcon size={13} color="rgba(255,255,255,0.5)" />
            : <Text style={styles.unitCircleText}>{unit.n}</Text>
          }
        </LinearGradient>

        <View style={{ flex: 1 }}>
          <View style={styles.unitTitleRow}>
            <Text style={[styles.unitTitle, { color: t.ink }]}>{unit.title}</Text>
            {unit.paid && (
              <View style={[styles.proBadge, { backgroundColor: 'rgba(201,168,76,0.1)' }]}>
                <SparkleIcon size={8} color={GOLD} />
                <Text style={[styles.proBadgeText, { color: GOLD }]}>Pro</Text>
              </View>
            )}
            {isDone && !unit.paid && (
              <View style={[styles.doneBadge, { backgroundColor: '#22C55E18' }]}>
                <CheckIcon size={8} color="#22C55E" />
                <Text style={[styles.doneBadgeText, { color: '#22C55E' }]}>مكتمل</Text>
              </View>
            )}
          </View>
          <Text style={[styles.unitSub, { color: t.ink3 }]} numberOfLines={1}>{unit.sub}</Text>
          {unit.progress > 0 && !unit.paid && (
            <View style={styles.unitProgressRow}>
              <View style={[styles.unitBar, { backgroundColor: t.border }]}>
                <View style={[styles.unitFill, { width: `${unit.progress}%`, backgroundColor: unit.color }]} />
              </View>
              <Text style={[styles.unitPct, { color: t.ink3 }]}>{unit.progress}%</Text>
            </View>
          )}
        </View>

        <ChevronDownIcon
          size={16}
          color={t.ink3}
          style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }}
        />
      </TouchableOpacity>

      {/* Lessons */}
      {isOpen && unit.lessons.length > 0 && (
        <View style={[styles.lessonsList, { borderTopColor: t.border }]}>
          {unit.lessons.map((lesson) => (
            <LessonRow
              key={lesson.n}
              lesson={lesson}
              onPress={() => onLessonPress(lesson)}
            />
          ))}
        </View>
      )}

      {isOpen && unit.lessons.length === 0 && (
        <View style={[styles.emptyUnit, { borderTopColor: t.border }]}>
          <Text style={[styles.emptyText, { color: t.ink3 }]}>لا توجد دروس متاحة بعد</Text>
        </View>
      )}
    </View>
  );
}

export default function LessonsUnitsScreen({ navigation, route }) {
  const { t } = useTheme();
  const insets = useSafeAreaInsets();
  const [openUnits, setOpenUnits] = useState({ 1: false, 2: true, 3: false, 4: false });

  const toggleUnit = (n) => setOpenUnits(prev => ({ ...prev, [n]: !prev[n] }));

  const totalLessons = UNITS.reduce((acc, u) => acc + u.lessons.length, 0);
  const doneLessons = UNITS.reduce((acc, u) =>
    acc + u.lessons.filter(l => l.status === 'done').length, 0);

  return (
    <View style={[styles.root, { backgroundColor: t.bg }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Hero */}
        <LinearGradient
          colors={BLUE_GRAD}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.4, y: 1 }}
          style={[styles.hero, { paddingTop: insets.top + 12 }]}
        >
          <View style={styles.topBar}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation?.goBack()} style={styles.backBtn}>
              <ChevronRightIcon size={18} color="#fff" />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={styles.topBarLabel}>UNITS · LESSONS</Text>
              <Text style={styles.topBarTitle}>الدروس والوحدات</Text>
            </View>
            <View style={{ width: 40 }} />
          </View>

          {/* Subject pill */}
          <View style={styles.subjectPill}>
            <Text style={[styles.subjectPillText, { color: GOLD }]}>📘  اللغة العربية</Text>
          </View>

          {/* Progress summary */}
          <View style={styles.heroProgress}>
            <View style={{ flex: 1 }}>
              <Text style={styles.heroProgressLabel}>التقدّم الكلي</Text>
              <View style={[styles.heroPBar, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
                <LinearGradient colors={GOLD_GRAD} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  style={[styles.heroPFill, { width: '42%' }]} />
              </View>
            </View>
            <Text style={styles.heroPPct}>42%</Text>
          </View>

          {/* Mini stats */}
          <View style={styles.heroStats}>
            {[
              { v: `${doneLessons}/${totalLessons}`, l: 'دروس مكتملة' },
              { v: `${UNITS.filter(u => !u.paid).length}`, l: 'وحدات مجانية' },
              { v: '14س', l: 'إجمالي المدة' },
            ].map((s, i) => (
              <View key={i} style={styles.heroStat}>
                <Text style={styles.heroStatV}>{s.v}</Text>
                <Text style={styles.heroStatL}>{s.l}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        {/* Units accordion */}
        <View style={[styles.unitsContainer, { paddingHorizontal: spacing.xl }]}>
          {UNITS.map((unit) => (
            <UnitAccordion
              key={unit.n}
              unit={unit}
              isOpen={openUnits[unit.n]}
              onToggle={() => toggleUnit(unit.n)}
              onLessonPress={(lesson) => navigation?.navigate('LessonPlayer', { lesson })}
            />
          ))}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingBottom: 20 },

  hero: { paddingHorizontal: spacing.xl, paddingBottom: 20 },
  topBar: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
  backBtn: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center', justifyContent: 'center',
  },
  topBarLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 9, fontWeight: '600', letterSpacing: 0.5 },
  topBarTitle: { color: '#fff', fontSize: 17, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold', marginTop: 1 },

  subjectPill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,200,80,0.15)',
    borderWidth: 1, borderColor: 'rgba(255,200,80,0.3)',
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 99, marginBottom: 14,
  },
  subjectPillText: { fontSize: 11, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold' },

  heroProgress: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  heroProgressLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11, fontFamily: 'Tajawal_400Regular', marginBottom: 6 },
  heroPBar: { height: 5, borderRadius: 3, overflow: 'hidden' },
  heroPFill: { height: '100%', borderRadius: 3 },
  heroPPct: { color: GOLD, fontSize: 20, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold' },

  heroStats: { flexDirection: 'row', gap: 8 },
  heroStat: {
    flex: 1, alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12, paddingVertical: 8,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
  },
  heroStatV: { color: GOLD, fontSize: 14, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold' },
  heroStatL: { color: 'rgba(255,255,255,0.55)', fontSize: 10, fontFamily: 'Tajawal_400Regular', marginTop: 2 },

  unitsContainer: { gap: 10, paddingTop: 16 },

  unitWrap: {
    borderRadius: 16, borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#141B33', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  unitHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 },
  unitCircle: {
    width: 44, height: 44, borderRadius: 13,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  unitCircleText: { color: '#fff', fontSize: 16, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold' },
  unitTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 3 },
  unitTitle: { fontSize: 14, fontWeight: '700', fontFamily: 'Tajawal_700Bold' },
  proBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6,
  },
  proBadgeText: { fontSize: 9, fontWeight: '700', fontFamily: 'Tajawal_700Bold' },
  doneBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6,
  },
  doneBadgeText: { fontSize: 9, fontWeight: '600', fontFamily: 'Tajawal_700Bold' },
  unitSub: { fontSize: 11, fontFamily: 'Tajawal_400Regular' },
  unitProgressRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  unitBar: { flex: 1, height: 4, borderRadius: 2, overflow: 'hidden' },
  unitFill: { height: '100%', borderRadius: 2 },
  unitPct: { fontSize: 10, fontFamily: 'Tajawal_500Medium' },

  lessonsList: { borderTopWidth: 1 },
  lessonRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 14, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: 'transparent',
  },
  lessonIcon: {
    width: 28, height: 28, borderRadius: 9,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, flexShrink: 0,
  },
  lessonTitle: { fontSize: 13, fontWeight: '600', fontFamily: 'Tajawal_700Bold' },
  lessonMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  lessonType: { fontSize: 10, fontFamily: 'Tajawal_400Regular' },
  lessonDot: { fontSize: 10 },
  lessonDur: { fontSize: 10, fontFamily: 'Tajawal_400Regular' },
  freeTag: {
    paddingHorizontal: 7, paddingVertical: 3, borderRadius: 7,
  },
  freeTagText: { fontSize: 10, fontWeight: '600', fontFamily: 'Tajawal_700Bold' },
  currentTag: {
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 7,
  },
  currentTagText: { color: '#2a1d00', fontSize: 10, fontWeight: '700', fontFamily: 'Tajawal_700Bold' },

  emptyUnit: { borderTopWidth: 1, padding: 16, alignItems: 'center' },
  emptyText: { fontSize: 13, fontFamily: 'Tajawal_400Regular' },
});
