import { StyleSheet,Image,Text, AppState,View ,Dimensions,ScrollView,Modal, TouchableOpacity,Animated} from 'react-native'
import React, { useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import {Link} from 'expo-router';
const { width } = Dimensions.get("window");

import CircularTrack from './CircularTrack';  //component
import TodayMedicine from './TodayMedicine';

const icons = {
  add: require("../assets/images/Home/add.png"),
  calendar: require("../assets/images/Home/health.png"),
  history: require("../assets/images/Home/history.png"),
  refill: require("../assets/images/Home/refill.png"),
};

const QUICK_ACTIONS = [
  {
    icon: icons.add,
    label: "Add Medication",
    route: "/AddMedication" as const,
    color: "#2E7D32",
    gradient: ["#4CAF50", "#2E7D32"] as [string, string],
  },
  {
    icon: icons.calendar,
    label: "Health Tracker",
    route: "/healthtracker" as const,
    color: "#1976D2",
    gradient: ["#2196F3", "#1976D2"] as [string, string],
  },
  {
    icon: icons.history,
    label: "History Log",
    route: "/history" as const,
    color: "#C2185B",
    gradient: ["#E91E63", "#C2185B"] as [string, string],
  },
  {
    icon: icons.refill,
    label: "Refill Tracker",
    route: "/refills" as const,
    color: "#E64A19",
    gradient: ["#FF5722", "#E64A19"] as [string, string],
  },
];




const Home = () => {
  return (
<ScrollView>
<CircularTrack/>
    <View style={styles.quickActionGrid}>
      {QUICK_ACTIONS.map((value,index)=>{
        return(
            <Link href={value.route} key={value.label} asChild>
                  <TouchableOpacity style={styles.actionButton}>
                    <LinearGradient colors={value.gradient} style={styles.actioncontent}> 
                      <View style={styles.actionGradient}>
                      <Image style={{height:30,width:30,tintColor:"white"}} source={value.icon} />;
                      <Text style={styles.actionLabel}>{value.label}</Text>
                      </View>
                      </LinearGradient>
                  </TouchableOpacity>
                </Link>
        )
      })}
    </View>

  <TodayMedicine/>
</ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
    quickActionGrid:{
        flexDirection:"row",
        flexWrap:"wrap",
        gap:12,
        justifyContent:"center",
        marginVertical:16
      },
    actionButton:{
        width:(width-22)/2,
        height:90,
        borderRadius:16,
        overflow:"hidden",
      },
      actioncontent:{
        flex:1,
        justifyContent:"space-between",
      },
      actionGradient:{
        flex:1,
        padding:15,
      },
    
        actionLabel:{
        fontSize:18,
        color:"white",
        fontWeight:"bold",
        marginTop:8,
      },
})