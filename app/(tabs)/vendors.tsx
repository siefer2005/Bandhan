import BottomNavigationBar from '@/components/BottomNavigationBar';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface Venue {
  id: string;
  name: string;
  location: string;
  rating: number;
  capacity: number;
  priceRange: string;
  imageSource?: any;
  category: string;
}

export default function VendorsScreen() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = ['All', 'Budget Friendly', 'Luxury', 'Outdoor', 'Large Capacity'];

  const venues: Venue[] = [
         {
       id: '1',
       name: 'The Grand Ballroom',
       location: 'Mumbai, Maharashtra',
       rating: 4.8,
       capacity: 500,
       priceRange: '₹50k-1L',
       category: 'Luxury',
       imageSource: require('../../assets/images/garden.png'),
     },
    {
      id: '2',
      name: 'The Royal Palace',
      location: 'Jaipur, Rajasthan',
      rating: 4.9,
      capacity: 800,
      priceRange: '₹75k-1.5L',
      category: 'Luxury',
      imageSource: require('../../assets/images/palace.png'),
    },
         {
       id: '3',
       name: 'The Beach Resort',
       location: 'Goa',
       rating: 4.7,
       capacity: 300,
       priceRange: '₹40k-80k',
       category: 'Outdoor',
       imageSource: require('../../assets/images/w01.jpg'),
     },
    {
      id: '4',
      name: 'Garden Wedding Venue',
      location: 'Bangalore, Karnataka',
      rating: 4.6,
      capacity: 200,
      priceRange: '₹30k-60k',
      category: 'Outdoor',
      imageSource: require('../../assets/images/GW.png'),
    },
    {
      id: '5',
      name: 'Community Hall',
      location: 'Delhi',
      rating: 4.4,
      capacity: 400,
      priceRange: '₹20k-40k',
      category: 'Budget Friendly',
      imageSource: require('../../assets/images/hall.png'),
    },
  ];

  const filteredVenues = venues.filter(venue => {
    const matchesFilter = activeFilter === 'All' || venue.category === activeFilter;
    const matchesSearch = venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         venue.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleBackPress = () => {
    // Handle back navigation
    console.log('Back pressed');
  };

  const handleMenuPress = () => {
    // Handle menu options
    console.log('Menu pressed');
  };

  const handleFilterPress = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleVenuePress = (venue: Venue) => {
    // Handle venue selection
    console.log('Venue selected:', venue.name);
  };

  const renderVenueCard = (venue: Venue) => (
    <TouchableOpacity
      key={venue.id}
      style={styles.venueCard}
      onPress={() => handleVenuePress(venue)}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        {venue.imageSource ? (
          <Image source={venue.imageSource} style={styles.venueImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="image-outline" size={40} color="#9CA3AF" />
            <Text style={styles.placeholderText}>Add Image</Text>
          </View>
        )}
      </View>
      
      <View style={styles.venueInfo}>
        <Text style={styles.venueName}>{venue.name}</Text>
        <Text style={styles.venueLocation}>{venue.location}</Text>
        
        <View style={styles.venueDetails}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#F59E0B" />
            <Text style={styles.rating}>{venue.rating}</Text>
          </View>
          
          <Text style={styles.capacity}>Capacity: {venue.capacity} guests</Text>
        </View>
        
        <Text style={styles.priceRange}>{venue.priceRange}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="chevron-back" size={28} color='#F5F5DC'/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Venues</Text>
        <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
          <Ionicons name="ellipsis-vertical" size={24} color='#F5F5DC' />
        </TouchableOpacity>
      </View>

      {/* Search and Filter Section */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or location"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
                 <TouchableOpacity style={styles.filterButton}>
           <Ionicons name="filter" size={22} color='#F5F5DC' />
         </TouchableOpacity>
      </View>

      {/* Filter Pills */}
      <ScrollView horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterPill,
              activeFilter === filter && styles.activeFilterPill
            ]}
            onPress={() => handleFilterPress(filter)}
          >
            <Text style={[
              styles.filterText,
              activeFilter === filter && styles.activeFilterText
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Venues List */}
      <ScrollView
        style={styles.venuesList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.venuesContent}
      >
        {filteredVenues.map(renderVenueCard)}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigationBar />
    </SafeAreaView>
  );
}

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
    paddingTop: 16,
    paddingBottom: 2,
    backgroundColor: '#6D2932',

  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6D2932',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F5F5DC',
  },
  menuButton: {
    width: 40,
    height: 40,
    backgroundColor: '#6D2932',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 2,
    backgroundColor: '#6D2932',


  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5DC',
    borderRadius: 366,
    paddingHorizontal: 16,
    paddingVertical: 5,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  filterButton: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  filtersContainer: {
    backgroundColor: '#6D2932',
    borderBottomWidth: 1,
    borderBottomColor: '#6D2932',
    maxHeight: 52,
  },
  filtersContent: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#6D2932',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeFilterPill: {
    backgroundColor: '#F5F5DC',
    borderColor: '#ffff'
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffff',
  },
  activeFilterText: {
    color: '#000000',
  },
  venuesList: {
    flex: 1,
  },
  venuesContent: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 20,
  },
  venueCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  venueImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 8,
  },
  venueInfo: {
    padding: 16,
  },
  venueName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  venueLocation: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  venueDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 4,
  },
  capacity: {
    fontSize: 14,
    color: '#6B7280',
  },
  priceRange: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6D2932',
  },
});
