import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, GOLD, GOLD_GRAD, BLUE_GRAD, spacing } from '../theme';
import { SearchIcon, StarIcon, ClockIcon, UsersIcon, ChevronRightIcon } from '../components/Icons';
import SectionHeader from '../components/SectionHeader';

const W = Dimensions.get('window').width;

const CATS = [
  { id: 'all', label: 'الكل' },
  { id: 'math', label: 'رياضيات' },
  { id: 'science', label: 'علوم' },
  { id: 'lang', label: 'لغات' },
  { id: 'tech', label: 'تقنية' },
];

const FEATURED = [
  {
    title: 'التفاضل والتكامل المتقدم',
    sub: 'الصف الثاني عشر — رياضيات',
    rating: '4.9', students: '1.2k', lessons: 24, duration: '18 ساعة',
    colors: ['#2B3F7A', '#111A3A'], emoji: '∫',
  },
  {
    title: 'الفيزياء الحديثة',
    sub: 'الصف الحادي عشر — فيزياء',
    rating: '4.8', students: '980', lessons: 18, duration: '14 ساعة',
    colors: ['#1A4A2A', '#0D2615'], emoji: '⚛',
  },
  {
    title: 'النحو والصرف المتقدم',
    sub: 'جميع الصفوف — عربي',
    rating: '4.7', students: '2.1k', lessons: 30, duration: '22 ساعة',
    colors: ['#4A1A1A', '#2A0D0D'], emoji: 'ع',
  },
];

const COURSES = [
  { title: 'الكيمياء العضوية', stage: 'الثانوي', tag: 'كيمياء', rating: '4.8', students: '860', lessons: 20, duration: '16 ساعة', colors: ['#2A1A4A', '#150D2A'] },
  { title: 'الأحياء — الخلية والوراثة', stage: 'الثانوي', tag: 'أحياء', rating: '4.6', students: '720', lessons: 16, duration: '12 ساعة', colors: ['#1A3A1A', '#0D200D'] },
  { title: 'التاريخ السوداني المعاصر', stage: 'المتوسط', tag: 'تاريخ', rating: '4.5', students: '540', lessons: 14, duration: '10 ساعة', colors: ['#3A2A1A', '#20160D'] },
  { title: 'الجغرافيا الطبيعية', stage: 'المتوسط', tag: 'جغرافيا', rating: '4.4', students: '490', lessons: 12, duration: '9 ساعة', colors: ['#1A2A3A', '#0D1620'] },
];

function FeaturedCard({ item, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={styles.featuredCard}>
      <LinearGradient
        colors={item.colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.featuredGrad}
      >
        <Text style={styles.featuredEmoji}>{item.emoji}</Text>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.featuredOverlay}
        >
          <View style={styles.featuredRating}>
            <StarIcon size={11} color={GOLD} />
            <Text style={styles.featuredRatingText}>{item.rating}</Text>
          </View>
          <Text style={styles.featuredTitle} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.featuredSub}>{item.sub}</Text>
          <View style={styles.featuredMeta}>
            <ClockIcon size={11} color="rgba(255,255,255,0.6)" />
            <Text style={styles.featuredMetaText}>{item.duration}</Text>
            <Text style={styles.featuredDot}>·</Text>
            <UsersIcon size={11} color="rgba(255,255,255,0.6)" />
            <Text style={styles.featuredMetaText}>{item.students}</Text>
          </View>
        </LinearGradient>
      </LinearGradient>
    </TouchableOpacity>
  );
}

function CourseRow({ course, onPress }) {
  const { t } = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.courseRow, { backgroundColor: t.surface, borderColor: t.border }]}
    >
      <LinearGradient colors={course.colors} style={styles.courseCover}>
        <Text style={styles.courseEmoji}>{course.tag[0]}</Text>
      </LinearGradient>
      <View style={{ flex: 1 }}>
        <View style={styles.courseTag}>
          <Text style={styles.courseTagText}>{course.tag}</Text>
        </View>
        <Text style={[styles.courseTitle, { color: t.ink }]}>{course.title}</Text>
        <Text style={[styles.courseStage, { color: t.ink3 }]}>{course.stage}</Text>
        <View style={styles.courseMeta}>
          <StarIcon size={11} color={GOLD} />
          <Text style={[styles.courseMetaTxt, { color: t.ink3 }]}>{course.rating}</Text>
          <Text style={[styles.courseDot, { color: t.border }]}>·</Text>
          <ClockIcon size={11} color={t.ink3} />
          <Text style={[styles.courseMetaTxt, { color: t.ink3 }]}>{course.duration}</Text>
          <Text style={[styles.courseDot, { color: t.border }]}>·</Text>
          <Text style={[styles.courseMetaTxt, { color: t.ink3 }]}>{course.lessons} درس</Text>
        </View>
      </View>
      <ChevronRightIcon size={16} color={t.ink3} />
    </TouchableOpacity>
  );
}

export default function CoursesScreen({ navigation }) {
  const { t } = useTheme();
  const [activeCat, setActiveCat] = useState('all');
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { backgroundColor: t.bg }]}>
      <View style={[styles.header, { paddingTop: insets.top + 12, backgroundColor: t.bg }]}>
        <Text style={[styles.screenTitle, { color: t.ink }]}>الدورات التعليمية</Text>
        <Text style={[styles.screenSub, { color: t.ink3 }]}>اكتشف محتوى غني وشامل</Text>
      </View>

      <View style={{ paddingHorizontal: spacing.xl, marginBottom: 12 }}>
        <TouchableOpacity activeOpacity={0.8} style={[styles.searchBar, { backgroundColor: t.surfaceAlt, borderColor: t.border }]}>
          <SearchIcon size={18} color={t.ink3} />
          <Text style={[styles.searchPlaceholder, { color: t.ink3 }]}>ابحث عن دورة أو مادة...</Text>
        </TouchableOpacity>
      </View>

      {/* Category tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.catRow, { paddingHorizontal: spacing.xl }]}>
        {CATS.map(c => (
          <TouchableOpacity
            key={c.id}
            activeOpacity={0.7}
            onPress={() => setActiveCat(c.id)}
            style={[styles.catChip,
              { backgroundColor: activeCat === c.id ? GOLD : t.chip, borderColor: activeCat === c.id ? GOLD : t.border }
            ]}
          >
            <Text style={[styles.catText, { color: activeCat === c.id ? '#2a1d00' : t.ink2 }]}>
              {c.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Featured horizontal */}
        <SectionHeader title="الدورات المميّزة" action="الكل" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.featuredScroll, { paddingHorizontal: spacing.xl }]}>
          {FEATURED.map((f, i) => (
            <FeaturedCard key={i} item={f} onPress={() => navigation?.navigate('SubjectDetails')} />
          ))}
        </ScrollView>

        {/* All courses */}
        <SectionHeader title="جميع الدورات" />
        <View style={styles.courseList}>
          {COURSES.map((c, i) => (
            <CourseRow key={i} course={c} onPress={() => navigation?.navigate('SubjectDetails')} />
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
  screenTitle: { fontSize: 24, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold' },
  screenSub: { fontSize: 14, fontFamily: 'Tajawal_400Regular', marginTop: 2 },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 14, height: 46, borderRadius: 14, borderWidth: 1,
  },
  searchPlaceholder: { flex: 1, fontSize: 14, fontFamily: 'Tajawal_400Regular' },
  catRow: { gap: 8, paddingBottom: 14 },
  catChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 99, borderWidth: 1 },
  catText: { fontSize: 13, fontWeight: '600', fontFamily: 'Tajawal_700Bold' },
  scroll: { paddingBottom: 20 },
  featuredScroll: { gap: 12, paddingBottom: 16 },
  featuredCard: {
    width: 220,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#141B33',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
  },
  featuredGrad: { height: 240, justifyContent: 'flex-end' },
  featuredEmoji: { position: 'absolute', top: 20, right: 20, fontSize: 48, color: 'rgba(255,255,255,0.25)' },
  featuredOverlay: { padding: 14 },
  featuredRating: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 6 },
  featuredRatingText: { color: GOLD, fontSize: 11, fontWeight: '600', fontFamily: 'Tajawal_700Bold' },
  featuredTitle: { color: '#fff', fontSize: 15, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold', lineHeight: 20, marginBottom: 4 },
  featuredSub: { color: 'rgba(255,255,255,0.65)', fontSize: 11, fontFamily: 'Tajawal_400Regular', marginBottom: 8 },
  featuredMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  featuredMetaText: { color: 'rgba(255,255,255,0.65)', fontSize: 11, fontFamily: 'Tajawal_400Regular' },
  featuredDot: { color: 'rgba(255,255,255,0.3)', fontSize: 11 },
  courseList: { paddingHorizontal: spacing.xl, gap: 10 },
  courseRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12,
    borderRadius: 16, borderWidth: 1,
    shadowColor: '#141B33', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  courseCover: {
    width: 52, height: 52, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  courseEmoji: { color: 'rgba(255,255,255,0.5)', fontSize: 20, fontWeight: '300' },
  courseTag: {
    alignSelf: 'flex-start', backgroundColor: 'rgba(201,168,76,0.12)',
    paddingHorizontal: 7, paddingVertical: 2, borderRadius: 5, marginBottom: 4,
  },
  courseTagText: { color: GOLD, fontSize: 10, fontWeight: '600', fontFamily: 'Tajawal_700Bold' },
  courseTitle: { fontSize: 14, fontWeight: '700', fontFamily: 'Tajawal_700Bold', lineHeight: 18 },
  courseStage: { fontSize: 11, fontFamily: 'Tajawal_400Regular', marginTop: 1 },
  courseMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  courseMetaTxt: { fontSize: 11, fontFamily: 'Tajawal_400Regular' },
  courseDot: { fontSize: 11 },
});
