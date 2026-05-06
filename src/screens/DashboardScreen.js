import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, GOLD, GOLD_GRAD, BLUE_GRAD, spacing } from '../theme';
import { GOLD_DEEP } from '../theme/colors';
import Avatar from '../components/Avatar';
import SectionHeader from '../components/SectionHeader';
import { FlameIcon, BookIcon, CheckIcon, TrophyIcon, ClockIcon, ChevronRightIcon, PlayIcon } from '../components/Icons';
import Svg, { Circle, Path, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';

const W = Dimensions.get('window').width;

const STAT_CARDS = [
  { label: 'أيام التعلّم', value: '18', unit: 'يوم', icon: FlameIcon, bg: ['#C9A84C', '#8E6B1E'], textColor: '#2a1d00' },
  { label: 'الدروس المكتملة', value: '47', unit: 'درس', icon: CheckIcon, bg: ['#2B3F7A', '#111A3A'], textColor: '#fff' },
  { label: 'ساعات التعلّم', value: '36', unit: 'ساعة', icon: ClockIcon, bg: ['#1A4A2A', '#0D2615'], textColor: '#fff' },
  { label: 'النقاط الكلية', value: '2,840', unit: 'XP', icon: TrophyIcon, bg: ['#4A1A2E', '#2A0D1A'], textColor: '#fff' },
];

const SUBJECTS = [
  { name: 'الرياضيات', progress: 72, color: '#C9A84C' },
  { name: 'الفيزياء', progress: 54, color: '#4A8C6A' },
  { name: 'الكيمياء', progress: 38, color: '#6A4A8C' },
  { name: 'العربي', progress: 81, color: '#8C6A4A' },
];

const TIMELINE = [
  { time: '09:00', action: 'أكملت درس المشتقات', subject: 'رياضيات', points: '+30 XP', emoji: '✓' },
  { time: '10:30', action: 'بدأت وحدة الكهرومغناطيسية', subject: 'فيزياء', points: '+10 XP', emoji: '▶' },
  { time: '14:00', action: 'اجتزت اختبار الوحدة الثانية', subject: 'كيمياء', points: '+50 XP', emoji: '🏆' },
];

function WeeklyRing({ progress = 72, size = 96 }) {
  const R = 36;
  const C = 2 * Math.PI * R;
  const dash = (progress / 100) * C;
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: [{ rotate: '-90deg' }] }}>
        <Defs>
          <SvgGradient id="weekRing" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#D4B96A" />
            <Stop offset="100%" stopColor="#8E6B1E" />
          </SvgGradient>
        </Defs>
        <Circle cx={size / 2} cy={size / 2} r={R} stroke="rgba(201,168,76,0.15)" strokeWidth="7" fill="none" />
        <Circle cx={size / 2} cy={size / 2} r={R} stroke="url(#weekRing)" strokeWidth="7"
          strokeLinecap="round" fill="none" strokeDasharray={`${dash} ${C}`} />
      </Svg>
      <Text style={styles.ringPct}>{progress}%</Text>
      <Text style={styles.ringLabel}>الهدف</Text>
    </View>
  );
}

function StatCard({ card }) {
  const Icon = card.icon;
  return (
    <LinearGradient colors={card.bg} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.statCard}>
      <Icon size={16} color={card.textColor === '#fff' ? 'rgba(255,255,255,0.7)' : 'rgba(42,29,0,0.7)'} />
      <Text style={[styles.statValue, { color: card.textColor }]}>{card.value}</Text>
      <Text style={[styles.statUnit, { color: card.textColor === '#fff' ? 'rgba(255,255,255,0.65)' : 'rgba(42,29,0,0.65)' }]}>{card.unit}</Text>
      <Text style={[styles.statLabel, { color: card.textColor === '#fff' ? 'rgba(255,255,255,0.55)' : 'rgba(42,29,0,0.55)' }]}>{card.label}</Text>
    </LinearGradient>
  );
}

export default function DashboardScreen({ navigation }) {
  const { t, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { backgroundColor: t.bg }]}>
      <View style={[styles.header, { paddingTop: insets.top + 12, backgroundColor: t.bg }]}>
        <View style={styles.headerRow}>
          <View>
            <Text style={[styles.screenTitle, { color: t.ink }]}>لوحة التحكّم</Text>
            <Text style={[styles.screenSub, { color: t.ink3 }]}>تابع تقدّمك اليومي</Text>
          </View>
          <Avatar name="أ" size={42} hue={50} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Stat cards 2x2 */}
        <View style={[styles.statGrid, { paddingHorizontal: spacing.xl }]}>
          {STAT_CARDS.map((c, i) => <StatCard key={i} card={c} />)}
        </View>

        {/* Current plan */}
        <View style={[styles.planCard, { marginHorizontal: spacing.xl, backgroundColor: t.surface, borderColor: t.border }]}>
          <View style={styles.planRow}>
            <View>
              <Text style={[styles.planLabel, { color: t.ink3 }]}>الخطة الحالية</Text>
              <Text style={[styles.planName, { color: t.ink }]}>Pro · شهري</Text>
            </View>
            <LinearGradient colors={GOLD_GRAD} style={styles.planBadge}>
              <Text style={styles.planBadgeText}>PRO</Text>
            </LinearGradient>
          </View>
          <View style={[styles.planBar, { backgroundColor: t.border }]}>
            <LinearGradient colors={GOLD_GRAD} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={[styles.planFill, { width: '65%' }]} />
          </View>
          <Text style={[styles.planSub, { color: t.ink3 }]}>65% من محتوى الخطة مكتمل</Text>
        </View>

        {/* Continue learning */}
        <SectionHeader title="كمّل من حيث توقّفت" />
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation?.navigate('LessonPlayer')}
          style={[styles.continueCard, { marginHorizontal: spacing.xl, borderColor: 'rgba(201,168,76,0.2)' }]}
        >
          <LinearGradient colors={BLUE_GRAD} style={styles.continueInner}>
            <View style={styles.continueLeft}>
              <Text style={styles.continueSub}>الدرس الحالي</Text>
              <Text style={styles.continueTitle}>المشتقات الجزئية</Text>
              <Text style={styles.continueMeta}>التفاضل والتكامل · الوحدة 3</Text>
              <LinearGradient colors={GOLD_GRAD} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={styles.continueBtn}>
                <PlayIcon size={14} color="#2a1d00" />
                <Text style={styles.continueBtnText}>استكمال</Text>
              </LinearGradient>
            </View>
            <View style={styles.continueRight}>
              <View style={styles.continueProg}>
                <Text style={styles.continueProgPct}>68%</Text>
                <Text style={styles.continueProgLabel}>مكتمل</Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Subject progress */}
        <SectionHeader title="تقدّم المواد" action="التفاصيل" />
        <View style={[styles.subjectsCard, { marginHorizontal: spacing.xl, backgroundColor: t.surface, borderColor: t.border }]}>
          {SUBJECTS.map((s, i) => (
            <View key={i} style={[styles.subjectRow, i < SUBJECTS.length - 1 && { borderBottomWidth: 1, borderBottomColor: t.border }]}>
              <Text style={[styles.subjectName, { color: t.ink }]}>{s.name}</Text>
              <View style={[styles.subjectBar, { backgroundColor: t.border }]}>
                <View style={[styles.subjectFill, { width: `${s.progress}%`, backgroundColor: s.color }]} />
              </View>
              <Text style={[styles.subjectPct, { color: t.ink3 }]}>{s.progress}%</Text>
            </View>
          ))}
        </View>

        {/* Gamification */}
        <SectionHeader title="مستوى اللعبة" />
        <LinearGradient
          colors={['#232E54', '#1A2350']}
          style={[styles.gamCard, { marginHorizontal: spacing.xl }]}
        >
          <View style={styles.gamRow}>
            <View>
              <LinearGradient colors={GOLD_GRAD} style={styles.levelBadge}>
                <Text style={styles.levelText}>Lv.5</Text>
              </LinearGradient>
              <Text style={styles.gamName}>مستكشف متقدّم</Text>
              <Text style={styles.gamSub}>أحمد الحارثي</Text>
            </View>
            <WeeklyRing progress={72} />
          </View>
        </LinearGradient>

        {/* Activity timeline */}
        <SectionHeader title="نشاط اليوم" />
        <View style={[styles.timelineCard, { marginHorizontal: spacing.xl, backgroundColor: t.surface, borderColor: t.border }]}>
          {TIMELINE.map((item, i) => (
            <View key={i} style={[styles.timelineRow, i < TIMELINE.length - 1 && styles.timelineSep]}>
              <View style={styles.timelineLeft}>
                <Text style={styles.timelineEmoji}>{item.emoji}</Text>
                {i < TIMELINE.length - 1 && <View style={[styles.timelineLine, { backgroundColor: t.border }]} />}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.timelineAction, { color: t.ink }]}>{item.action}</Text>
                <View style={styles.timelineMeta}>
                  <Text style={[styles.timelineSubject, { color: t.ink3 }]}>{item.subject}</Text>
                  <Text style={[styles.timelineDot, { color: t.border }]}>·</Text>
                  <Text style={[styles.timelineTime, { color: t.ink3 }]}>{item.time}</Text>
                </View>
              </View>
              <Text style={[styles.timelinePoints, { color: GOLD }]}>{item.points}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { paddingHorizontal: spacing.xl, paddingBottom: 12 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  screenTitle: { fontSize: 24, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold' },
  screenSub: { fontSize: 14, fontFamily: 'Tajawal_400Regular', marginTop: 2 },
  scroll: { paddingBottom: 20 },

  statGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  statCard: {
    width: (W - spacing.xl * 2 - 10) / 2,
    padding: 14,
    borderRadius: 16,
    gap: 2,
    shadowColor: '#141B33',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  statValue: { fontSize: 22, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold', marginTop: 4 },
  statUnit: { fontSize: 12, fontFamily: 'Tajawal_500Medium' },
  statLabel: { fontSize: 11, fontFamily: 'Tajawal_400Regular', marginTop: 2 },

  planCard: {
    padding: 16, borderRadius: 16, borderWidth: 1, marginBottom: 16,
    shadowColor: '#141B33', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  planRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  planLabel: { fontSize: 11, fontFamily: 'Tajawal_400Regular' },
  planName: { fontSize: 16, fontWeight: '700', fontFamily: 'Tajawal_700Bold', marginTop: 2 },
  planBadge: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 8 },
  planBadgeText: { color: '#2a1d00', fontSize: 12, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold' },
  planBar: { height: 6, borderRadius: 3, overflow: 'hidden', marginBottom: 6 },
  planFill: { height: '100%', borderRadius: 3 },
  planSub: { fontSize: 12, fontFamily: 'Tajawal_400Regular' },

  continueCard: {
    borderRadius: 20, overflow: 'hidden', borderWidth: 1, marginBottom: 16,
    shadowColor: '#0F1937', shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2, shadowRadius: 16, elevation: 6,
  },
  continueInner: { flexDirection: 'row', padding: 16, gap: 12 },
  continueLeft: { flex: 1 },
  continueSub: { color: 'rgba(255,255,255,0.6)', fontSize: 11, fontFamily: 'Tajawal_400Regular' },
  continueTitle: { color: '#fff', fontSize: 17, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold', marginTop: 4 },
  continueMeta: { color: 'rgba(255,255,255,0.6)', fontSize: 12, fontFamily: 'Tajawal_400Regular', marginTop: 4, marginBottom: 12 },
  continueBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    alignSelf: 'flex-start', paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 10,
  },
  continueBtnText: { color: '#2a1d00', fontSize: 13, fontWeight: '700', fontFamily: 'Tajawal_700Bold' },
  continueRight: { alignItems: 'center', justifyContent: 'center' },
  continueProg: { alignItems: 'center' },
  continueProgPct: { color: GOLD, fontSize: 22, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold' },
  continueProgLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11, fontFamily: 'Tajawal_400Regular' },

  subjectsCard: {
    borderRadius: 16, borderWidth: 1, overflow: 'hidden', marginBottom: 16,
    shadowColor: '#141B33', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  subjectRow: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12 },
  subjectName: { fontSize: 13, fontWeight: '600', fontFamily: 'Tajawal_700Bold', width: 64 },
  subjectBar: { flex: 1, height: 6, borderRadius: 3, overflow: 'hidden' },
  subjectFill: { height: '100%', borderRadius: 3 },
  subjectPct: { fontSize: 12, fontFamily: 'Tajawal_500Medium', width: 36, textAlign: 'left' },

  gamCard: {
    borderRadius: 20, padding: 16, marginBottom: 16,
    borderWidth: 1, borderColor: 'rgba(201,168,76,0.2)',
  },
  gamRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  levelBadge: {
    alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 8, marginBottom: 8,
  },
  levelText: { color: '#2a1d00', fontSize: 12, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold' },
  gamName: { color: GOLD, fontSize: 13, fontFamily: 'Tajawal_500Medium' },
  gamSub: { color: '#fff', fontSize: 15, fontWeight: '700', fontFamily: 'Tajawal_700Bold', marginTop: 2 },
  ringPct: { position: 'absolute', color: GOLD, fontSize: 16, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold' },
  ringLabel: { position: 'absolute', bottom: 14, color: 'rgba(255,255,255,0.5)', fontSize: 9, fontFamily: 'Tajawal_400Regular' },

  timelineCard: {
    borderRadius: 16, borderWidth: 1, overflow: 'hidden', marginBottom: 16,
    shadowColor: '#141B33', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  timelineRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, padding: 12 },
  timelineSep: {},
  timelineLeft: { alignItems: 'center', width: 28 },
  timelineEmoji: { fontSize: 16, textAlign: 'center' },
  timelineLine: { width: 1, flex: 1, marginTop: 6 },
  timelineAction: { fontSize: 13, fontWeight: '600', fontFamily: 'Tajawal_700Bold' },
  timelineMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 },
  timelineSubject: { fontSize: 11, fontFamily: 'Tajawal_400Regular' },
  timelineDot: { fontSize: 11 },
  timelineTime: { fontSize: 11, fontFamily: 'Tajawal_400Regular' },
  timelinePoints: { fontSize: 12, fontWeight: '600', fontFamily: 'Tajawal_700Bold' },
});
