import React from 'react';
import { useNavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../theme';
import AppDrawer from '../components/AppDrawer';
import TabNavigator from './TabNavigator';
import GradeSubjectsScreen from '../screens/GradeSubjectsScreen';
import SubjectDetailsScreen from '../screens/SubjectDetailsScreen';
import LessonsUnitsScreen from '../screens/LessonsUnitsScreen';
import LessonPlayerScreen from '../screens/LessonPlayerScreen';

const Stack = createNativeStackNavigator();

function DrawerWrapper({ navigation }) {
  const state = navigation.getState?.();
  const currentRoute = state?.routes?.[state?.index]?.name || 'Home';
  return <AppDrawer navigation={navigation} currentRoute={currentRoute} />;
}

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigatorWithDrawer} />
      <Stack.Screen name="GradeSubjects"   component={GradeSubjectsScreen} />
      <Stack.Screen name="SubjectDetails"  component={SubjectDetailsScreen} />
      <Stack.Screen name="LessonsUnits"    component={LessonsUnitsScreen} />
      <Stack.Screen name="LessonPlayer"    component={LessonPlayerScreen} />
    </Stack.Navigator>
  );
}

function TabNavigatorWithDrawer({ navigation }) {
  return (
    <>
      <TabNavigator />
      <DrawerWrapper navigation={navigation} />
    </>
  );
}
