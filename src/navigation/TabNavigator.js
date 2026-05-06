import React from 'react';
import { View, StyleSheet } from 'react-native';
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

function TabBar({ state, descriptors, navigation }) {
  const { t, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const tabs = [
    { name: 'Home', label: 'الرئيسية', Icon: HomeIcon },
    { name: 'Classes', label: 'الصفوف', Icon: BookIcon },
    { name: 'Courses', label: 'الدورات', Icon: PathIcon },
    { name: 'Dashboard', label: 'لوحتي', Icon: TrophyIcon },
    { name: 'Account', label: 'حسابي', Icon: UserIcon },
  ];

  return (
    <View style={[
      styles.tabBar,
      {
        backgroundColor: t.surface,
        borderTopColor: t.border,
        paddingBottom: insets.bottom || 8,
      }
    ]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const tab = tabs[index];
        const IconComp = tab?.Icon || HomeIcon;

        return (
          <View key={route.key} style={styles.tabItem}>
            <View
              style={[
                styles.tabBtn,
                isFocused && { backgroundColor: isDark ? 'rgba(201,168,76,0.12)' : 'rgba(201,168,76,0.08)' }
              ]}
            >
              <IconComp
                size={22}
                color={isFocused ? GOLD : t.ink3}
                filled={isFocused}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Classes" component={ClassesScreen} />
      <Tab.Screen name="Courses" component={CoursesScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Account" component={SubscriptionsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingTop: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
