import BottomNavigationBar from '@/components/BottomNavigationBar';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface BudgetCategory {
  name: string;
  amount: number;
  percentage: number;
}

export default function BudgetScreen() {
  const [totalBudget, setTotalBudget] = useState('1000000');

  const totalBudgetNumber = parseInt(totalBudget) || 0;

  const budgetCategories: BudgetCategory[] = [
    { name: 'Venue', amount: Math.round(totalBudgetNumber * 0.4), percentage: 40 },
    { name: 'Catering', amount: Math.round(totalBudgetNumber * 0.25), percentage: 25 },
    { name: 'Decor & Florals', amount: Math.round(totalBudgetNumber * 0.15), percentage: 15 },
    { name: 'Attire & Jewelry', amount: Math.round(totalBudgetNumber * 0.1), percentage: 10 },
    { name: 'Miscellaneous', amount: Math.round(totalBudgetNumber * 0.1), percentage: 10 },
  ];

  const handleBackPress = () => {
    
    console.log('Back pressed');
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const formatAmountInUnits = (amount: number) => {
    if (amount >= 10000000) {
      const crore = amount / 10000000;
      return `${crore.toFixed(1)} Crore`;
    } else if (amount >= 100000) {
      const lakh = amount / 100000;
      return `${lakh.toFixed(1)} Lakh`;
    } else if (amount >= 1000) {
      const thousand = amount / 1000;
      return `${thousand.toFixed(1)} Thousand`;
    } else if (amount >= 100) {
      const hundred = amount / 100;
      return `${hundred.toFixed(1)} Hundred`;
    } else {
      return `${amount}`;
    }
  };

  const renderBudgetCategory = (category: BudgetCategory) => (
    <View key={category.name} style={styles.categoryRow}>
      <Text style={styles.categoryName}>{category.name}</Text>
      <View style={styles.categoryAmountContainer}>
        <Text style={styles.categoryAmount}>
          {formatCurrency(category.amount)} ({category.percentage}%)
        </Text>
        <Text style={styles.categoryAmountUnit}>
          {formatAmountInUnits(category.amount)}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="chevron-back" size={24} color="#F5F5DC" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Budget Calculator</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.budgetSection}>
          <Text style={styles.budgetLabel}>Total Wedding Budget</Text>
          <View style={styles.budgetInputContainer}>
            <TextInput
              style={styles.budgetInput}
              value={formatCurrency(parseInt(totalBudget) || 0)}
              onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9]/g, '');
                setTotalBudget(numericValue);
              }}
              keyboardType="numeric"
              placeholder="₹0"
            />
          </View>
          {totalBudget && (
            <Text style={styles.formattedAmount}>
              {formatCurrency(parseInt(totalBudget) || 0)} ({formatAmountInUnits(parseInt(totalBudget) || 0)})
            </Text>
          )}
        </View>

        <View style={styles.breakdownSection}>
          <Text style={styles.breakdownTitle}>Budget Breakdown</Text>
          <View style={styles.categoriesContainer}>
            {budgetCategories.map(renderBudgetCategory)}
          </View>
        </View>
      </ScrollView>

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
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  budgetSection: {
    marginTop: 24,
    marginBottom: 32,
  },
  budgetLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F5F5DC',
    marginBottom: 12,
  },
  budgetInputContainer: {
    backgroundColor: '#F5F5DC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  budgetInput: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  formattedAmount: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
  },
  breakdownSection: {
    marginBottom: 24,
  },
  breakdownTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
  },
  categoriesContainer: {
    backgroundColor: '#F5F5DC',
    borderRadius: 12,
    overflow: 'hidden',
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  categoryAmountContainer: {
    alignItems: 'flex-end',
  },
  categoryAmountUnit: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    marginTop: 2,
  },
});
