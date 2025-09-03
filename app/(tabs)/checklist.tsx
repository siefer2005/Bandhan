import BottomNavigationBar from '@/components/BottomNavigationBar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface ChecklistItem {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  category: string;
  timeline: string;
}

export default function ChecklistScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    {
      id: '1',
      title: 'Find Your Venues',
      description: 'Start by having a conversation with your future bride or groom about your must-have features. Does it matter to you if your guests can stay the night, if you\'re the only ones to use the venue that day, or how many people it can hold?',
      isCompleted: false,
      category: 'Venue',
      timeline: '4 months'
    },
    {
      id: '2',
      title: 'Start Planning Your Guest List',
      description: 'Start by adding everyone you\'ve invited or plan to invite. Attach guests to a party to keep track of your head and table count.',
      isCompleted: false,
      category: 'Guests',
      timeline: '4 months'
    },
    {
      id: '3',
      title: 'Set A Budget',
      description: 'The first step to a budget - make a note of who will contribute. Decide on a total estimated budget.',
      isCompleted: false,
      category: 'Budget',
      timeline: '4 months'
    },
    {
      id: '4',
      title: 'Make Your Venue Choice',
      description: 'Everybody who came with you on your visits will doubtless have feedback for you. Listen to their opinions, but remember that it\'s your wedding.',
      isCompleted: false,
      category: 'Venue',
      timeline: '4 months'
    },
    {
      id: '5',
      title: 'Do Right by the Eyes of the Law',
      description: 'Decide if you\'re having a religious or civil ceremony. Notify your religious institution or local officials.',
      isCompleted: false,
      category: 'Legal',
      timeline: '4 months'
    },
    {
      id: '6',
      title: 'Book Your Venue',
      description: 'Choose the venue you want to get married at! Notify your venue that you would like to book them.',
      isCompleted: false,
      category: 'Venue',
      timeline: '4 months'
    },
    {
      id: '7',
      title: 'Gather Your Wedding Party',
      description: 'Decide how many people you want in your wedding party. Will you have flowergirls, a ring bearer, and ushers?',
      isCompleted: false,
      category: 'Wedding Party',
      timeline: '4 months'
    },
    {
      id: '8',
      title: 'Send Out Your Invitations',
      description: 'Decide how you want to send out invitations. Do you want something physical you can frame, or will an e-mail work for you?',
      isCompleted: false,
      category: 'Invitations',
      timeline: '4 months'
    },
    {
      id: '9',
      title: 'Find A Wedding Photographer or Videographer',
      description: 'Consider if you want a photographer, a videographer, or both. Having video coverage gives you memories you can dive right into forever.',
      isCompleted: false,
      category: 'Photography',
      timeline: '4 months'
    },
    {
      id: '10',
      title: 'Get All Dressed In White',
      description: 'Start with some simple research. Note which styles of dress and designers make you go a little light-headed at the thought of wearing them.',
      isCompleted: false,
      category: 'Attire',
      timeline: '4 months'
    },
    {
      id: '11',
      title: 'Food, Glorious Food',
      description: 'After discussing your desired menu with your partner, browse our list of caterers using the search function.',
      isCompleted: false,
      category: 'Catering',
      timeline: '4 months'
    },

    // 3 Months to Go
    {
      id: '12',
      title: 'Find A Florist',
      description: 'Gather some images of floral arrangements that you like from the internet or magazines.',
      isCompleted: false,
      category: 'Decor',
      timeline: '3 months'
    },
    {
      id: '13',
      title: 'Plan Your Hair and Makeup',
      description: 'Consider what kind of look will best complement your dress, theme, and venue.',
      isCompleted: false,
      category: 'Beauty',
      timeline: '3 months'
    },
    {
      id: '14',
      title: 'Decide On Entertainment',
      description: 'Discuss what type of entertainment you\'d like with your partner. Band, DJ, or a playlist on shuffle.',
      isCompleted: false,
      category: 'Entertainment',
      timeline: '3 months'
    },
    {
      id: '15',
      title: 'Have a Piece of Cake',
      description: 'Browse cake vendors and add any that catch your eye to your Wedding Project.',
      isCompleted: false,
      category: 'Cake',
      timeline: '3 months'
    },
    {
      id: '16',
      title: 'Sign Up For A Gift Registry',
      description: 'Discuss what kind of gifts you\'d like - contributions towards your honeymoon, cash, or an old-fashioned registry.',
      isCompleted: false,
      category: 'Registry',
      timeline: '3 months'
    },
    {
      id: '17',
      title: 'Plan Your Honeymoon',
      description: 'Discuss your preferred dates with your partner and send in your time-off requests well in advance.',
      isCompleted: false,
      category: 'Honeymoon',
      timeline: '3 months'
    },
    {
      id: '18',
      title: 'Choose Your Transport',
      description: 'Think about how you want to arrive. A limo, horse and carriage, or vintage convertible all have very different effects on your wedding!',
      isCompleted: false,
      category: 'Transport',
      timeline: '3 months'
    },
    {
      id: '19',
      title: 'Pick Out Bridesmaid Dresses & Groomsmen Attire',
      description: 'Decide on a budget for your wedding party attire - including who is paying for it.',
      isCompleted: false,
      category: 'Attire',
      timeline: '3 months'
    },
    {
      id: '20',
      title: 'Buy Your Wedding Rings',
      description: 'Browse jewellers and add your favourites to your Wedding Project.',
      isCompleted: false,
      category: 'Jewelry',
      timeline: '3 months'
    },
    {
      id: '21',
      title: 'Decide On Your Wedding Favors',
      description: 'Think about favor ideas you love. Do you want to spend money or DIY it?',
      isCompleted: false,
      category: 'Favors',
      timeline: '3 months'
    },
    {
      id: '22',
      title: 'Talk to Your Friends About Your Bachelor/ette Party',
      description: 'Be candid about your guest list and your dates. There\'s nothing worse than not being able to attend your own party!',
      isCompleted: false,
      category: 'Parties',
      timeline: '3 months'
    },

    // 2 Months to Go
    {
      id: '23',
      title: 'Send Out Your Official Invitations',
      description: 'Get your mail in order. Do you have enough stamps for invitations AND RSVPs? Is everybody\'s address correct?',
      isCompleted: false,
      category: 'Invitations',
      timeline: '2 months'
    },
    {
      id: '24',
      title: 'Make Your Seating Chart',
      description: 'Use our Seating Assignment function for stress-free planning.',
      isCompleted: false,
      category: 'Guests',
      timeline: '2 months'
    },
    {
      id: '25',
      title: 'Collect Your Rings',
      description: 'Store your rings somewhere safe. That might mean giving them to someone in your wedding party!',
      isCompleted: false,
      category: 'Jewelry',
      timeline: '2 months'
    },

    // 1 Month to Go
    {
      id: '26',
      title: 'Have Your Final Dress Fitting',
      description: 'Practice, practice, practice. Chances are your dress is heavier and contains more parts than you\'re used to.',
      isCompleted: false,
      category: 'Attire',
      timeline: '1 month'
    },
    {
      id: '27',
      title: 'Print Stationery For Your Ceremony',
      description: 'Print all stuff!',
      isCompleted: false,
      category: 'Stationery',
      timeline: '1 month'
    },
    {
      id: '28',
      title: 'Write Your Vows',
      description: 'If you\'re planning personalized vows, start writing them now. You want every word to be perfect.',
      isCompleted: false,
      category: 'Ceremony',
      timeline: '1 month'
    },
    {
      id: '29',
      title: 'Set a Rehearsal Time',
      description: 'Make sure your whole wedding party can attend the rehearsal.',
      isCompleted: false,
      category: 'Ceremony',
      timeline: '1 month'
    },

    // 1 Week to Go
    {
      id: '30',
      title: 'Confirm EVERYTHING',
      description: 'Make sure you\'ve paid any outstanding deposits. Get your cash or checks for same-day payments ready now.',
      isCompleted: false,
      category: 'Final Details',
      timeline: '1 week'
    },
    {
      id: '31',
      title: 'Delegate someone in the wedding party to deal with any problems on the day',
      description: 'Don\'t stress the happy couple! Discuss who will be responsible for returning any rented items and collecting wedding gifts.',
      isCompleted: false,
      category: 'Final Details',
      timeline: '1 week'
    },
    {
      id: '32',
      title: 'Treat Yourself to A Pre-Wedding Pamper',
      description: 'Have a mani/pedi and spa day with your bridal party.',
      isCompleted: false,
      category: 'Beauty',
      timeline: '1 week'
    },

    // Wedding Day
    {
      id: '33',
      title: 'Ring Out the Bells. You\'re Getting Married Today!',
      description: 'We\'re not saying you\'re going to cry, but you\'re probably going to cry. It\'s not a bad idea to sneak a pack of tissues.',
      isCompleted: false,
      category: 'Wedding Day',
      timeline: 'Wedding Day'
    },

    // After
    {
      id: '34',
      title: 'Happily Ever After',
      description: 'Check that every vendor and supplier has been paid. Say thank you by providing them a review.',
      isCompleted: false,
      category: 'Post-Wedding',
      timeline: 'After'
    },
    {
      id: '35',
      title: 'Send your thank-you notes',
      description: 'Enjoy your honeymoon!',
      isCompleted: false,
      category: 'Post-Wedding',
      timeline: 'After'
    },
    {
      id: '36',
      title: 'Upload all your photos and relive your amazing day',
      description: 'Head over to the "Post-Wedding" section of your Wedding Project.',
      isCompleted: false,
      category: 'Post-Wedding',
      timeline: 'After'
    }
  ]);

  const handleToggleItem = (id: string) => {
    setChecklistItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  const handleAddItem = () => {
    console.log('Add new item');
  };

 
  const categories = ['All', ...Array.from(new Set(checklistItems.map(item => item.category)))];

  
  const filteredItems = selectedCategory === 'All' 
    ? checklistItems 
    : checklistItems.filter(item => item.category === selectedCategory);

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.timeline]) {
      acc[item.timeline] = [];
    }
    acc[item.timeline].push(item);
    return acc;
  }, {} as Record<string, ChecklistItem[]>);

  const timelineOrder = ['4 months', '3 months', '2 months', '1 month', '1 week', 'Wedding Day', 'After'];

  return (
    <ImageBackground 
      source={require('../../assets/images/flower.png')} 
      style={styles.container}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity
              style={styles.profileIconButton}
              onPress={() => {
                router.push('/ProfileScreen');
              }}
            >
              <Ionicons name="person-circle-outline" size={32} color="#F5F5DC" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Wedding Checklist</Text>
            <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
              <Ionicons name="add" size={24} color="#000000" />
            </TouchableOpacity>
          </View>
        </View>

       
        <View style={styles.categoryFilterContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScrollContent}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.categoryButtonTextActive
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {timelineOrder.map((timeline) => {
            const items = groupedItems[timeline];
            if (!items || items.length === 0) return null;

            return (
              <View key={timeline} style={styles.timelineSection}>
                <Text style={styles.timelineTitle}>{timeline.toUpperCase()} TO GO</Text>
                <View style={styles.checklistContainer}>
                  {items.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.checklistItem}
                      onPress={() => handleToggleItem(item.id)}
                    >
                      <View style={styles.checkboxContainer}>
                        <View style={[
                          styles.checkbox,
                          item.isCompleted && styles.checkboxCompleted
                        ]}>
                          {item.isCompleted && (
                            <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                          )}
                        </View>
                        <View style={styles.itemContent}>
                          <Text style={[
                            styles.itemTitle,
                            item.isCompleted && styles.itemTitleCompleted
                          ]}>
                            {item.title}
                          </Text>
                          {item.description && (
                            <Text style={[
                              styles.itemDescription,
                              item.isCompleted && styles.itemDescriptionCompleted
                            ]}>
                              {item.description}
                            </Text>
                          )}
                          <View style={styles.itemMeta}>
                            <Text style={styles.categoryTag}>{item.category}</Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            );
          })}
        </ScrollView>

        
        <BottomNavigationBar />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  profileIconButton: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,

  },
  safeArea: {
    flex: 1,
    backgroundColor: '#6D2932',
    // backgroundColor: 'rgba(255, 255, 255, 0.57)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 21,
    paddingBottom: 7,
    // borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    position: 'relative',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F5F5DC',
    textAlign: 'center',
    flex: 1,
    
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5DC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryFilterContainer: {
    paddingVertical: 10,
    // borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  categoryScrollContent: {
    paddingHorizontal: 16,
    
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#6D2932',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryButtonActive: {
    backgroundColor: '#F5F5DC',
    borderColor: '#ffff',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffff',
  },
  categoryButtonTextActive: {
    color: '#000000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  timelineSection: {
    marginBottom: 24,
  },
  timelineTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F5F5DC',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  checklistContainer: {
    backgroundColor: '#F5F5DC',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checklistItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: 12,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#6D2932',
    borderColor: '#6D2932',
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  itemTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  itemDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  itemDescriptionCompleted: {
    color: '#D1D5DB',
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryTag: {
    fontSize: 12,
    color: '#6D2932',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: '500',
  },
});
