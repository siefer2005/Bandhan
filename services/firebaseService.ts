import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    Timestamp,
    updateDoc,
    where
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Types
export interface Guest {
  id?: string;
  userId: string;
  name: string;
  rsvpStatus: 'pending' | 'confirmed' | 'declined';
  plusOne?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface ChecklistItem {
  id?: string;
  userId: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  category: string;
  timeline: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface BudgetCategory {
  id?: string;
  userId: string;
  name: string;
  amount: number;
  percentage: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Vendor {
  id?: string;
  userId: string;
  name: string;
  category: string;
  contact: string;
  email?: string;
  website?: string;
  notes?: string;
  isBooked: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

// Guest Services
export const guestService = {
  // Get all guests for a user
  async getGuests(userId: string): Promise<Guest[]> {
    try {
      const q = query(
        collection(db, 'guests'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Guest[];
    } catch (error) {
      console.error('Error getting guests:', error);
      throw error;
    }
  },

  // Add a new guest
  async addGuest(guest: Omit<Guest, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'guests'), {
        ...guest,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding guest:', error);
      throw error;
    }
  },

  // Update a guest
  async updateGuest(id: string, updates: Partial<Guest>): Promise<void> {
    try {
      const guestRef = doc(db, 'guests', id);
      await updateDoc(guestRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating guest:', error);
      throw error;
    }
  },

  // Delete a guest
  async deleteGuest(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'guests', id));
    } catch (error) {
      console.error('Error deleting guest:', error);
      throw error;
    }
  }
};

// Checklist Services
export const checklistService = {
  // Get all checklist items for a user
  async getChecklistItems(userId: string): Promise<ChecklistItem[]> {
    try {
      const q = query(
        collection(db, 'checklistItems'),
        where('userId', '==', userId),
        orderBy('timeline', 'asc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ChecklistItem[];
    } catch (error) {
      console.error('Error getting checklist items:', error);
      throw error;
    }
  },

  // Add a new checklist item
  async addChecklistItem(item: Omit<ChecklistItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'checklistItems'), {
        ...item,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding checklist item:', error);
      throw error;
    }
  },

  // Update a checklist item
  async updateChecklistItem(id: string, updates: Partial<ChecklistItem>): Promise<void> {
    try {
      const itemRef = doc(db, 'checklistItems', id);
      await updateDoc(itemRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating checklist item:', error);
      throw error;
    }
  },

  // Delete a checklist item
  async deleteChecklistItem(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'checklistItems', id));
    } catch (error) {
      console.error('Error deleting checklist item:', error);
      throw error;
    }
  },

  // Toggle completion status
  async toggleChecklistItem(id: string, isCompleted: boolean): Promise<void> {
    try {
      const itemRef = doc(db, 'checklistItems', id);
      await updateDoc(itemRef, {
        isCompleted,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error toggling checklist item:', error);
      throw error;
    }
  }
};

// Budget Services
export const budgetService = {
  // Get budget categories for a user
  async getBudgetCategories(userId: string): Promise<BudgetCategory[]> {
    try {
      const q = query(
        collection(db, 'budgetCategories'),
        where('userId', '==', userId),
        orderBy('percentage', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BudgetCategory[];
    } catch (error) {
      console.error('Error getting budget categories:', error);
      throw error;
    }
  },

  // Add a new budget category
  async addBudgetCategory(category: Omit<BudgetCategory, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'budgetCategories'), {
        ...category,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding budget category:', error);
      throw error;
    }
  },

  // Update a budget category
  async updateBudgetCategory(id: string, updates: Partial<BudgetCategory>): Promise<void> {
    try {
      const categoryRef = doc(db, 'budgetCategories', id);
      await updateDoc(categoryRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating budget category:', error);
      throw error;
    }
  },

  // Delete a budget category
  async deleteBudgetCategory(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'budgetCategories', id));
    } catch (error) {
      console.error('Error deleting budget category:', error);
      throw error;
    }
  }
};

// Vendor Services
export const vendorService = {
  // Get all vendors for a user
  async getVendors(userId: string): Promise<Vendor[]> {
    try {
      const q = query(
        collection(db, 'vendors'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Vendor[];
    } catch (error) {
      console.error('Error getting vendors:', error);
      throw error;
    }
  },

  // Add a new vendor
  async addVendor(vendor: Omit<Vendor, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'vendors'), {
        ...vendor,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding vendor:', error);
      throw error;
    }
  },

  // Update a vendor
  async updateVendor(id: string, updates: Partial<Vendor>): Promise<void> {
    try {
      const vendorRef = doc(db, 'vendors', id);
      await updateDoc(vendorRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating vendor:', error);
      throw error;
    }
  },

  // Delete a vendor
  async deleteVendor(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'vendors', id));
    } catch (error) {
      console.error('Error deleting vendor:', error);
      throw error;
    }
  },

  // Toggle booking status
  async toggleVendorBooking(id: string, isBooked: boolean): Promise<void> {
    try {
      const vendorRef = doc(db, 'vendors', id);
      await updateDoc(vendorRef, {
        isBooked,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error toggling vendor booking:', error);
      throw error;
    }
  }
};
