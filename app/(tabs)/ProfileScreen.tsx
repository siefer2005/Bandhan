import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

const ProfileScreen: React.FC = () => {
  const { user, signOut } = useAuth();
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Mock wedding date - June 15, 2024
  const weddingDate = new Date('2024-06-15T00:00:00');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    signOut();
  };

  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      
      <View style={styles.profileSection}>
        <View style={styles.profilePicture}>
          <Ionicons name="person" size={60} color="#6D2932" />
        </View>
        <Text style={styles.profileName}>Animesh Ansh Yadav</Text>
        <Text style={styles.partnerText}>with XYZ</Text>
        <Text style={styles.dateText}>June 15, 2024</Text>
        
        <TouchableOpacity style={styles.editProfileButton}>
          <Ionicons name="pencil" size={16} color="#000000" />
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      
      <View style={styles.countdownSection}>
        <View style={styles.countdownBox}>
          <Text style={styles.countdownNumber}>{countdown.days}</Text>
          <Text style={styles.countdownLabel}>Days</Text>
        </View>
        <View style={styles.countdownBox}>
          <Text style={styles.countdownNumber}>{countdown.hours.toString().padStart(2, '0')}</Text>
          <Text style={styles.countdownLabel}>Hours</Text>
        </View>
        <View style={styles.countdownBox}>
          <Text style={styles.countdownNumber}>{countdown.minutes.toString().padStart(2, '0')}</Text>
          <Text style={styles.countdownLabel}>Minutes</Text>
        </View>
        <View style={styles.countdownBox}>
          <Text style={styles.countdownNumber}>{countdown.seconds.toString().padStart(2, '0')}</Text>
          <Text style={styles.countdownLabel}>Seconds</Text>
        </View>
      </View>

      
      <View style={styles.planningSection}>
        <Text style={styles.planningTitle}>Wedding Planning</Text>
        
        <TouchableOpacity style={styles.planningItem}>
          <Ionicons name="people" size={24} color="#6D2932"  />
          <Text style={styles.planningText}>Guest List</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.planningItem}>
          <Ionicons name="briefcase" size={24} color="#6D2932"  />
          <Text style={styles.planningText}>Vendors</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.planningItem}>
          <Ionicons name="images" size={24} color="#6D2932"  />
          <Text style={styles.planningText}>Mood Board</Text>
        </TouchableOpacity>
      </View>

      
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out" size={20} color="#6D2932"  />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6D2932', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F5F5DC',
  },
  settingsButton: {
    padding: 8,
    color: '#F5F5DC',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F5F5DC', // Light beige background
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    overflow: 'hidden',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F5F5DC',
    marginBottom: 5,
  },
  partnerText: {
    fontSize: 16,
    color: '#F5F5DC', // Light grey
    marginBottom: 5,
  },
  dateText: {
    fontSize: 16,
    color: '#F5F5DC', 
    marginBottom: 20,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5DC', 
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
  },
  editProfileText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
  },
  countdownSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  countdownBox: {
    backgroundColor: '#F5F5DC', // Slightly lighter maroon
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    minWidth: 70,
  },
  countdownNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6D2932',
    marginBottom: 5,
  },
  countdownLabel: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
  },
  planningSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  planningTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F5F5DC',
    marginBottom: 20,
  },
  planningItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5DC', // Slightly lighter maroon
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    gap: 15,
  },
  planningText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5DC', // Slightly lighter maroon
    marginHorizontal: 20,
    marginVertical: 30,
    padding: 15,
    borderRadius: 12,
    justifyContent: 'center',
    gap: 10,
  },
  logoutText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default ProfileScreen;
