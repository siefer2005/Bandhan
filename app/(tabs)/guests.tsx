import BottomNavigationBar from '@/components/BottomNavigationBar';
import { useAuth } from '@/contexts/AuthContext';
import { Guest, guestService } from '@/services/firebaseService';
import { Ionicons } from '@expo/vector-icons';
import * as Contacts from 'expo-contacts';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';



export default function GuestsScreen() {
  const [importedContacts, setImportedContacts] = useState<Contacts.Contact[]>([]);
  const { user } = useAuth();
  const [guests, setGuests] = useState<Guest[]>([]);
  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestPlusOne, setNewGuestPlusOne] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isContactsModalVisible, setIsContactsModalVisible] = useState(false);
  const [allDeviceContacts, setAllDeviceContacts] = useState<Contacts.Contact[]>([]);
  const [contactsSearch, setContactsSearch] = useState('');

  
  useEffect(() => {
    if (user?.id) {
      loadGuests();
    }
  }, [user?.id]);

  const loadGuests = async () => {
    try {
      setIsLoading(true);
      const fetchedGuests = await guestService.getGuests(user!.id);
      setGuests(fetchedGuests);
    } catch (error) {
      console.error('Error loading guests:', error);
      Alert.alert('Error', 'Failed to load guests');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackPress = () => {
    
    console.log('Back pressed');
  };

  const handleAddGuest = async () => {
    if (!user?.id) {
      Alert.alert('Error', 'Please sign in to add guests');
      return;
    }

    if (newGuestName.trim()) {
      try {
        const newGuest = {
          userId: user.id,
          name: newGuestName.trim(),
          rsvpStatus: 'pending' as const,
          ...(newGuestPlusOne.trim() && { plusOne: newGuestPlusOne.trim() }),
        };

        await guestService.addGuest(newGuest);
        await loadGuests(); 
        setNewGuestName('');
        setNewGuestPlusOne('');
      } catch (error) {
        console.error('Error adding guest:', error);
        Alert.alert('Error', 'Failed to add guest');
      }
    } else {
      Alert.alert('Error', 'Please enter a guest name');
    }
  };

  const handleImportContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      });
      
      interface DeviceContact {
        id: string;
        name: string;
        phoneNumbers?: { number: string }[];
        [key: string]: any;
      }

      const filteredContacts: DeviceContact[] = (data as DeviceContact[]).filter(
        (c: DeviceContact) => c.name && c.phoneNumbers && c.phoneNumbers.length > 0
      );
      setAllDeviceContacts(filteredContacts as unknown as Contacts.Contact[]);
      setIsContactsModalVisible(true);
    } else {
      Alert.alert('Permission Denied', 'Cannot access contacts without permission');
    }
  };

  const handleSelectDeviceContact = async (contact: Contacts.Contact) => {
    if (!user?.id) {
      Alert.alert('Error', 'Please sign in to add guests');
      return;
    }
    try {
      const newGuest = {
        userId: user.id,
        name: contact.name ?? 'Unknown',
        rsvpStatus: 'pending' as const,
        plusOne:
          contact.phoneNumbers && contact.phoneNumbers.length > 0
            ? contact.phoneNumbers[0].number
            : undefined,
      };
      await guestService.addGuest(newGuest);
      await loadGuests();
      Alert.alert('Imported', `${contact.name} added to guest list`);
    } catch (error) {
      console.error('Error importing contact:', error);
      Alert.alert('Error', 'Failed to import contact');
    }
  };
  const handleRSVPChange = async (guestId: string, status: Guest['rsvpStatus']) => {
    try {
      await guestService.updateGuest(guestId, { rsvpStatus: status });
      await loadGuests(); // Reload the list
    } catch (error) {
      console.error('Error updating guest:', error);
      Alert.alert('Error', 'Failed to update guest');
    }
  };

  const handleDeleteGuest = (guestId: string) => {
    Alert.alert(
      'Delete Guest',
      'Are you sure you want to remove this guest?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await guestService.deleteGuest(guestId);
              await loadGuests(); // Reload the list
            } catch (error) {
              console.error('Error deleting guest:', error);
              Alert.alert('Error', 'Failed to delete guest');
            }
          }
        },
      ]
    );
  };

  const getRSVPColor = (status: Guest['rsvpStatus']) => {
    switch (status) {
      case 'confirmed': return '#10B981';
      case 'declined': return '#EF4444';
      case 'pending': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getRSVPText = (status: Guest['rsvpStatus']) => {
    switch (status) {
      case 'confirmed': return 'Confirmed';
      case 'declined': return 'Declined';
      case 'pending': return 'Pending';
      default: return 'Pending';
    }
  };

  const renderGuestCard = (guest: Guest) => (
    <View key={guest.id} style={styles.guestCard}>
      <View style={styles.guestInfo}>
        <Text style={styles.guestName}>{guest.name}</Text>
        {guest.plusOne && (
          <Text style={styles.plusOne}>+ {guest.plusOne}</Text>
        )}
      </View>

      <View style={styles.guestActions}>
        <View style={[styles.rsvpStatus, { backgroundColor: getRSVPColor(guest.rsvpStatus) }]}>
          <Text style={styles.rsvpText}>{getRSVPText(guest.rsvpStatus)}</Text>
        </View>

        <View style={styles.rsvpButtons}>
          <TouchableOpacity
            style={[
              styles.rsvpButton,
              guest.rsvpStatus === 'confirmed' && styles.activeRSVPButton
            ]}
            onPress={() => guest.id && handleRSVPChange(guest.id, 'confirmed')}
          >
            <Ionicons
              name="checkmark-circle"
              size={16}
              color={guest.rsvpStatus === 'confirmed' ? '#FFFFFF' : '#10B981'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.rsvpButton,
              guest.rsvpStatus === 'declined' && styles.activeRSVPButton
            ]}
            onPress={() => guest.id && handleRSVPChange(guest.id, 'declined')}
          >
            <Ionicons
              name="close-circle"
              size={16}
              color={guest.rsvpStatus === 'declined' ? '#FFFFFF' : '#EF4444'}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => guest.id && handleDeleteGuest(guest.id)}
        >
          <Ionicons name="trash-outline" size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const confirmedCount = guests.filter(g => g.rsvpStatus === 'confirmed').length;
  const pendingCount = guests.filter(g => g.rsvpStatus === 'pending').length;
  const declinedCount = guests.filter(g => g.rsvpStatus === 'declined').length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="chevron-back" size={24} color='#F5F5DC' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Guest List</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
  
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{guests.length}</Text>
            <Text style={styles.statLabel}>Total Guests</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{confirmedCount}</Text>
            <Text style={styles.statLabel}>Confirmed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{pendingCount}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{declinedCount}</Text>
            <Text style={styles.statLabel}>Declined</Text>
          </View>
        </View>

       
        <View style={styles.addGuestSection}>
          <Text style={styles.sectionTitle}>Add New Guest</Text>
          <View style={styles.addGuestForm}>
            <TextInput
              style={styles.input}
              placeholder="Guest Name"
              value={newGuestName}
              onChangeText={setNewGuestName}
              placeholderTextColor="#9CA3AF"
            />
            <TextInput
              style={styles.input}
              placeholder="Extra (Optional)"
              value={newGuestPlusOne}
              onChangeText={setNewGuestPlusOne}
              placeholderTextColor="#9CA3AF"
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddGuest}>
              <Ionicons name="add" size={20} color="#FFFFFF" />
              <Text style={styles.addButtonText}>Add Guest</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.importButton} onPress={handleImportContacts}>
            <Ionicons name="download-outline" size={20} color="#6D2932" />
            <Text style={styles.importButtonText}>Import Contacts from Device</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.guestListSection}>
          <Text style={styles.sectionTitle}>Guest List ({guests.length})</Text>
          {guests.length > 0 ? (
            guests.map(renderGuestCard)
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="people-outline" size={48} color="#9CA3AF" />
              <Text style={styles.emptyText}>No guests added yet</Text>
              <Text style={styles.emptySubtext}>Add your first guest above</Text>
            </View>
          )}
        </View>

        
        {importedContacts.length > 0 && (
          <View style={styles.importedContactsSection}>
            <Text style={styles.sectionTitle}>Imported Contacts</Text>
            {importedContacts.map(contact => (
              <View key={contact.id} style={styles.guestCard}>
                <View style={styles.guestInfo}>
                  <Text style={styles.guestName}>{contact.name}</Text>
                  {contact.phoneNumbers && contact.phoneNumbers.length > 0 && (
                    <Text style={styles.plusOne}>{contact.phoneNumbers[0].number}</Text>
                  )}
                </View>

                <View style={styles.guestActions}>
                  <View style={[styles.rsvpStatus, { backgroundColor: '#F59E0B' }]}> 
                    <Text style={styles.rsvpText}>Pending</Text>
                  </View>
                  <View style={styles.rsvpButtons}>
                    <TouchableOpacity
                      style={styles.rsvpButton}
                      onPress={async () => {
                        if (!user?.id) return;
                        const newGuest = {
                          userId: user.id,
                          name: contact.name,
                          rsvpStatus: 'confirmed' as const,
                          plusOne: contact.phoneNumbers && contact.phoneNumbers.length > 0 ? contact.phoneNumbers[0].number : undefined,
                        };
                        await guestService.addGuest(newGuest);
                        await loadGuests();
                        setImportedContacts(importedContacts.filter(c => c.id !== contact.id));
                      }}
                    >
                      <Ionicons
                        name="checkmark-circle"
                        size={16}
                        color={'#10B981'}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.rsvpButton}
                      onPress={async () => {
                        if (!user?.id) return;
                        const newGuest = {
                          userId: user.id,
                          name: contact.name,
                          rsvpStatus: 'declined' as const,
                          plusOne: contact.phoneNumbers && contact.phoneNumbers.length > 0 ? contact.phoneNumbers[0].number : undefined,
                        };
                        await guestService.addGuest(newGuest);
                        await loadGuests();
                        setImportedContacts(importedContacts.filter(c => c.id !== contact.id));
                      }}
                    >
                      <Ionicons
                        name="close-circle"
                        size={16}
                        color={'#EF4444'}
                      />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => setImportedContacts(importedContacts.filter(c => c.id !== contact.id))}
                  >
                    <Ionicons name="trash-outline" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <Modal
        visible={isContactsModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsContactsModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select a Contact</Text>
              <TouchableOpacity onPress={() => setIsContactsModalVisible(false)}>
                <Ionicons name="close" size={22} color="#111827" />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.modalSearchInput}
              placeholder="Search contacts"
              placeholderTextColor="#9CA3AF"
              value={contactsSearch}
              onChangeText={setContactsSearch}
            />
            <FlatList
              data={allDeviceContacts.filter(c =>
                (c.name ?? '').toLowerCase().includes(contactsSearch.toLowerCase())
              )}
              keyExtractor={(item, index) => item.id ?? `${item.name ?? 'contact'}-${index}`}
              renderItem={({ item }) => (
                <View style={styles.modalContactRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.importedContactName}>{item.name}</Text>
                    {item.phoneNumbers && item.phoneNumbers.length > 0 && (
                      <Text style={styles.importedContactPhone}>{item.phoneNumbers[0].number}</Text>
                    )}
                  </View>
                  <TouchableOpacity
                    style={styles.modalImportBtn}
                    onPress={() => handleSelectDeviceContact(item)}
                  >
                    <Text style={styles.modalImportBtnText}>Import</Text>
                  </TouchableOpacity>
                </View>
              )}
              ListEmptyComponent={() => (
                <View style={{ paddingVertical: 24, alignItems: 'center' }}>
                  <Text style={{ color: '#6B7280' }}>No contacts found</Text>
                </View>
              )}
            />
          </View>
        </View>
      </Modal>

     
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
    paddingBottom: 16,
    backgroundColor: '#6D2932',
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#6D2932',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F5F5DC',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F5F5DC',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 3,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  addGuestSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  addGuestForm: {
    backgroundColor: '#F5F5DC',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    fontSize: 16,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  addButton: {
    backgroundColor: '#FFDF00',
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  guestListSection: {
    marginBottom: 24,
  },
  importedContactsSection: {
    marginBottom: 24,
    backgroundColor: '#F5F5DC',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  importedContactCard: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  importedContactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  importedContactPhone: {
    fontSize: 14,
    color: '#6B7280',
  },
  importButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5DC',
    borderRadius: 8,
    paddingVertical: 12,
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  importButtonText: {
    color: '#6D2932',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    maxHeight: '80%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  modalSearchInput: {
    margin: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  modalContactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalImportBtn: {
    backgroundColor: '#FFDF00',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  modalImportBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  guestCard: {
    backgroundColor: '#F5F5DC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  guestInfo: {
    marginBottom: 12,
  },
  guestName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  plusOne: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  guestActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rsvpStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  rsvpText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F5F5DC',
  },
  rsvpButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  rsvpButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5DC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeRSVPButton: {
    backgroundColor: '#FFDF00',
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
  },
});
