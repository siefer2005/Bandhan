import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

WebBrowser.maybeCompleteAuthSession();

import AuthGuard from '@/components/AuthGuard';
import { GOOGLE_DISCOVERY, createGoogleAuthRequest } from '@/constants/GoogleAuth';
import { useAuth } from '@/contexts/AuthContext';


const discovery = GOOGLE_DISCOVERY;

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signIn, signInWithEmail, signUpWithEmail } = useAuth();


  React.useEffect(() => {
    const { logRedirectUri } = require('@/constants/GoogleAuth');
    logRedirectUri();
  }, []);

  const handleContinue = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter your email and password');
      return;
    }
    
    if (isSignUp && !name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }
    
    try {
      setIsLoading(true);
      
      if (isSignUp) {
        await signUpWithEmail(email.trim(), password, name.trim());
      } else {
        await signInWithEmail(email.trim(), password);
      }
      
      router.push('/(tabs)');
    } catch (error: any) {
      console.error('Authentication error:', error);
      Alert.alert('Error', error.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      
      // Use the new Google auth request configuration
      const request = createGoogleAuthRequest();
      const result = await request.promptAsync(discovery);

      if (result.type === 'success') {
        console.log('Google sign-in successful:', result);
            
        try {
          const userInfoResponse = await fetch(
            `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${result.params.access_token}`
          );
          
          if (userInfoResponse.ok) {
            const userInfo = await userInfoResponse.json();
            
            
            const userData = {
              id: userInfo.id || result.params.code || 'google-user',
              email: userInfo.email || 'user@example.com',
              name: userInfo.name || 'Google User',
              picture: userInfo.picture,
              provider: 'google' as const,
            };
            
            await signIn(userData);
            router.push('/(tabs)');
          } else {
            throw new Error('Failed to fetch user info from Google');
          }
        } catch (userInfoError) {
          console.error('Error fetching user info:', userInfoError);
          const userData = {
            id: result.params.code || 'google-user',
            email: 'user@example.com',
            name: 'Google User',
            provider: 'google' as const,
          };
          
          await signIn(userData);
          router.push('/(tabs)');
        }
      } else if (result.type === 'cancel') {
        console.log('Google sign-in cancelled');
      } else {
        Alert.alert('Error', 'Google sign-in failed. Please try again.');
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      Alert.alert('Error', 'Google sign-in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookSignIn = () => {
    Alert.alert('Coming Soon', 'Facebook sign-in will be available soon!');
  };

  const handleTermsPress = () => {
  
    console.log('Navigate to Terms of Service');
  };

  const handlePrivacyPress = () => {
    console.log('Navigate to Privacy Policy');
  };

  return (
    <AuthGuard requireAuth={false}>
      <SafeAreaView style={styles.container}>
        <View style={styles.background}>
          
          <View style={styles.patternOverlay} />
          
          <View style={styles.content}>
         
          <Text style={styles.appTitle}>Bandhan</Text>
          <Text style={styles.appSubtitle}>Your Sacred Union Planner</Text>

          
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>@</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>🔒</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          {isSignUp && (
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>👤</Text>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>
          )}

          {/* Continue Button */}
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            <Text style={styles.continueButtonText}>
              {isLoading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
            </Text>
          </TouchableOpacity>

          {/* Toggle Sign In/Sign Up */}
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setIsSignUp(!isSignUp)}
          >
            <Text style={styles.toggleButtonText}>
              {isSignUp ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
            </Text>
          </TouchableOpacity>

          {/* Separator */}
          <View style={styles.separatorContainer}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>Or continue with</Text>
            <View style={styles.separatorLine} />
          </View>

          {/* Social Login Buttons */}
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleFacebookSignIn}
              activeOpacity={0.8}
            >
              <Text style={styles.facebookIcon}>f</Text>
              <Text style={styles.socialButtonText}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleGoogleSignIn}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <Text style={styles.googleIcon}>G</Text>
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
          </View>

          {/* Disclaimer */}
          <View style={styles.disclaimerContainer}>
            <Text style={styles.disclaimerText}>
              By continuing, you agree to our{' '}
              <Text style={styles.linkText} onPress={handleTermsPress}>
                Terms of Service
              </Text>{' '}
              and{' '}
              <Text style={styles.linkText} onPress={handlePrivacyPress}>
                Privacy Policy
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
    </AuthGuard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: '#6D2932', // Dark red/maroon background
  },
  patternOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
    // You can add a subtle pattern here if needed
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 60,
  },
  appTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#F5F5DC',
    marginBottom: 8,
    fontFamily: 'serif',
  },
  appSubtitle: {
    fontSize: 18,
    color: '#F5F5DC',
    marginBottom: 50,
    textAlign: 'center',
    opacity: 0.9,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5DC',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  inputIcon: {
    fontSize: 20,
    color: '#666',
    marginRight: 10,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  continueButton: {
    backgroundColor: '#DAA520', // Golden tan color
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  toggleButton: {
    marginTop: 15,
    paddingVertical: 10,
  },
  toggleButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    textDecorationLine: 'underline',
    opacity: 0.8,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#F5F5DC',
    opacity: 0.3,
  },
  separatorText: {
    color: '#FFFFFF',
    marginHorizontal: 15,
    fontSize: 14,
    opacity: 0.8,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 40,
  },
  socialButton: {
    backgroundColor: '#F5F5DC',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.48,
  },
  facebookIcon: {
    fontSize: 20,
    color: '#1877F2',
    fontWeight: 'bold',
    marginRight: 8,
  },
  googleIcon: {
    fontSize: 20,
    color: '#4285F4',
    fontWeight: 'bold',
    marginRight: 8,
  },
  socialButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  disclaimerContainer: {
    position: 'absolute',
    bottom: 40,
    left: 30,
    right: 30,
  },
  disclaimerText: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    opacity: 0.8,
  },
  linkText: {
    color: '#DAA520', // Golden tan color for links
    textDecorationLine: 'underline',
  },
});
