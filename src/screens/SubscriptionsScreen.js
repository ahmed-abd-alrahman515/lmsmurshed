import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, GOLD, GOLD_GRAD, BLUE_GRAD, spacing } from '../theme';
import { CheckIcon, SparkleIcon, ChevronDownIcon } from '../components/Icons';

const W = Dimensions.get('window').width;

const PLANS = [
  {
    id: 'free',
    name: 'مجاني',
    priceM: 0,
    priceY: 0,
    badge: null,
    color: null,
    features: ['الوصول لـ 3 مواد', 'فيديوهات محدودة', 'اختبارات أساسية'],
    cta: 'ابدأ مجاناً',
    ctaStyle: 'outline',
  },
  {
    id: 'pro',
    name: 'Pro',
    priceM: 150,
    priceY: 1200,
    badge: 'الأشهر',
    color: GOLD_GRAD,
    features: ['وصول كامل لجميع المواد', 'فيديوهات غير محدودة', 'اختبارات تفاعلية', 'تتبع التقدّم', 'دعم المدرّسين'],
    cta: 'اشترك الآن',
    ctaStyle: 'gold',
  },
  {
    id: 'family',
    name: 'عائلي',
    priceM: 350,
    priceY: 3000,
    badge: null,
    color: BLUE_GRAD,
    features: ['كل مميزات Pro', '5 حسابات', 'لوحة تحكّم الوالدين', 'تقارير مفصّلة'],
    cta: 'اشترك للعائلة',
    ctaStyle: 'navy',
  },
];

const COMPARE_ROWS = [
  { feature: 'عدد المواد', free: '3', pro: 'الكل', family: 'الكل' },
  { feature: 'الفيديوهات', free: 'محدود', pro: '✓', family: '✓' },
  { feature: 'الاختبارات', free: 'أساسي', pro: '✓', family: '✓' },
  { feature: 'التقدّم', free: '✗', pro: '✓', family: '✓' },
  { feature: 'دعم المدرّسين', free: '✗', pro: '✓', family: '✓' },
  { feature: 'تقارير الوالدين', free: '✗', pro: '✗', family: '✓' },
];

const FAQS = [
  { q: 'هل يمكنني إلغاء الاشتراك في أي وقت؟', a: 'نعم، يمكنك إلغاء اشتراكك في أي وقت وسيظل لديك وصول حتى نهاية الفترة المدفوعة.' },
  { q: 'ما هي وسائل الدفع المتاحة؟', a: 'نقبل بطاقات الائتمان، تحويل بنكي، ومحافظ رقمية.' },
  { q: 'هل هناك نسخة تجريبية مجانية؟', a: 'نعم، يمكنك البدء بالخطة المجانية التي تتيح الوصول لـ 3 مواد بدون قيود زمنية.' },
];

function PlanCard({ plan, billing, onSelect }) {
  const { t, isDark } = useTheme();
  const price = billing === 'monthly' ? plan.priceM : plan.priceY;
  const isPro = plan.id === 'pro';
  const isNavy = plan.id === 'family';

  const CardWrap = (isPro || isNavy) ? LinearGradient : View;
  const wrapProps = isPro ? { colors: BLUE_GRAD, start: { x: 0, y: 0 }, end: { x: 0.5, y: 1 } }
    : isNavy ? { colors: ['#1A2350', '#0F1535'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } }
      : {};

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onSelect} style={styles.planWrap}>
      <CardWrap
        {...wrapProps}
        style={[
          styles.planCard,
          !isPro && !isNavy && { backgroundColor: t.surface, borderColor: t.border, borderWidth: 1 },
          isPro && styles.planCardFeatured,
        ]}
      >
        {plan.badge && (
          <LinearGradient colors={GOLD_GRAD} style={styles.planBadge}>
            <SparkleIcon size={10} color="#2a1d00" />
            <Text style={styles.planBadgeText}>{plan.badge}</Text>
          </LinearGradient>
        )}

        <Text style={[styles.planName, { color: (isPro || isNavy) ? '#fff' : t.ink }]}>{plan.name}</Text>

        <View style={styles.priceRow}>
          <Text style={[styles.priceNum, { color: (isPro || isNavy) ? '#fff' : t.ink }]}>
            {price === 0 ? 'مجاني' : price.toLocaleString()}
          </Text>
          {price > 0 && (
            <View>
              <Text style={[styles.priceCurr, { color: (isPro || isNavy) ? 'rgba(255,255,255,0.6)' : t.ink3 }]}>SDG</Text>
              <Text style={[styles.pricePer, { color: (isPro || isNavy) ? 'rgba(255,255,255,0.6)' : t.ink3 }]}>
                /{billing === 'monthly' ? 'شهر' : 'سنة'}
              </Text>
            </View>
          )}
        </View>

        {billing === 'yearly' && price > 0 && (
          <Text style={[styles.savingText, { color: GOLD }]}>
            وفّر {Math.round((plan.priceM * 12 - plan.priceY) / (plan.priceM * 12) * 100)}%
          </Text>
        )}

        <View style={styles.featList}>
          {plan.features.map((f, i) => (
            <View key={i} style={styles.featRow}>
              <View style={[styles.featCheck, { backgroundColor: isPro ? GOLD : isNavy ? GOLD : 'rgba(201,168,76,0.2)' }]}>
                <CheckIcon size={10} color={isPro || isNavy ? '#2a1d00' : GOLD} />
              </View>
              <Text style={[styles.featText, { color: (isPro || isNavy) ? 'rgba(255,255,255,0.85)' : t.ink2 }]}>{f}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity activeOpacity={0.85} onPress={onSelect} style={styles.planCtaWrap}>
          {plan.ctaStyle === 'gold' ? (
            <LinearGradient colors={GOLD_GRAD} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.planCta}>
              <Text style={[styles.planCtaText, { color: '#2a1d00' }]}>{plan.cta}</Text>
            </LinearGradient>
          ) : (
            <View style={[styles.planCta,
              plan.ctaStyle === 'navy'
                ? { backgroundColor: GOLD }
                : { backgroundColor: 'transparent', borderWidth: 1, borderColor: t.border }
            ]}>
              <Text style={[styles.planCtaText,
                { color: plan.ctaStyle === 'navy' ? '#2a1d00' : t.ink2 }
              ]}>{plan.cta}</Text>
            </View>
          )}
        </TouchableOpacity>
      </CardWrap>
    </TouchableOpacity>
  );
}

function FaqItem({ item }) {
  const { t } = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <View style={[styles.faqItem, { borderColor: t.border }]}>
      <TouchableOpacity activeOpacity={0.7} onPress={() => setOpen(!open)} style={styles.faqQ}>
        <Text style={[styles.faqQText, { color: t.ink }]}>{item.q}</Text>
        <ChevronDownIcon size={16} color={t.ink3} />
      </TouchableOpacity>
      {open && <Text style={[styles.faqA, { color: t.ink3 }]}>{item.a}</Text>}
    </View>
  );
}

export default function SubscriptionsScreen({ navigation }) {
  const { t } = useTheme();
  const [billing, setBilling] = useState('monthly');
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { backgroundColor: t.bg }]}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <LinearGradient colors={BLUE_GRAD} style={styles.headerGrad}>
          <SparkleIcon size={14} color={GOLD} />
          <Text style={styles.headerTitle}>اختر خطّتك</Text>
          <Text style={styles.headerSub}>تعلّم بلا حدود مع مُرشد</Text>
        </LinearGradient>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Billing toggle */}
        <View style={[styles.billingRow, { backgroundColor: t.chip, borderColor: t.border }]}>
          {['monthly', 'yearly'].map(b => (
            <TouchableOpacity
              key={b}
              activeOpacity={0.7}
              onPress={() => setBilling(b)}
              style={[styles.billingBtn, billing === b && styles.billingActive]}
            >
              {billing === b && (
                <LinearGradient colors={GOLD_GRAD} style={StyleSheet.absoluteFill} />
              )}
              <Text style={[styles.billingText, { color: billing === b ? '#2a1d00' : t.ink2 }]}>
                {b === 'monthly' ? 'شهري' : 'سنوي'}
              </Text>
              {b === 'yearly' && (
                <View style={[styles.saveBadge, { backgroundColor: billing === 'yearly' ? 'rgba(42,29,0,0.3)' : GOLD }]}>
                  <Text style={[styles.saveText, { color: billing === 'yearly' ? '#2a1d00' : '#2a1d00' }]}>وفّر 30%</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Plan cards */}
        <View style={styles.plansRow}>
          {PLANS.map((p) => (
            <PlanCard key={p.id} plan={p} billing={billing} onSelect={() => {}} />
          ))}
        </View>

        {/* Comparison table */}
        <Text style={[styles.compareTitle, { color: t.ink }]}>مقارنة الخطط</Text>
        <View style={[styles.compareTable, { backgroundColor: t.surface, borderColor: t.border }]}>
          <View style={[styles.compareHeader, { borderBottomColor: t.border }]}>
            <Text style={[styles.compareHeaderCell, { color: t.ink3, flex: 2 }]}>الميزة</Text>
            {['مجاني', 'Pro', 'عائلي'].map(h => (
              <Text key={h} style={[styles.compareHeaderCell, { color: t.ink2 }]}>{h}</Text>
            ))}
          </View>
          {COMPARE_ROWS.map((row, i) => (
            <View key={i} style={[styles.compareRow, { borderBottomColor: t.border, borderBottomWidth: i < COMPARE_ROWS.length - 1 ? 1 : 0 }]}>
              <Text style={[styles.compareFeat, { color: t.ink2, flex: 2 }]}>{row.feature}</Text>
              {[row.free, row.pro, row.family].map((v, j) => (
                <Text key={j} style={[styles.compareVal, {
                  color: v === '✓' ? '#22C55E' : v === '✗' ? t.ink3 : v === 'الكل' ? GOLD : t.ink2
                }]}>{v}</Text>
              ))}
            </View>
          ))}
        </View>

        {/* FAQ */}
        <Text style={[styles.faqTitle, { color: t.ink }]}>الأسئلة الشائعة</Text>
        <View style={[styles.faqCard, { backgroundColor: t.surface, borderColor: t.border }]}>
          {FAQS.map((f, i) => <FaqItem key={i} item={f} />)}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {},
  headerGrad: {
    padding: spacing.xl,
    paddingBottom: 24,
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: { color: '#fff', fontSize: 26, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold', marginTop: 8 },
  headerSub: { color: 'rgba(255,255,255,0.65)', fontSize: 14, fontFamily: 'Tajawal_400Regular' },
  scroll: { paddingBottom: 20 },
  billingRow: {
    flexDirection: 'row',
    margin: spacing.xl,
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
    padding: 4,
    gap: 4,
  },
  billingBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  billingActive: {},
  billingText: { fontSize: 14, fontWeight: '700', fontFamily: 'Tajawal_700Bold', zIndex: 1 },
  saveBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    zIndex: 1,
  },
  saveText: { fontSize: 9, fontWeight: '700', fontFamily: 'Tajawal_700Bold' },
  plansRow: { paddingHorizontal: spacing.xl, gap: 12, marginBottom: 24 },
  planWrap: {},
  planCard: {
    borderRadius: 20,
    padding: 18,
    overflow: 'hidden',
    shadowColor: '#141B33',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 5,
  },
  planCardFeatured: { borderWidth: 1, borderColor: 'rgba(201,168,76,0.25)' },
  planBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 10,
  },
  planBadgeText: { color: '#2a1d00', fontSize: 11, fontWeight: '700', fontFamily: 'Tajawal_700Bold' },
  planName: { fontSize: 18, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold' },
  priceRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 4, marginTop: 6, marginBottom: 4 },
  priceNum: { fontSize: 32, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold', lineHeight: 38 },
  priceCurr: { fontSize: 11, fontFamily: 'Tajawal_500Medium' },
  pricePer: { fontSize: 11, fontFamily: 'Tajawal_400Regular' },
  savingText: { fontSize: 12, fontWeight: '600', fontFamily: 'Tajawal_700Bold', marginBottom: 12 },
  featList: { gap: 8, marginVertical: 14 },
  featRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  featCheck: {
    width: 18, height: 18, borderRadius: 5,
    alignItems: 'center', justifyContent: 'center',
  },
  featText: { fontSize: 13, fontFamily: 'Tajawal_400Regular', flex: 1 },
  planCtaWrap: { borderRadius: 12, overflow: 'hidden' },
  planCta: { alignItems: 'center', justifyContent: 'center', paddingVertical: 13, borderRadius: 12 },
  planCtaText: { fontSize: 15, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold' },
  compareTitle: { fontSize: 16, fontWeight: '700', fontFamily: 'Tajawal_700Bold', paddingHorizontal: spacing.xl, marginBottom: 10 },
  compareTable: { marginHorizontal: spacing.xl, borderRadius: 14, borderWidth: 1, overflow: 'hidden', marginBottom: 24 },
  compareHeader: { flexDirection: 'row', padding: 12, borderBottomWidth: 1 },
  compareHeaderCell: { flex: 1, fontSize: 11, fontWeight: '600', fontFamily: 'Tajawal_700Bold', textAlign: 'center' },
  compareRow: { flexDirection: 'row', padding: 12 },
  compareFeat: { fontSize: 12, fontFamily: 'Tajawal_400Regular' },
  compareVal: { flex: 1, fontSize: 12, fontWeight: '600', textAlign: 'center' },
  faqTitle: { fontSize: 16, fontWeight: '700', fontFamily: 'Tajawal_700Bold', paddingHorizontal: spacing.xl, marginBottom: 10 },
  faqCard: { marginHorizontal: spacing.xl, borderRadius: 14, borderWidth: 1, overflow: 'hidden', marginBottom: 16 },
  faqItem: { borderBottomWidth: 1, padding: 14 },
  faqQ: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  faqQText: { fontSize: 13, fontWeight: '600', fontFamily: 'Tajawal_700Bold', flex: 1, marginLeft: 8 },
  faqA: { fontSize: 13, fontFamily: 'Tajawal_400Regular', marginTop: 10, lineHeight: 20 },
});
