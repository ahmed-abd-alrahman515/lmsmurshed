import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CompassIcon } from './Icons';

export default function BrandMark({ size = 36 }) {
  return (
    <LinearGradient
      colors={['#2B3F7A', '#111A3A']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, { width: size, height: size, borderRadius: size * 0.31 }]}
    >
      <CompassIcon size={size * 0.6} color="#C9A84C" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: '#0F1A37',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
});
