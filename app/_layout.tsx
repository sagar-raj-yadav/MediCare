import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown:false}} />
      <Stack.Screen name="Home" options={{headerShown:false}} />
      <Stack.Screen name="AddMedication" options={{headerShown:false}} />
      <Stack.Screen name="history" options={{headerShown:false}} />
      <Stack.Screen name="healthtracker" options={{headerShown:false}} />

    </Stack>
  );
}
