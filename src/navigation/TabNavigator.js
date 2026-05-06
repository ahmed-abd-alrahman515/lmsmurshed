import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, GOLD } from '../theme';
import { HomeIcon, BookIcon, PathIcon, TrophyIcon, UserIcon } from '../components/Icons';

import HomeScreen from '../screens/HomeScreen';
import ClassesScreen from '../screens/ClassesScreen';
import CoursesScreen from '../screens/CoursesScreen';
import DashboardScreen from '../screens/DashboardScreen';
import SubscriptionsScreen from '../screens/SubscriptionsScreen';

const Tab = createBottomTabNavigator();

function CustomTabBar({ state, navigation }) {
  const { t, tr } = useTheme();
  const insets = useSafeAreaInsets();

  const tabs = [
    { name: 'Home',      Icon: HomeIcon,    label: tr.home },
    { name: 'Classes',   Icon: BookIcon,    label: tr.classes },
    { name: 'Courses',   Icon: PathIcon,    label: tr.courses },
    { name: 'Dashboard', Icon: TrophyIcon,  label: tr.dashboard },
    { name: 'Account',   Icon: UserIcon,    label: tr.account },
  ];

  return (
    <View style={[
      styles.tabBar,
      { backgroundColor: t.surface, borderTopColor: t.border, paddingBottom: insets.bottom || 8 }
    ]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const tab = tabs[index];
        if (!tab) return null;
        const Icon = tab.Icon;

        return (
          <TouchableOpacity
            key={route.key}
            activeOpacity={0.7}
            onPress={() => navigation.navigate(route.name)}
            style={styles.tabItem}
          >
            <View style={[styles.tabIconWrap, isFocused && styles.tabIconActive]}>
              <Icon size={21} color={isFocused ? GOLD : t.ink3} filled={isFocused} />
            </View>
            <Text style={[styles.tabLabel, { color: isFocused ? GOLD : t.ink3 }]} numberOfLines={1}>
              {tab.label}
            </Text>
            {isFocused && <View style={styles.tabDot} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home"      component={HomeScreen} />
      <Tab.Screen name="Classes"   component={ClassesScreen} />
      <Tab.Screen name="Courses"   component={CoursesScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Account"   component={SubscriptionsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingTop: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 2,
    gap: 3,
  },
  tabIconWrap: {
    width: 44, height: 36, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  tabIconActive: {
    backgroundColor: 'rgba(201,168,76,0.1)',
  },
  tabLabel: {
    fontSize: 10,
    fontFamily: 'Tajawal_500Medium',
    fontWeight: '500',
  },
  tabDot: {
    width: 4, height: 4, borderRadius: 2,
    backgroundColor: GOLD, marginTop: 1,
  },
});
