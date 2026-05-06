import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Dimensions, StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, GOLD, GOLD_GRAD, BLUE_GRAD, spacing } from '../theme';
import {
  ChevronRightIcon, PlayIcon, CheckIcon, LockIcon,
  ClockIcon, DownloadIcon, BookIcon, SparkleIcon, ArrowLIcon, ArrowRIcon
} from '../components/Icons';

const W = Dimensions.get('window').width;
const VIDEO_H = (W - spacing.xl * 2) * (9 / 16);

const LESSON = {
  n: 5, total: 32,
  title: 'الإعراب التطبيقي',
  subject: 'اللغة العربية',
  duration: '22:10',
  elapsed: '08:42',
  pct: 39,
  tags: ['نحو', 'إعراب', 'تطبيقي'],
  desc: 'في هذا الدرس نتعرّف على تطبيقات الإعراب على نصوص متنوّعة، ونتدرّب على استخراج العلامات الإعرابية من الجمل الاسمية والفعلية بشكل عملي.',
  outcomes: [
    'إعراب الجملة الاسمية بأنواعها',
    'تمييز علامات الإعراب الأصلية والفرعية',
    'استخراج المعربات المختلفة من النص',
  ],
  attachments: [
    { name: 'ملخص الدرس', type: 'PDF', size: '1.2MB' },
    { name: 'ورقة تطبيقات', type: 'PDF', size: '640KB' },
    { name: 'الشرائح المُستخدمة', type: 'PPT', size: '3.4MB' },
  ],
  list: [
    { n: 4, title: 'تحليل القصيدة الجاهلية', dur: '18:24', status: 'done' },
    { n: 5, title: 'الإعراب التطبيقي', dur: '22:10', status: 'current' },
    { n: 6, title: 'ملخص الوحدة', dur: '4 صفحات', status: 'open' },
    { n: 7, title: 'اختبار الوحدة الثانية', dur: '25د', status: 'open' },
    { n: 8, title: 'علم البيان — التشبيه', dur: '16:20', status: 'locked' },
  ],
};

const TABS = [
  { id: 'details', label: 'التفاصيل' },
  { id: 'list', label: 'قائمة الدروس' },
  { id: 'files', label: 'الملفات' },
];

const STATUS_CONFIG = {
  done:    { bg: '#22C55E18', color: '#22C55E' },
  current: { bg: '#3B82F618', color: '#3B82F6' },
  open:    { bg: '#8B5CF618', color: '#8B5CF6' },
  locked:  { bg: '#6B728018', color: '#6B7280' },
};

function VideoPlayer() {
  const [playing, setPlaying] = useState(false);
  const pct = LESSON.pct;

  return (
    <View style={styles.videoWrap}>
      <LinearGradient
        colors={['#06080F', '#0E1428']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.video}
      >
        {/* Faint grid overlay */}
        <View style={styles.videoGrid} />

        {/* Gold glow blob */}
        <View style={styles.videoGlow} />

        {/* Big arabic glyph */}
        <Text style={styles.videoBgGlyph}>ع</Text>

        {/* Play button */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setPlaying(!playing)}
          style={styles.playBtn}
        >
          <LinearGradient colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.85)']}
            style={styles.playBtnInner}>
            <PlayIcon size={22} color="#111A3A" />
          </LinearGradient>
        </TouchableOpacity>

        {/* Duration chip */}
        <View style={styles.durationChip}>
          <Text style={styles.durationText}>{LESSON.duration}</Text>
        </View>

        {/* Progress bar */}
        <View style={styles.progressWrap}>
          <View style={[styles.progressBg]}>
            <View style={[styles.progressFill, { width: `${pct}%` }]} />
            <View style={[styles.progressThumb, { left: `${pct}%` }]} />
          </View>
          <View style={styles.progressTimes}>
            <Text style={styles.progressTime}>{LESSON.elapsed}</Text>
            <Text style={styles.progressTime}>{LESSON.duration}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

function DetailsTab() {
  const { t } = useTheme();
  return (
    <View style={styles.tabContent}>
      {/* Tags */}
      <View style={styles.tagsRow}>
        {LESSON.tags.map((tag, i) => (
          <View key={i} style={[styles.tag, { backgroundColor: t.chip, borderColor: t.border }]}>
            <Text style={[styles.tagText, { color: t.ink2 }]}>{tag}</Text>
          </View>
        ))}
      </View>

      {/* Description */}
      <Text style={[styles.sectionLabel, { color: t.ink }]}>وصف الدرس</Text>
      <Text style={[styles.desc, { color: t.ink2 }]}>{LESSON.desc}</Text>

      {/* Outcomes */}
      <Text style={[styles.sectionLabel, { color: t.ink }]}>ما ستتعلّمه</Text>
      {LESSON.outcomes.map((o, i) => (
        <View key={i} style={styles.outcomeRow}>
          <View style={styles.outcomeCheck}>
            <CheckIcon size={9} color="#2a1d00" />
          </View>
          <Text style={[styles.outcomeText, { color: t.ink2 }]}>{o}</Text>
        </View>
      ))}
    </View>
  );
}

function LessonListTab({ onNavigate }) {
  const { t } = useTheme();
  return (
    <View style={styles.tabContent}>
      {LESSON.list.map((item) => {
        const st = STATUS_CONFIG[item.status] || STATUS_CONFIG.open;
        const isCurrent = item.status === 'current';
        const isLocked = item.status === 'locked';
        return (
          <TouchableOpacity
            key={item.n}
            activeOpacity={isLocked ? 0.4 : 0.75}
            onPress={isLocked ? null : () => onNavigate(item)}
            style={[
              styles.listRow,
              { borderColor: isCurrent ? '#3B82F640' : t.border },
              isCurrent && { backgroundColor: '#3B82F608' },
            ]}
          >
            <View style={[styles.listNum, { backgroundColor: st.bg }]}>
              {isLocked
                ? <LockIcon size={10} color={st.color} />
                : item.status === 'done'
                  ? <CheckIcon size={10} color={st.color} />
                  : <Text style={[styles.listNumText, { color: st.color }]}>{item.n}</Text>
              }
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.listTitle, { color: isLocked ? t.ink3 : t.ink }]} numberOfLines={1}>
                {item.title}
              </Text>
              <View style={styles.listMeta}>
                <ClockIcon size={10} color={t.ink3} />
                <Text style={[styles.listDur, { color: t.ink3 }]}>{item.dur}</Text>
              </View>
            </View>
            {isCurrent && (
              <LinearGradient colors={GOLD_GRAD} style={styles.currentBadge}>
                <Text style={styles.currentBadgeText}>يُشغَّل</Text>
              </LinearGradient>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function FilesTab() {
  const { t } = useTheme();
  const TYPE_COLORS = { PDF: '#EF4444', PPT: '#F59E0B', DOC: '#3B82F6' };
  return (
    <View style={styles.tabContent}>
      <Text style={[styles.filesNote, { color: t.ink3 }]}>
        جميع الملفات متاحة للتحميل لمشتركي Pro
      </Text>
      {LESSON.attachments.map((f, i) => (
        <TouchableOpacity
          key={i}
          activeOpacity={0.8}
          style={[styles.fileRow, { backgroundColor: t.surface, borderColor: t.border }]}
        >
          <View style={[styles.fileIcon, { backgroundColor: (TYPE_COLORS[f.type] || GOLD) + '18' }]}>
            <Text style={[styles.fileType, { color: TYPE_COLORS[f.type] || GOLD }]}>{f.type}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.fileName, { color: t.ink }]}>{f.name}</Text>
            <Text style={[styles.fileSize, { color: t.ink3 }]}>{f.size}</Text>
          </View>
          <View style={[styles.downloadBtn, { backgroundColor: 'rgba(201,168,76,0.1)', borderColor: 'rgba(201,168,76,0.2)' }]}>
            <DownloadIcon size={14} color={GOLD} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function LessonPlayerScreen({ navigation, route }) {
  const { t } = useTheme();
  const [activeTab, setActiveTab] = useState('details');
  const [marked, setMarked] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { backgroundColor: t.bg }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Top bar */}
        <View style={[styles.topBar, { paddingTop: insets.top + 8, backgroundColor: t.bg, borderBottomColor: t.border }]}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation?.goBack()} style={[styles.topBtn, { backgroundColor: t.surface, borderColor: t.border }]}>
            <ChevronRightIcon size={16} color={t.ink} />
          </TouchableOpacity>
          <View style={styles.topCenter}>
            <Text style={[styles.topMeta, { color: t.ink3 }]}>
              {LESSON.subject} · L{String(LESSON.n).padStart(2, '0')}/{LESSON.total}
            </Text>
            <Text style={[styles.topTitle, { color: t.ink }]} numberOfLines={1}>{LESSON.title}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} style={[styles.topBtn, { backgroundColor: t.surface, borderColor: t.border }]}>
            <Text style={{ fontSize: 16 }}>⋯</Text>
          </TouchableOpacity>
        </View>

        {/* Video */}
        <View style={{ paddingHorizontal: spacing.xl, paddingTop: 8, paddingBottom: 12 }}>
          <VideoPlayer />
        </View>

        {/* Nav row: prev / mark / next */}
        <View style={[styles.navRow, { paddingHorizontal: spacing.xl }]}>
          <TouchableOpacity activeOpacity={0.75}
            style={[styles.navBtn, { backgroundColor: t.surface, borderColor: t.border }]}>
            <ArrowRIcon size={16} color={t.ink2} />
            <Text style={[styles.navBtnText, { color: t.ink2 }]}>السابق</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setMarked(!marked)}
            style={[styles.markBtn, { backgroundColor: marked ? GOLD : t.surface, borderColor: marked ? GOLD : t.border }]}
          >
            <CheckIcon size={14} color={marked ? '#2a1d00' : t.ink3} />
            <Text style={[styles.markBtnText, { color: marked ? '#2a1d00' : t.ink2 }]}>
              {marked ? 'مكتمل ✓' : 'علّم كمكتمل'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.75}>
            <LinearGradient colors={GOLD_GRAD} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.nextBtn}>
              <Text style={styles.nextBtnText}>التالي</Text>
              <ArrowLIcon size={16} color="#2a1d00" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={[styles.tabsRow, { borderBottomColor: t.border, paddingHorizontal: spacing.xl }]}>
          {TABS.map(tab => (
            <TouchableOpacity
              key={tab.id}
              activeOpacity={0.7}
              onPress={() => setActiveTab(tab.id)}
              style={[styles.tabBtn, activeTab === tab.id && { borderBottomColor: GOLD }]}
            >
              <Text style={[styles.tabLabel, {
                color: activeTab === tab.id ? GOLD : t.ink3,
                fontFamily: activeTab === tab.id ? 'Tajawal_700Bold' : 'Tajawal_400Regular',
              }]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ paddingHorizontal: spacing.xl }}>
          {activeTab === 'details' && <DetailsTab />}
          {activeTab === 'list' && <LessonListTab onNavigate={() => {}} />}
          {activeTab === 'files' && <FilesTab />}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingBottom: 20 },

  topBar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: spacing.xl, paddingBottom: 10,
    borderBottomWidth: 1,
  },
  topBtn: {
    width: 38, height: 38, borderRadius: 11, borderWidth: 1,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  topCenter: { flex: 1, alignItems: 'center' },
  topMeta: { fontSize: 9.5, fontWeight: '600', letterSpacing: 0.4 },
  topTitle: { fontSize: 14, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold', marginTop: 1 },

  videoWrap: {
    borderRadius: 16, overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.4, shadowRadius: 24, elevation: 10,
  },
  video: {
    width: '100%',
    aspectRatio: 16 / 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  videoGrid: {
    position: 'absolute',
    inset: 0,
    opacity: 0.04,
    backgroundColor: 'transparent',
  },
  videoGlow: {
    position: 'absolute',
    top: -40,
    right: -20,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(201,168,76,0.25)',
  },
  videoBgGlyph: {
    position: 'absolute',
    fontSize: 100,
    color: 'rgba(255,255,255,0.04)',
    fontWeight: '800',
    left: 16,
    bottom: 30,
  },
  playBtn: {
    width: 56, height: 56, borderRadius: 28,
    shadowColor: '#000', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35, shadowRadius: 12, elevation: 8,
  },
  playBtnInner: {
    width: 56, height: 56, borderRadius: 28,
    alignItems: 'center', justifyContent: 'center',
    paddingLeft: 4,
  },
  durationChip: {
    position: 'absolute', bottom: 32, right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 7, paddingVertical: 3, borderRadius: 7,
  },
  durationText: { color: '#fff', fontSize: 10, fontWeight: '600' },
  progressWrap: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: 10, paddingBottom: 8,
  },
  progressBg: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    overflow: 'visible',
    marginBottom: 4,
  },
  progressFill: {
    position: 'absolute',
    top: 0, left: 0, bottom: 0,
    backgroundColor: GOLD,
    borderRadius: 2,
  },
  progressThumb: {
    position: 'absolute',
    top: -4,
    width: 11, height: 11,
    borderRadius: 6,
    backgroundColor: GOLD,
    marginLeft: -5.5,
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  progressTimes: {
    flexDirection: 'row', justifyContent: 'space-between',
  },
  progressTime: { color: 'rgba(255,255,255,0.6)', fontSize: 9, fontFamily: 'Tajawal_400Regular' },

  navRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16,
  },
  navBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 12, paddingVertical: 9,
    borderRadius: 12, borderWidth: 1,
  },
  navBtnText: { fontSize: 12, fontFamily: 'Tajawal_700Bold' },
  markBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, paddingVertical: 9, borderRadius: 12, borderWidth: 1,
  },
  markBtnText: { fontSize: 12, fontWeight: '700', fontFamily: 'Tajawal_700Bold' },
  nextBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 12, paddingVertical: 9, borderRadius: 12,
  },
  nextBtnText: { color: '#2a1d00', fontSize: 12, fontWeight: '700', fontFamily: 'Tajawal_700Bold' },

  tabsRow: {
    flexDirection: 'row', borderBottomWidth: 1, marginBottom: 16,
  },
  tabBtn: {
    flex: 1, alignItems: 'center', paddingBottom: 10,
    borderBottomWidth: 2, borderBottomColor: 'transparent',
  },
  tabLabel: { fontSize: 13 },

  tabContent: { paddingBottom: 8 },

  tagsRow: { flexDirection: 'row', gap: 6, marginBottom: 14, flexWrap: 'wrap' },
  tag: {
    paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 99, borderWidth: 1,
  },
  tagText: { fontSize: 11, fontFamily: 'Tajawal_500Medium' },

  sectionLabel: { fontSize: 14, fontWeight: '700', fontFamily: 'Tajawal_700Bold', marginBottom: 8 },
  desc: { fontSize: 13, fontFamily: 'Tajawal_400Regular', lineHeight: 22, marginBottom: 16 },
  outcomeRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 8 },
  outcomeCheck: {
    width: 18, height: 18, borderRadius: 5, backgroundColor: GOLD,
    alignItems: 'center', justifyContent: 'center', marginTop: 2, flexShrink: 0,
  },
  outcomeText: { flex: 1, fontSize: 13, fontFamily: 'Tajawal_400Regular', lineHeight: 20 },

  listRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingVertical: 10, borderBottomWidth: 1,
  },
  listNum: {
    width: 28, height: 28, borderRadius: 8,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  listNumText: { fontSize: 12, fontWeight: '700', fontFamily: 'Tajawal_700Bold' },
  listTitle: { fontSize: 13, fontWeight: '600', fontFamily: 'Tajawal_700Bold' },
  listMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  listDur: { fontSize: 11, fontFamily: 'Tajawal_400Regular' },
  currentBadge: {
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 7,
  },
  currentBadgeText: { color: '#2a1d00', fontSize: 10, fontWeight: '700', fontFamily: 'Tajawal_700Bold' },

  filesNote: {
    fontSize: 12, fontFamily: 'Tajawal_400Regular', marginBottom: 12,
    textAlign: 'center',
  },
  fileRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    padding: 12, borderRadius: 14, borderWidth: 1, marginBottom: 8,
  },
  fileIcon: {
    width: 44, height: 44, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  fileType: { fontSize: 11, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold' },
  fileName: { fontSize: 13, fontWeight: '600', fontFamily: 'Tajawal_700Bold' },
  fileSize: { fontSize: 11, fontFamily: 'Tajawal_400Regular', marginTop: 2 },
  downloadBtn: {
    width: 36, height: 36, borderRadius: 10,
    borderWidth: 1, alignItems: 'center', justifyContent: 'center',
  },
});
