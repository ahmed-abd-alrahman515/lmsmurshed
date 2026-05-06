import React, { useEffect, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Animated,
  Dimensions, Modal, ScrollView, Switch
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, GOLD, GOLD_GRAD, BLUE_GRAD, spacing } from '../theme';
import BrandMark from './BrandMark';
import Avatar from './Avatar';
import {
  HomeIcon, BookIcon, PathIcon, TrophyIcon, UserIcon,
  SparkleIcon, ChevronRightIcon
} from './Icons';

const W = Dimensions.get('window').width;
const DRAWER_W = W * 0.82;

const LANGUAGES = [
  { code: 'AR', label: 'العربية', flag: '🇸🇩' },
  { code: 'EN', label: 'English', flag: '🇬🇧' },
  { code: 'FR', label: 'Français', flag: '🇫🇷' },
];

function NavItem({ icon: Icon, label, onPress, active }) {
  const { t } = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={[styles.navItem, active && { backgroundColor: 'rgba(201,168,76,0.1)' }]}
    >
      <View style={[styles.navIcon, active && { backgroundColor: 'rgba(201,168,76,0.15)' }]}>
        <Icon size={20} color={active ? GOLD : t.ink2} filled={active} />
      </View>
      <Text style={[styles.navLabel, { color: active ? GOLD : t.ink2 }]}>{label}</Text>
      {active && <View style={styles.navActiveDot} />}
    </TouchableOpacity>
  );
}

export default function AppDrawer({ navigation, currentRoute }) {
  const { t, isDark, setIsDark, language, setLanguage, drawerOpen, setDrawerOpen, tr } = useTheme();
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(DRAWER_W)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (drawerOpen) {
      Animated.parallel([
        Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, tension: 80, friction: 12 }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(slideAnim, { toValue: DRAWER_W, useNativeDriver: true, tension: 100, friction: 14 }),
        Animated.timing(fadeAnim, { toValue: 0, duration: 180, useNativeDriver: true }),
      ]).start();
    }
  }, [drawerOpen]);

  const close = () => setDrawerOpen(false);

  const navItems = [
    { key: 'Home', label: tr.home, Icon: HomeIcon },
    { key: 'Classes', label: tr.classes, Icon: BookIcon },
    { key: 'Courses', label: tr.courses, Icon: PathIcon },
    { key: 'Dashboard', label: tr.dashboard, Icon: TrophyIcon },
    { key: 'Account', label: tr.subscriptions, Icon: UserIcon },
  ];

  const navigate = (screen) => {
    close();
    setTimeout(() => navigation?.navigate(screen), 200);
  };

  return (
    <Modal visible={drawerOpen} transparent animationType="none" onRequestClose={close}>
      {/* Backdrop */}
      <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
        <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={close} />
      </Animated.View>

      {/* Drawer panel */}
      <Animated.View style={[
        styles.drawer,
        { backgroundColor: t.surface, transform: [{ translateX: slideAnim }] }
      ]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          {/* Header */}
          <LinearGradient colors={BLUE_GRAD} style={[styles.drawerHeader, { paddingTop: insets.top + 16 }]}>
            <View style={styles.brandRow}>
              <BrandMark size={40} />
              <View style={{ flex: 1 }}>
                <Text style={styles.brandName}>{tr.appName}</Text>
                <Text style={styles.brandSub}>{tr.appTagline}</Text>
              </View>
              <TouchableOpacity onPress={close} style={styles.closeBtn}>
                <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 20 }}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* User card */}
            <View style={styles.userCard}>
              <Avatar name="أ" size={44} hue={50} />
              <View style={{ flex: 1 }}>
                <Text style={styles.userName}>أحمد الحارثي</Text>
                <LinearGradient colors={GOLD_GRAD} style={styles.proBadge}>
                  <SparkleIcon size={9} color="#2a1d00" />
                  <Text style={styles.proBadgeText}>Pro</Text>
                </LinearGradient>
              </View>
            </View>
          </LinearGradient>

          {/* Nav links */}
          <View style={[styles.section, { borderBottomColor: t.border }]}>
            {navItems.map(item => (
              <NavItem
                key={item.key}
                icon={item.Icon}
                label={item.label}
                active={currentRoute === item.key}
                onPress={() => navigate(item.key)}
              />
            ))}
          </View>

          {/* Dark / Light toggle */}
          <View style={[styles.section, { borderBottomColor: t.border }]}>
            <View style={styles.toggleRow}>
              <Text style={{ fontSize: 20 }}>{isDark ? '🌙' : '☀️'}</Text>
              <Text style={[styles.toggleLabel, { color: t.ink }]}>
                {isDark ? tr.darkMode : tr.lightMode}
              </Text>
              <Switch
                value={isDark}
                onValueChange={setIsDark}
                trackColor={{ false: '#E5E7EE', true: '#2B3F7A' }}
                thumbColor={isDark ? GOLD : '#fff'}
              />
            </View>
          </View>

          {/* Language switcher */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: t.ink3 }]}>{tr.language}</Text>
            <View style={styles.langRow}>
              {LANGUAGES.map(lang => (
                <TouchableOpacity
                  key={lang.code}
                  activeOpacity={0.75}
                  onPress={() => setLanguage(lang.code)}
                  style={[
                    styles.langBtn,
                    { borderColor: language === lang.code ? GOLD : t.border,
                      backgroundColor: language === lang.code ? 'rgba(201,168,76,0.1)' : t.chip }
                  ]}
                >
                  <Text style={{ fontSize: 18 }}>{lang.flag}</Text>
                  <Text style={[styles.langLabel, { color: language === lang.code ? GOLD : t.ink2 }]}>
                    {lang.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Logout */}
          <TouchableOpacity style={[styles.logoutBtn, { borderColor: t.border }]}>
            <Text style={{ fontSize: 18 }}>👋</Text>
            <Text style={[styles.logoutText, { color: '#EF4444' }]}>{tr.logout}</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10,14,28,0.6)',
  },
  drawer: {
    position: 'absolute',
    top: 0, bottom: 0, right: 0,
    width: DRAWER_W,
    shadowColor: '#000',
    shadowOffset: { width: -6, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  drawerHeader: { padding: spacing.xl, paddingBottom: 20 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  brandName: { color: '#fff', fontSize: 20, fontWeight: '800', fontFamily: 'Tajawal_800ExtraBold' },
  brandSub: { color: 'rgba(255,255,255,0.6)', fontSize: 10, fontFamily: 'Tajawal_400Regular', marginTop: 2 },
  closeBtn: {
    width: 32, height: 32, borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center', justifyContent: 'center',
  },
  userCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16, padding: 12,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  userName: { color: '#fff', fontSize: 15, fontWeight: '700', fontFamily: 'Tajawal_700Bold', marginBottom: 6 },
  proBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 7,
  },
  proBadgeText: { color: '#2a1d00', fontSize: 10, fontWeight: '700', fontFamily: 'Tajawal_700Bold' },
  section: { paddingVertical: 8, paddingHorizontal: spacing.md, borderBottomWidth: 1 },
  sectionTitle: { fontSize: 11, fontWeight: '600', letterSpacing: 0.5, marginBottom: 8, marginLeft: 4 },
  navItem: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 12, paddingHorizontal: 12, borderRadius: 14, marginVertical: 2,
  },
  navIcon: { width: 38, height: 38, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  navLabel: { flex: 1, fontSize: 15, fontWeight: '600', fontFamily: 'Tajawal_700Bold' },
  navActiveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: GOLD },
  toggleRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 10, paddingHorizontal: 4,
  },
  toggleLabel: { flex: 1, fontSize: 15, fontWeight: '600', fontFamily: 'Tajawal_700Bold' },
  langRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  langBtn: {
    flex: 1, minWidth: 80, alignItems: 'center', gap: 4,
    paddingVertical: 10, paddingHorizontal: 8, borderRadius: 12, borderWidth: 1.5,
  },
  langLabel: { fontSize: 11, fontWeight: '600', fontFamily: 'Tajawal_700Bold' },
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    margin: spacing.xl, padding: 14, borderRadius: 14, borderWidth: 1,
  },
  logoutText: { fontSize: 15, fontWeight: '600', fontFamily: 'Tajawal_700Bold' },
});
