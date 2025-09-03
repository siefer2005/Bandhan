// Script to get the redirect URI for Google OAuth configuration
// Run this with: node scripts/get-redirect-uri.js

// Generate the redirect URI for Google OAuth
const redirectUri = 'http://localhost:8081/--/login';

console.log('🔗 Generated Redirect URI for Google OAuth:');
console.log(redirectUri);
console.log('\n📝 Add this URI to your Google OAuth 2.0 Client ID:');
console.log('1. Go to Google Cloud Console');
console.log('2. Navigate to APIs & Services > Credentials');
console.log('3. Edit your OAuth 2.0 Client ID');
console.log('4. Add this URI to "Authorized redirect URIs":');
console.log(`   ${redirectUri}`);
console.log('\n💡 For development, you might also want to add:');
console.log('   bandhan://login');
console.log('   exp://localhost:8081/--/login');
console.log('   exp://127.0.0.1:8081/--/login');
console.log('\n🚀 After adding these URIs, restart your app and try Google sign-in again!');
