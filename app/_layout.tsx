import { StyleSheet, Text, View } from 'react-native'
import React from 'react';

import {Stack} from 'expo-router';
import { StatusBar } from 'expo-status-bar';


const _layout = () => {
  return (
    <>
    <StatusBar style="light" />
    <Stack screenOptions={{
      headerShown:false,
      contentStyle:{backgroundColor:"white"},
      animation:'slide_from_right',
      header:()=>null,
      navigationBarHidden:true
      }}>
        <Stack.Screen name="index" options={{headerShown:false}} />

    </Stack>
    </>
  )
}

export default _layout

const styles = StyleSheet.create({})