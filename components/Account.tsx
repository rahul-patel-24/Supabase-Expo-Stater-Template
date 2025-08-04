import React, { useState, useEffect } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  AppState,
  AppStateStatus,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { supabase } from '../utils/supabase';
import { type Session } from '@supabase/supabase-js';

export default function AppContainer({ session }: { session: Session }) {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, []);

  const handleAppStateChange = (state: AppStateStatus) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <View style={styles.screenContent}>
            <Text style={styles.screenHeader}>Home</Text>
            <Text style={styles.screenText}>Welcome to the Home screen!</Text>
          </View>
        );
      case 'production':
        return (
          <View style={styles.screenContent}>
            <Text style={styles.screenHeader}>Production</Text>
            <Text style={styles.screenText}>Here you can manage production data.</Text>
          </View>
        );
      case 'delivery':
        return (
          <View style={styles.screenContent}>
            <Text style={styles.screenHeader}>Delivery</Text>
            <Text style={styles.screenText}>Track your deliveries here.</Text>
          </View>
        );
      case 'profile':
        return (
          <View style={styles.screenContent}>
            <Text style={styles.screenHeader}>Profile</Text>
            <Text style={styles.screenText}>Signed in as: {session?.user?.email}</Text>
            <TouchableOpacity
              style={[styles.button, styles.signOutButton]}
              onPress={() => supabase.auth.signOut()}
            >
              <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.appContainer}>
        <View style={styles.mainContent}>
          {renderContent()}
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNavigation}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => setActiveTab('home')}
          >
            <Text style={styles.navIcon}>🏠</Text>
            <Text style={[styles.navText, activeTab === 'home' && styles.navTextActive]}>
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => setActiveTab('production')}
          >
            <Text style={styles.navIcon}>📦</Text>
            <Text style={[styles.navText, activeTab === 'production' && styles.navTextActive]}>
              Production
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => setActiveTab('delivery')}
          >
            <Text style={styles.navIcon}>🚚</Text>
            <Text style={[styles.navText, activeTab === 'delivery' && styles.navTextActive]}>
              Delivery
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => setActiveTab('profile')}
          >
            <Text style={styles.navIcon}>👤</Text>
            <Text style={[styles.navText, activeTab === 'profile' && styles.navTextActive]}>
              Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  appContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  mainContent: {
    flex: 1,
  },
  screenContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  screenHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  screenText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOutButton: {
    backgroundColor: '#FF6347',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  navTextActive: {
    color: '#6C63FF',
    fontWeight: 'bold',
  },
});