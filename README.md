# INSTALLATION
i.npx create-expo-app@latest
ii.npx expo install @expo/vector-icons
iii.npx expo install expo-notifications
iv. npx expo install expo-blur react-native-reanimated
v.npx expo install expo-local-authentication
vi.npx expo install @react-native-async-storage/async-storage

# 
i.inside the app->index.tsx (this index.tsx our main entry page)
ii.

# publish app as web 
i.npx expo install react-native-web
ii.
{
  "platforms": ["ios", "android", "web"]
}
iii.npx expo export
iv.upload dist folder to netlify

# styling
i.flex:1  ->uss view ka full height and width le lega
ii. 