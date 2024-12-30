// StAuth10244: I Aish Patel, 000902820 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MapScreen from './components/MapScreen';
import DetailsScreen from './components/DetailsScreen';
import FavoritesScreen from './components/FavoritesScreen';
import ReviewsScreen from './components/ReviewsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MapScreen">
        <Stack.Screen name="MapScreen" component={MapScreen} options={{ title: 'Food Truck Finder' }} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} options={{ title: 'Truck Details' }} />
        <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} options={{ title: 'Favorites' }} />
        <Stack.Screen name="ReviewsScreen" component={ReviewsScreen} options={{ title: 'Reviews' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
