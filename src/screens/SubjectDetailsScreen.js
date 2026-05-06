import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, GOLD, GOLD_GRAD, BLUE_GRAD, spacing } from '../theme';
import {
  ChevronRightIcon, BookIcon, ClockIcon, UsersIcon,
  CheckIcon, LockIcon, PlayIcon, SparkleIcon
} from '../components/Icons';
import Svg, { Circle, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';

const W = Dimensions.get('window').width;

const SUBJECT = {
  name: 'اللغة العربية',
  grade: 'الصف الثالث الثانوي',
  icon: 'ع',
  progress: 42,
  teacher: 'د. عبدالله المالكي',
  teacherInit: 'د.ع',
  lessonsCount: 32,
  duration: '14س 20د',
  level: 'متقدّم',
};

const LEARN_LIST = [
  'إتقان قواعد النحو والصرف وتطبيقها',
  'التحليل الأدبي للنصوص الشعرية والنثرية',
  'تنمية مهارات الإنشاء والتعبير الكتابي',
  'التعرّف على البلاغة العربية وأساليبها',
  'الاستعداد الكامل لاختبار القدرات والتحصيلي',
];

const UNITS = [
  { n: 1, title: 'التأسيس', sub: 'القواعد الأساسية في النحو والصرف', lessons: 8, paid: false, progress: 100, color: '#3A8C5A' },
  { n: 2, title: 'التطبيق', sub: 'تحليل النصوص وتطبيق القواعد', lessons: 10, paid: false, progress: 65, color: '#3A5A8C' },
  { n: 3, title: 'البلاغة والأدب', sub: 'علوم البيان والمعاني والبديع', lessons: 8, paid: true, progress: 0, color: '#8C3A7A' },
  { n: 4, title: 'الإنشاء والتعبير', sub: 'مهارات الكتابة والإبداع', lessons: 6, paid: true, progress: 0, color: '#8C6A3A' },
];

function ProgressRing({ progress = 42, size = 64 }) {
  const R = size * 0.38;
  const C = 2 * Math.PI * R;
  const dash = (progress / 100) * C;
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: [{ rotate: '-90deg' }] }}>
        <Defs>
          <SvgGradient id="sdRing" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#D4B96A" />
            <Stop offset="100%" stopColor="#8E6B1E" />
          </SvgGradient>
        </Defs>
        <Circle cx={size / 2} cy={size / 2} r={R} stroke="rgba(255,255,255,0.12)" strokeWidth="4.5" fill="none" />
        <Circle cx={size / 2} cy={size / 2} r={R} stroke="url(#sdRing)" strokeWidth="4.5"
          strokeLinecap="round" fill="none" strokeDasharray={`${dash} ${C}`} />
      </Svg>
      <Text style={styles.ringPct}>{progress}%</Text>
    </View>
  );
}

function InfoCard({ icon: Icon, label, value, color }) {
  const { t } = useTheme();
  return (
    <View style={[styles.infoCard, { backgroundColor: t.surface, borderColor: t.border }]}>
      <View style={[styles.infoIcon, { backgroundColor: color + '18' }]}>
        <Icon size={16} color={color} />
      </View>
      <Text style={[styles.infoValue, { color: t.ink }]}>{value}</Text>
      <Text style={[styles.infoLabel, { color: t.ink3 }]}>{label}</Text>
    </View>
  );
}

function UnitCard({ unit, onPress }) {
  const { t } = useTheme();
  const isLocked = unit.paid;
  const isDone = unit.progress === 100;

  return (
    <TouchableOpacity
      activeOpacity={isLocked ? 0.5 : 0.85}
      onPress={isLocked ? null : onPress}
      style={[styles.unitCard, { backgroundColor: t.surface, borderColor: t.border, opacity: isLocked ? 0.65 : 1 }]}
    >
      <View style={styles.unitLeft}>
        <LinearGradient
          colors={isLocked ? ['#2A2A3A', '#1A1A28'] : [unit.color, unit.color + 'AA']}
          style={styles.unitNum}
        >
          {isLocked
            ? <LockIcon size={14} color="rgba(255,255,255,0.6)" />
            : <Text style={styles.unitNumText}>{unit.n}</Text>
          }
        </LinearGradient>
        {isDone && (
          <View style={styles.unitDoneBadge}>
            <CheckIcon size={8} color="#fff" />
          </View>
        )}
      </View>

      <View style={{ flex: 1 }}>
        <View style={styles.unitTopRow}>
          <Text style={[styles.unitTitle, { color: t.ink }]}>{unit.title}</Text>
          {unit.paid && (
            <View style={[styles.proBadge, { backgroundColor: 'rgba(201,168,76,0.12)' }]}>
              <SparkleIcon size={8} color={GOLD} />
              <Text style={[styles.proBadgeText, { color: GOLD }]}>Pro</Text>
            </View>
          )}
        </View>
        <Text style={[styles.unitSub, { color: t.ink3 }]} numberOfLines={1}>{unit.sub}</Text>
        <View style={styles.unitMeta}>
          <BookIcon size={11} color={t.ink3} />
          <Text style={[styles.unitMetaTxt, { color: t.ink3 }]}>{unit.lessons} دروس</Text>
          {unit.progress > 0 && (
            <>
              <View style={[styles.unitDot, { backgroundColor: t.border }]} />
              <View style={[styles.unitBar, { backgroundColor: t.border }]}>
                <View style={[styles.unitFill, { width: `${unit.progress}%`, backgroundColor: unit.color }]} />
              </View>
              <Text style={[styles.unitPct, { color: t.ink3 }]}>{unit.progress}%</Text>
            </>
          )}
        </View>
      </View>
      <ChevronRightIcon size={16} color={t.ink3} />
    </TouchableOpacity>
  );
}

export default function SubjectDetailsScreen({ navigation, route }) {
  const { t } = useTheme();
  const subject = route?.params?.subject || SUBJECT;
  const insets = useSafeAreaInsets();

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
          {/* Top bar */}
          <View style={styles.topBar}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation?.goBack()} style={styles.backBtn}>
              <ChevronRightIcon size={18} color="#fff" />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={styles.topBarLabel}>SUBJECT</Text>
              <Text style={styles.topBarTitle}>تفاصيل المادة</Text>
            </View>
            <View style={{ width: 40 }} />
          </View>

          {/* Breadcrumb */}
          <View style={styles.breadcrumb}>
            <Text style={styles.breadcrumbItem}>الصفوف</Text>
            <Text style={styles.breadcrumbSep}>›</Text>
            <Text style={styles.breadcrumbItem}>الثالث الثانوي</Text>
            <Text style={styles.breadcrumbSep}>›</Text>
            <Text style={[styles.breadcrumbItem, { color: GOLD }]}>{SUBJECT.name}</Text>
          </View>

          {/* Subject pill */}
          <View style={styles.subjectPill}>
            <Text style={[styles.subjectPillText, { color: GOLD }]}>📘  {SUBJECT.name}</Text>
          </View>

          {/* Main hero content */}
          <View style={styles.heroContent}>
            <View style={{ flex: 1 }}>
              <Text style={styles.heroTitle}>{SUBJECT.name}</Text>
              <Text style={styles.heroGrade}>{SUBJECT.grade}</Text>
              <View style={styles.heroProgress}>
                <View style={[styles.heroProgressBar, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
                  <LinearGradient colors={GOLD_GRAD} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    style={[styles.heroProgressFill, { width: `${SUBJECT.progress}%` }]} />
                </View>
                <Text style={styles.heroProgressPct}>{SUBJECT.progress}%</Text>
              </View>
            </View>
            <ProgressRing progress={SUBJECT.progress} size={72} />
          </View>
        </LinearGradient>

        {/* Info cards */}
        <View style={[styles.infoRow, { paddingHorizontal: spacing.xl }]}>
          <InfoCard icon={UsersIcon} label="المدرّس" value={SUBJECT.teacher.split(' ').pop()} color="#C9A84C" />
          <InfoCard icon={BookIcon} label="درس" value={`${SUBJECT.lessonsCount}`} color="#3B82F6" />
          <InfoCard icon={ClockIcon} label="المدة" value={SUBJECT.duration} color="#22C55E" />
          <InfoCard icon={SparkleIcon} label="المستوى" value={SUBJECT.level} color="#8B5CF6" />
        </View>

        {/* What you'll learn */}
        <View style={[styles.learnCard, { marginHorizontal: spacing.xl, backgroundColor: t.surface, borderColor: t.border }]}>
          <Text style={[styles.learnTitle, { color: t.ink }]}>ماذا ستتعلّم؟</Text>
          {LEARN_LIST.map((item, i) => (
            <View key={i} style={styles.learnRow}>
              <View style={styles.learnCheck}>
                <CheckIcon size={10} color="#2a1d00" />
              </View>
              <Text style={[styles.learnText, { color: t.ink2 }]}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Units */}
        <Text style={[styles.unitsTitle, { color: t.ink, paddingHorizontal: spacing.xl }]}>الوحدات الدراسية</Text>
        <View style={[styles.unitsList, { paddingHorizontal: spacing.xl }]}>
          {UNITS.map((unit) => (
            <UnitCard
              key={unit.n}
              unit={unit}
              onPress={() => navigation?.navigate('LessonsUnits', { unit })}
            />
          ))}
        </View>

        {/* Final exam widget */}
        <LinearGradient
          colors={['#232E54', '#1A2350']}
          style={[styles.examCard, { marginHorizontal: spacing.xl, borderColor: 'rgba(201,168,76,0.2)' }]}
        >
          <View style={styles.examRow}>
            <Text style={{ fontSize: 28 }}>🏆</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.examTitle}>الاختبار النهائي</Text>
              <Text style={styles.examSub}>أكمل جميع الوحدات لفتح الاختبار</Text>
            </View>
            <View style={[styles.examLock, { backgroundColor: 'rgba(255,255,255,0.08)' }]}>
              <LockIcon size={14} color="rgba(255,255,255,0.5)" />
            </View>
          </View>
        </LinearGradient>

        {/* Enroll CTA */}
        <View style={{ paddingHorizontal: spacing.xl, marginTop: 16 }}>
          <TouchableOpacity activeOpacity={0.85}>
            <LinearGradient colors={GOLD_GRAD} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.enrollBtn}>
              <PlayIcon size={16} color="#2a1d00" />
              <Text style={styles.enrollBtnText}>ابدأ التعلّم الآن</Text>
            </LinearGradient>
          </TouchableOpacity>
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
  topBar: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  backBtn: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center', justifyContent: 'center',
  },
  topBarLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: '600', letterSpacing: 0.5 },
  topBarTitle: { color: '#fff', fontSize: 17, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold', marginTop: 1 },
  breadcrumb: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 12 },
  breadcrumbItem: { color: 'rgba(255,255,255,0.55)', fontSize: 11, fontFamily: 'Tajawal_400Regular' },
  breadcrumbSep: { color: 'rgba(255,255,255,0.3)', fontSize: 11 },
  subjectPill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,200,80,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,200,80,0.3)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 99,
    marginBottom: 12,
  },
  subjectPillText: { fontSize: 11, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold' },
  heroContent: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  heroTitle: { color: '#fff', fontSize: 22, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold' },
  heroGrade: { color: 'rgba(255,255,255,0.65)', fontSize: 13, fontFamily: 'Tajawal_400Regular', marginTop: 2, marginBottom: 12 },
  heroProgress: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  heroProgressBar: { flex: 1, height: 5, borderRadius: 3, overflow: 'hidden' },
  heroProgressFill: { height: '100%', borderRadius: 3 },
  heroProgressPct: { color: GOLD, fontSize: 12, fontWeight: '700', fontFamily: 'Tajawal_700Bold' },
  ringPct: { position: 'absolute', color: GOLD, fontSize: 14, fontWeight: '700', fontFamily: 'Tajawal_700Bold' },

  infoRow: { flexDirection: 'row', gap: 8, marginTop: 16, marginBottom: 16 },
  infoCard: {
    flex: 1, borderRadius: 14, borderWidth: 1,
    padding: 10, alignItems: 'center', gap: 4,
    shadowColor: '#141B33', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  infoIcon: {
    width: 32, height: 32, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },
  infoValue: { fontSize: 12, fontWeight: '700', fontFamily: 'Tajawal_700Bold', textAlign: 'center' },
  infoLabel: { fontSize: 10, fontFamily: 'Tajawal_400Regular', textAlign: 'center' },

  learnCard: {
    borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 16,
    shadowColor: '#141B33', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  learnTitle: { fontSize: 15, fontWeight: '700', fontFamily: 'Tajawal_700Bold', marginBottom: 12 },
  learnRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 8 },
  learnCheck: {
    width: 18, height: 18, borderRadius: 5,
    backgroundColor: GOLD, alignItems: 'center', justifyContent: 'center',
    marginTop: 2, flexShrink: 0,
  },
  learnText: { flex: 1, fontSize: 13, fontFamily: 'Tajawal_400Regular', lineHeight: 20 },

  unitsTitle: { fontSize: 15, fontWeight: '700', fontFamily: 'Tajawal_700Bold', marginBottom: 10 },
  unitsList: { gap: 10, marginBottom: 16 },
  unitCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    padding: 14, borderRadius: 16, borderWidth: 1,
    shadowColor: '#141B33', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  unitLeft: { position: 'relative', flexShrink: 0 },
  unitNum: {
    width: 44, height: 44, borderRadius: 13,
    alignItems: 'center', justifyContent: 'center',
  },
  unitNumText: { color: '#fff', fontSize: 16, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold' },
  unitDoneBadge: {
    position: 'absolute', bottom: -4, right: -4,
    width: 16, height: 16, borderRadius: 8,
    backgroundColor: '#22C55E',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#fff',
  },
  unitTopRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 3 },
  unitTitle: { fontSize: 14, fontWeight: '700', fontFamily: 'Tajawal_700Bold' },
  proBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6,
  },
  proBadgeText: { fontSize: 9, fontWeight: '700', fontFamily: 'Tajawal_700Bold' },
  unitSub: { fontSize: 11, fontFamily: 'Tajawal_400Regular', marginBottom: 6 },
  unitMeta: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  unitMetaTxt: { fontSize: 11, fontFamily: 'Tajawal_400Regular' },
  unitDot: { width: 3, height: 3, borderRadius: 1.5 },
  unitBar: { width: 50, height: 4, borderRadius: 2, overflow: 'hidden' },
  unitFill: { height: '100%', borderRadius: 2 },
  unitPct: { fontSize: 10, fontFamily: 'Tajawal_500Medium' },

  examCard: {
    borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 16,
    shadowColor: '#0F1937', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 8, elevation: 4,
  },
  examRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  examTitle: { color: '#fff', fontSize: 15, fontWeight: '700', fontFamily: 'Tajawal_700Bold' },
  examSub: { color: 'rgba(255,255,255,0.55)', fontSize: 12, fontFamily: 'Tajawal_400Regular', marginTop: 3 },
  examLock: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },

  enrollBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, height: 52, borderRadius: 16,
    shadowColor: '#C9A84C', shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35, shadowRadius: 16, elevation: 6,
  },
  enrollBtnText: { color: '#2a1d00', fontSize: 16, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold' },
});
