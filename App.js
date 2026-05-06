import 'react-native-gesture-handler';
import React, { useState, useEffect, useCallback } from 'react';
import { I18nManager, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  useFonts,
  Tajawal_400Regular,
  Tajawal_500Medium,
  Tajawal_700Bold,
  Tajawal_800ExtraBold,
} from '@expo-google-fonts/tajawal';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeContext, getTheme } from './src/theme';
import { translations } from './src/theme/translations';
import RootNavigator from './src/navigation/RootNavigator';

I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState('AR');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const t = getTheme(isDark);
  const tr = translations[language] || translations.AR;

  const [fontsLoaded] = useFonts({
    Tajawal_400Regular,
    Tajawal_500Medium,
    Tajawal_700Bold,
    Tajawal_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeContext.Provider value={{
          isDark, setIsDark, t, language, setLanguage,
          tr, drawerOpen, setDrawerOpen,
        }}>
          <StatusBar
            barStyle={isDark ? 'light-content' : 'dark-content'}
            backgroundColor={t.bg}
          />
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </ThemeContext.Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
