// StAuth10244: I Aish Patel, 000902820 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function DetailsScreen({ route, navigation }) {
  const { truck } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{truck.name}</Text>
      <Text style={styles.subtitle}>Cuisine: {truck.cuisine}</Text>
      <Button
        title="Add to Favorites"
        onPress={() => navigation.navigate('FavoritesScreen', { truck })}
      />
      <Button
        title="Review"
        onPress={() => navigation.navigate('ReviewsScreen', { truck })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
});
