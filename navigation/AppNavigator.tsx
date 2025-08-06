import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import ProductionScreen from '../screens/Production';
import DeliveryScreen from '../screens/Delivery';
import ProfileScreen from '../screens/Profile';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            // Replace with a real icon component if you want
            <Text style={{ color }}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Production"
        component={ProductionScreen}
        options={{
          title: 'Production',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color }}>🏭</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Delivery"
        component={DeliveryScreen}
        options={{
          title: 'Delivery',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color }}>🚚</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color }}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;