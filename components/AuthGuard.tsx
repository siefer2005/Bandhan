import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export default function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !user) {
        router.replace('/login');
      } else if (!requireAuth && user) {

        router.replace('/(tabs)');
      }
    }
  }, [user, isLoading, requireAuth, router]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#DAA520" />
      </View>
    );
  }

  if ((requireAuth && user) || (!requireAuth && !user)) {
    return <>{children}</>;
  }

  return null;
}
