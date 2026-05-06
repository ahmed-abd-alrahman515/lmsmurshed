import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Avatar({ name = 'أ', size = 40, hue = 260 }) {
  // hue-based gradient approximation
  const gradients = {
    260: ['#4A5EC9', '#1A2360'],
    85: ['#D4B96A', '#8E6B1E'],
    200: ['#38B2AC', '#1A6B67'],
    320: ['#C95A8C', '#5C1A3E'],
  };
  const closes = Object.keys(gradients).reduce((a, b) =>
    Math.abs(b - hue) < Math.abs(a - hue) ? b : a
  );
  const [c1, c2] = gradients[closes] || gradients[260];

  return (
    <LinearGradient
      colors={[c1, c2]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}
    >
      <Text style={[styles.text, { fontSize: size * 0.42 }]}>{name}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#141B33',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  text: {
    color: '#fff',
    fontWeight: '800',
    fontFamily: 'Tajawal_800ExtraBold',
  },
});
