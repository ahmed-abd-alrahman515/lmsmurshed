import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import GradeSubjectsScreen from '../screens/GradeSubjectsScreen';
import SubjectDetailsScreen from '../screens/SubjectDetailsScreen';
import LessonsUnitsScreen from '../screens/LessonsUnitsScreen';
import LessonPlayerScreen from '../screens/LessonPlayerScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="GradeSubjects" component={GradeSubjectsScreen} />
      <Stack.Screen name="SubjectDetails" component={SubjectDetailsScreen} />
      <Stack.Screen name="LessonsUnits" component={LessonsUnitsScreen} />
      <Stack.Screen name="LessonPlayer" component={LessonPlayerScreen} />
    </Stack.Navigator>
  );
}
