import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BottomNavigationBar() {
  const router = useRouter();
  const pathname = usePathname();
  
  // Determine active tab based on current route
  const getActiveTab = () => {
    if (pathname.includes('checklist') || pathname.includes('index')) return 'checklist';
    if (pathname.includes('vendors')) return 'vendors';
    if (pathname.includes('guests')) return 'guests';
    if (pathname.includes('budget')) return 'budget';
    return 'checklist';
  };
  
  const activeTab = getActiveTab();
  const tabs = [
    {
      name: 'checklist',
      label: 'Checklist',
      icon: 'checkmark-circle-outline',
      activeIcon: 'checkmark-circle',
      route: '/(tabs)/checklist' as const,
    },
    {
      name: 'vendors',
      label: 'Venue',
      icon: 'people-outline',
      activeIcon: 'people',
      route: '/(tabs)/vendors' as const,
    },
    {
      name: 'guests',
      label: 'Guests',
      icon: 'person-outline',
      activeIcon: 'person',
      route: '/(tabs)/guests' as const,
    },
    {
      name: 'budget',
      label: 'Budget',
      icon: 'wallet-outline',
      activeIcon: 'wallet',
      route: '/(tabs)/budget' as const,
    },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name;
        // Animated scale for icon
        const scaleAnim = useRef(new Animated.Value(isActive ? 1.2 : 1)).current;

        useEffect(() => {
          Animated.spring(scaleAnim, {
            toValue: isActive ? 1.2 : 1,
            useNativeDriver: true,
            friction: 5,
          }).start();
        }, [isActive]);

        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => router.push(tab.route)}
            activeOpacity={0.7}
          >
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <Ionicons
                name={isActive ? (tab.activeIcon as any) : (tab.icon as any)}
                size={24}
                color={isActive ? '#ffff' : '#000000'}
              />
            </Animated.View>
            <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#6D2932',
    paddingTop: 1,
    paddingBottom: 2,
    paddingHorizontal: 16,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabLabel: {
    fontSize: 12,
    color: '#F5F5DC',
    marginTop: 4,
    fontWeight: '500',
  },
  activeTabLabel: {
    color: '#F5F5DC',
    fontWeight: '600',
  },
});
