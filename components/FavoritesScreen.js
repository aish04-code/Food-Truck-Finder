// StAuth10244: I Aish Patel, 000902820 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function FavoritesScreen({ route }) {
  const [favorites, setFavorites] = useState([]);

  React.useEffect(() => {
    if (route.params?.truck) {
      const newTruck = route.params.truck;
      if (!favorites.find((truck) => truck.id === newTruck.id)) {
        setFavorites([...favorites, newTruck]);
      }
    }
  }, [route.params?.truck]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Favorite Food Trucks</Text>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.cuisine}>{item.cuisine}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noFavorites}>No favorites added yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cuisine: {
    fontSize: 14,
    color: '#555',
  },
  noFavorites: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});
