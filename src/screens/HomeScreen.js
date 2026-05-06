import React, { useRef, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Dimensions, Animated
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, GOLD, GOLD_GRAD, BLUE_GRAD, NAVY, spacing, fontSize, radius } from '../theme';
import { GOLD_DEEP } from '../theme/colors';
import Header from '../components/Header';
import SectionHeader from '../components/SectionHeader';
import Avatar from '../components/Avatar';
import BrandMark from '../components/BrandMark';
import {
  SearchIcon, PlayIcon, ClockIcon, SparkleIcon, TrophyIcon,
  ArrowLIcon, FlameIcon, StarIcon, BookIcon, ChevronRightIcon, UsersIcon
} from '../components/Icons';
import Svg, { Circle, Path, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';

const W = Dimensions.get('window').width;
const PROGRESS = 68;

function ProgressRing({ progress = 68, size = 72 }) {
  const R = 28;
  const C = 2 * Math.PI * R;
  const dash = (progress / 100) * C;
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} viewBox="0 0 72 72" style={{ transform: [{ rotate: '-90deg' }] }}>
        <Defs>
          <SvgGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#D4B96A" />
            <Stop offset="100%" stopColor="#8E6B1E" />
          </SvgGradient>
        </Defs>
        <Circle cx="36" cy="36" r={R} stroke="rgba(255,255,255,0.12)" strokeWidth="5" fill="none" />
        <Circle cx="36" cy="36" r={R} stroke="url(#g1)" strokeWidth="5" strokeLinecap="round" fill="none"
          strokeDasharray={`${dash} ${C}`} />
      </Svg>
      <Text style={styles.ringText}>{progress}%</Text>
    </View>
  );
}

function HeroCard({ navigation }) {
  const { t } = useTheme();
  return (
    <View style={styles.heroPad}>
      <LinearGradient
        colors={BLUE_GRAD}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.heroCard}
      >
        {/* Top pill */}
        <View style={styles.heroPill}>
          <View style={styles.heroPillDot} />
          <Text style={styles.heroPillText}>رحلة التعلّم النشطة</Text>
        </View>
        <Text style={styles.heroLesson}>الفصل 03 / الدرس 12</Text>

        {/* Middle row */}
        <View style={styles.heroMiddle}>
          {/* Video thumbnail */}
          <LinearGradient
            colors={['#3D5494', '#1E2F6E']}
            style={styles.videoThumb}
          >
            <View style={styles.playBtn}>
              <PlayIcon size={16} color="#1A2350" />
            </View>
            <View style={styles.durationChip}>
              <Text style={styles.durationText}>14:32</Text>
            </View>
          </LinearGradient>

          {/* Text */}
          <View style={{ flex: 1 }}>
            <Text style={styles.heroSubLabel}>الدرس الحالي</Text>
            <Text style={styles.heroTitle}>التفاضل والتكامل</Text>
            <Text style={styles.heroSub}>المشتقات الجزئية</Text>
          </View>

          <ProgressRing progress={PROGRESS} size={72} />
        </View>

        {/* CTA */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation?.navigate('LessonPlayer')}
          style={styles.heroCtaWrap}
        >
          <LinearGradient
            colors={GOLD_GRAD}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroCta}
          >
            <Text style={styles.heroCtaText}>كمل التعلّم</Text>
            <ArrowLIcon size={16} color="#2a1d00" />
          </LinearGradient>
        </TouchableOpacity>

        {/* Mini stats */}
        <View style={styles.heroStats}>
          {[
            { l: 'متبقي', v: '4 دروس' },
            { l: 'النقاط', v: '+240 XP' },
            { l: 'الترتيب', v: 'الـ12' },
          ].map((s, i) => (
            <View key={i} style={styles.heroStat}>
              <Text style={styles.heroStatV}>{s.v}</Text>
              <Text style={styles.heroStatL}>{s.l}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>
    </View>
  );
}

function GamificationCard() {
  const { t } = useTheme();
  return (
    <View style={styles.heroPad}>
      <LinearGradient
        colors={['#232E54', '#1A2350']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gamCard, { borderColor: 'rgba(201,168,76,0.2)' }]}
      >
        <View style={styles.gamRow}>
          <View>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>Lv.5</Text>
            </View>
            <Text style={styles.gamName}>أحمد الحارثي</Text>
            <Text style={styles.gamSub}>مستكشف متقدّم</Text>
          </View>
          <View style={styles.gamRight}>
            <Text style={styles.xpValue}>2,840</Text>
            <Text style={styles.xpLabel}>XP هذا الأسبوع</Text>
            <View style={styles.xpBar}>
              <LinearGradient colors={GOLD_GRAD} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={[styles.xpFill, { width: '72%' }]} />
            </View>
            <Text style={styles.xpNext}>960 XP للمستوى التالي</Text>
          </View>
        </View>

        <View style={styles.gamBadges}>
          {['🔥', '⚡', '📚', '🏆', '💎'].map((b, i) => (
            <View key={i} style={[styles.gamBadge, i >= 3 && { opacity: 0.35 }]}>
              <Text style={{ fontSize: 18 }}>{b}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>
    </View>
  );
}

function RecommendationCard({ item, onPress }) {
  const { t } = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.recCard, { backgroundColor: t.surface, borderColor: t.border }]}
    >
      <LinearGradient
        colors={item.colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.recCover}
      >
        <Text style={styles.recEmoji}>{item.emoji}</Text>
      </LinearGradient>
      <View style={styles.recBody}>
        <View style={styles.recTag}>
          <Text style={styles.recTagText}>{item.tag}</Text>
        </View>
        <Text style={[styles.recTitle, { color: t.ink }]} numberOfLines={2}>{item.title}</Text>
        <View style={styles.recMeta}>
          <StarIcon size={12} color={GOLD} />
          <Text style={[styles.recRating, { color: t.ink3 }]}>{item.rating}</Text>
          <Text style={[styles.recDivider, { color: t.border }]}>·</Text>
          <ClockIcon size={12} color={t.ink3} />
          <Text style={[styles.recDuration, { color: t.ink3 }]}>{item.duration}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const RECOMMENDATIONS = [
  { title: 'رياضيات الصف الثاني عشر', tag: 'تفاضل', emoji: '∫', rating: '4.9', duration: '24 درس', colors: ['#2B3F7A', '#111A3A'] },
  { title: 'الفيزياء الحديثة والكهرومغناطيسية', tag: 'فيزياء', emoji: '⚡', rating: '4.8', duration: '18 درس', colors: ['#1A4A3A', '#0D2620'] },
  { title: 'اللغة العربية — النحو والأدب', tag: 'عربي', emoji: 'ع', rating: '4.7', duration: '30 درس', colors: ['#4A1A2E', '#2A0D1A'] },
];

const TEACHERS = [
  { name: 'أ. سارة المهدي', subject: 'رياضيات', rating: '4.9', students: '1.2k', hue: 260 },
  { name: 'أ. محمد عثمان', subject: 'فيزياء', hue: 200, rating: '4.8', students: '980' },
  { name: 'أ. فاطمة النور', subject: 'كيمياء', hue: 320, rating: '4.9', students: '750' },
];

function TeacherCard({ teacher }) {
  const { t } = useTheme();
  return (
    <View style={[styles.teachCard, { backgroundColor: t.surface, borderColor: t.border }]}>
      <Avatar name={teacher.name[3] || 'أ'} size={44} hue={teacher.hue} />
      <Text style={[styles.teachName, { color: t.ink }]} numberOfLines={1}>{teacher.name}</Text>
      <Text style={[styles.teachSub, { color: t.ink3 }]}>{teacher.subject}</Text>
      <View style={styles.teachRating}>
        <StarIcon size={11} color={GOLD} />
        <Text style={[styles.teachRatingText, { color: t.ink2 }]}>{teacher.rating}</Text>
      </View>
      <TouchableOpacity activeOpacity={0.7}
        style={[styles.teachBtn, { borderColor: GOLD }]}>
        <Text style={[styles.teachBtnText, { color: GOLD }]}>متابعة</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function HomeScreen({ navigation }) {
  const { t } = useTheme();

  return (
    <View style={[styles.root, { backgroundColor: t.bg }]}>
      <Header onMenu={() => {}} onBell={() => {}} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Greeting */}
        <View style={[styles.greetingRow, { paddingHorizontal: spacing.xl }]}>
          <Avatar name="أ" size={42} hue={50} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.greetSub, { color: t.ink3 }]}>أهلاً بعودتك</Text>
            <Text style={[styles.greetName, { color: t.ink }]}>أحمد الحارثي 👋</Text>
          </View>
        </View>

        {/* Status pill */}
        <View style={[styles.statusPill, { backgroundColor: t.surfaceAlt, borderColor: 'rgba(201,168,76,0.25)' }]}>
          <LinearGradient colors={GOLD_GRAD} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.statusIcon}>
            <Text style={{ fontSize: 16 }}>🔥</Text>
          </LinearGradient>
          <View style={{ flex: 1 }}>
            <Text style={[styles.statusLabel, { color: t.ink3 }]}>مستواك اليوم</Text>
            <Text style={[styles.statusValue, { color: t.ink }]}>
              ممتاز — تقدّم بنسبة <Text style={{ color: GOLD_DEEP }}>+18%</Text>
            </Text>
          </View>
          <Text style={[styles.statusDate, { color: t.ink2 }]}>اليوم</Text>
        </View>

        {/* Search bar */}
        <TouchableOpacity activeOpacity={0.8} style={[styles.searchBar, { backgroundColor: t.surfaceAlt, borderColor: t.border }]}>
          <SearchIcon size={18} color={t.ink3} />
          <Text style={[styles.searchPlaceholder, { color: t.ink3 }]}>ابحث عن مادة، مدرّس أو درس...</Text>
        </TouchableOpacity>

        {/* Hero */}
        <HeroCard navigation={navigation} />

        {/* Gamification */}
        <GamificationCard />

        {/* Recommendations */}
        <SectionHeader title="موصى به لك" action="الكل" onAction={() => navigation?.navigate('Courses')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
          {RECOMMENDATIONS.map((r, i) => (
            <RecommendationCard key={i} item={r} onPress={() => navigation?.navigate('SubjectDetails')} />
          ))}
        </ScrollView>

        {/* Teachers */}
        <SectionHeader title="المدرّسون المميّزون" action="الكل" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
          {TEACHERS.map((t, i) => <TeacherCard key={i} teacher={t} />)}
        </ScrollView>

        <View style={{ height: spacing.xxxl }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingBottom: 20 },

  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 14,
    marginBottom: 12,
  },
  greetSub: { fontSize: 12, fontWeight: '500', fontFamily: 'Tajawal_500Medium' },
  greetName: { fontSize: 17, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold', marginTop: 1 },

  statusPill: {
    marginHorizontal: spacing.xl,
    marginBottom: 10,
    padding: 10,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statusIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusLabel: { fontSize: 12, fontFamily: 'Tajawal_500Medium' },
  statusValue: { fontSize: 14, fontWeight: '700', fontFamily: 'Tajawal_700Bold', marginTop: 1 },
  statusDate: { fontSize: 11, fontWeight: '600' },

  searchBar: {
    marginHorizontal: spacing.xl,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    height: 46,
    borderRadius: 14,
    borderWidth: 1,
  },
  searchPlaceholder: { flex: 1, fontSize: 14, fontFamily: 'Tajawal_400Regular' },

  heroPad: { paddingHorizontal: spacing.xl, marginBottom: 16 },
  heroCard: {
    borderRadius: 28,
    padding: 18,
    overflow: 'hidden',
    shadowColor: '#0F1937',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 12,
  },
  heroPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 99,
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    marginBottom: 4,
  },
  heroPillDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: GOLD },
  heroPillText: { color: '#fff', fontSize: 11, fontWeight: '600', fontFamily: 'Tajawal_700Bold' },
  heroLesson: { color: 'rgba(255,255,255,0.65)', fontSize: 11, fontFamily: 'Tajawal_400Regular', textAlign: 'right', marginBottom: 14 },

  heroMiddle: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 14 },
  videoThumb: {
    width: 96,
    height: 96,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  playBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationChip: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  durationText: { color: '#fff', fontSize: 9, fontWeight: '600' },
  heroSubLabel: { color: 'rgba(255,255,255,0.65)', fontSize: 11, fontFamily: 'Tajawal_500Medium' },
  heroTitle: { color: '#fff', fontSize: 17, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold', marginTop: 2, lineHeight: 22 },
  heroSub: { color: 'rgba(255,255,255,0.78)', fontSize: 14, fontFamily: 'Tajawal_400Regular' },

  ringText: {
    position: 'absolute',
    color: GOLD,
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Tajawal_700Bold',
  },

  heroCtaWrap: { borderRadius: 16, overflow: 'hidden', marginBottom: 12 },
  heroCta: {
    height: 50,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  heroCtaText: {
    color: '#2a1d00',
    fontWeight: '800',
    fontSize: 15,
    fontFamily: 'Tajawal_800ExtraBold',
  },

  heroStats: { flexDirection: 'row', gap: 8 },
  heroStat: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  heroStatV: { color: GOLD, fontSize: 13, fontWeight: '700', fontFamily: 'Tajawal_700Bold' },
  heroStatL: { color: 'rgba(255,255,255,0.6)', fontSize: 10, fontFamily: 'Tajawal_400Regular', marginTop: 2 },

  gamCard: {
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  gamRow: { flexDirection: 'row', gap: 14, marginBottom: 12 },
  levelBadge: {
    alignSelf: 'flex-start',
    backgroundColor: GOLD,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  levelText: { color: '#2a1d00', fontSize: 12, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold' },
  gamName: { color: '#fff', fontSize: 15, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold' },
  gamSub: { color: GOLD, fontSize: 12, fontFamily: 'Tajawal_500Medium', marginTop: 2 },
  gamRight: { flex: 1 },
  xpValue: { color: '#fff', fontSize: 24, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold' },
  xpLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11, fontFamily: 'Tajawal_400Regular' },
  xpBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 3,
    marginTop: 8,
    marginBottom: 4,
    overflow: 'hidden',
  },
  xpFill: { height: '100%', borderRadius: 3 },
  xpNext: { color: 'rgba(255,255,255,0.5)', fontSize: 10, fontFamily: 'Tajawal_400Regular' },
  gamBadges: { flexDirection: 'row', gap: 8, marginTop: 4 },
  gamBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  hScroll: { paddingHorizontal: spacing.xl, gap: 12 },
  recCard: {
    width: 200,
    borderRadius: 18,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#141B33',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  recCover: {
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recEmoji: { color: 'rgba(255,255,255,0.6)', fontSize: 36, fontWeight: '300' },
  recBody: { padding: 12 },
  recTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(201,168,76,0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 6,
  },
  recTagText: { color: GOLD, fontSize: 10, fontWeight: '600', fontFamily: 'Tajawal_700Bold' },
  recTitle: { fontSize: 14, fontWeight: '700', fontFamily: 'Tajawal_700Bold', lineHeight: 20, marginBottom: 8 },
  recMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  recRating: { fontSize: 11, fontFamily: 'Tajawal_400Regular' },
  recDivider: { fontSize: 11 },
  recDuration: { fontSize: 11, fontFamily: 'Tajawal_400Regular' },

  teachCard: {
    width: 140,
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#141B33',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  teachName: { fontSize: 13, fontWeight: '700', fontFamily: 'Tajawal_700Bold', marginTop: 8, textAlign: 'center' },
  teachSub: { fontSize: 11, fontFamily: 'Tajawal_400Regular', marginTop: 2, textAlign: 'center' },
  teachRating: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  teachRatingText: { fontSize: 12, fontFamily: 'Tajawal_500Medium' },
  teachBtn: {
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
  },
  teachBtnText: { fontSize: 12, fontWeight: '600', fontFamily: 'Tajawal_700Bold' },
});
