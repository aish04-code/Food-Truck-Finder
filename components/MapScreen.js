// StAuth10244: I Aish Patel, 000902820 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

// Documentation: https://github.com/react-native-maps/react-native-maps
// Documentation: https://docs.expo.dev/versions/latest/sdk/location/
// Documentation: https://github.com/react-native-maps/react-native-maps-directions

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDwm8MpvB8vkvgkts3c7yHCh1tFoa3whF4';

export default function MapScreen({ navigation }) {
  const foodTrucks = [
    { id: 1, name: 'Jonny Blonde Food Truck & Catering', cuisine: 'Sandwiches', latitude: 43.2557, longitude: -79.8711 },
    { id: 2, name: 'Curbside Foods', cuisine: 'Mediterranean', latitude: 43.2573, longitude: -79.8643 },
    { id: 3, name: 'The Shuck Truck', cuisine: 'Seafood', latitude: 43.2612, longitude: -79.8696 },
    { id: 4, name: 'Green Machine Food Truck', cuisine: 'Healthy', latitude: 43.2545, longitude: -79.8661 },
    { id: 5, name: 'Andiamo Italian', cuisine: 'Italian', latitude: 43.2523, longitude: -79.8718 },
    { id: 6, name: 'Fry Hard', cuisine: 'Fast Food', latitude: 43.2577, longitude: -79.8640 },
    { id: 7, name: 'Angels Wings and Devils Poutine', cuisine: 'Canadian', latitude: 43.2591, longitude: -79.8713 },
    { id: 8, name: 'NomNomNom Fine Foods & Catering', cuisine: 'Snacks', latitude: 43.2608, longitude: -79.8635 },
  ];

  const [filteredTrucks, setFilteredTrucks] = useState(foodTrucks);
  const [searchQuery, setSearchQuery] = useState('');
  const [region, setRegion] = useState({
    latitude: 43.2557,
    longitude: -79.8711,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [userLocation, setUserLocation] = useState(null);
  const [selectedTruck, setSelectedTruck] = useState(null);

  useEffect(() => {
    // Get user's current location
    const getUserLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };

    getUserLocation();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = foodTrucks.filter((truck) =>
      truck.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTrucks(filtered);
  };

  const handleTruckClick = (truck) => {
    setSelectedTruck(truck);
    setRegion({
      latitude: truck.latitude,
      longitude: truck.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });

    // Show alert and navigate to details screen after the user presses "OK"
    Alert.alert(
      'Truck Selected',
      `You selected ${truck.name}`,
      [
        {
          text: 'OK',
          onPress: () => {
            // Navigate to DetailsScreen after alert is dismissed
            navigation.navigate('DetailsScreen', { truck });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Food Truck Finder</Text>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(reg) => setRegion(reg)}
      >
        {/* User Location Marker */}
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="You are here"
            pinColor="blue"
          />
        )}

        {/* Food Truck Markers */}
        {filteredTrucks.map((truck) => (
          <Marker
            key={truck.id}
            coordinate={{
              latitude: truck.latitude,
              longitude: truck.longitude,
            }}
            title={truck.name}
            description={truck.cuisine}
            onPress={() => handleTruckClick(truck)}
          />
        ))}

        {/* Directions */}
        {userLocation && selectedTruck && (
          <MapViewDirections
            origin={userLocation}
            destination={{
              latitude: selectedTruck.latitude,
              longitude: selectedTruck.longitude,
            }}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={4}
            strokeColor="hotpink"
          />
        )}
      </MapView>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a food truck"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredTrucks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.truckItem}
            onPress={() => handleTruckClick(item)}
          >
            <Text style={styles.truckName}>{item.name}</Text>
            <Text style={styles.truckCuisine}>{item.cuisine}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  map: {
    width: '100%',
    height: '50%',
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    margin: 10,
  },
  truckItem: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
  },
  truckName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  truckCuisine: {
    fontSize: 14,
    color: '#555',
  },
});
