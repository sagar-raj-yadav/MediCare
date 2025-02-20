import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const TodayMedicine = ({medicine,dose,selectedFrequency,selectedDuration,startDate,endDate}:TodayMedicineProps) => {

    const [taken,setTaken]=useState<boolean>(false);

  // Function to format date as "2 Feb 2025"
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };


  return (

 <View style={styles.medicine}>

  <View style={{flexDirection:"row",justifyContent:"space-between"}}>
    <View style={styles.onemedicine}>
        <Text style={styles.text1}> {medicine} -</Text> 
        <Text style={styles.text2}>{dose}</Text>
    </View>

    <TouchableOpacity 
    onPress={()=>setTaken(!taken)}
    style={[styles.takebutton, { backgroundColor: taken ? 'green' : 'orange' }]}
    >
    <Text  style={styles.takebuttontext}>{taken?"Taken":"Take Now"}</Text>
    </TouchableOpacity>
    
  </View>

<View style={{flexDirection:"row",justifyContent:"space-between"}}>
    <View style={styles.twomedicine}>
        <Text style={styles.text3}>{selectedFrequency}</Text> 
        <Text style={styles.text4}>{selectedDuration}</Text>
    </View>

    <View style={styles.threemedicine}>
        <Text style={styles.text5}>{formatDate(startDate)} to </Text> 
        <Text style={styles.text6}>{formatDate(endDate)}</Text>
    </View>

</View>

 </View>

      
      
  )
}

export default TodayMedicine;

const styles = StyleSheet.create({
    medicine: {
      backgroundColor: "#f0f9ff", // Light blue background
      margin: 10,
      padding: 12,
      borderRadius: 16,
      shadowColor: "#000", // Shadow for depth
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    onemedicine: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    text1: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#2c3e50",
    },
    text2: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#007bff", // Blue for highlighting
    },
    takebutton: {
      borderRadius: 16,
      paddingVertical: 8,
      paddingHorizontal: 12,
      alignSelf: "center",
    },
    takebuttontext: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
    },
    twomedicine: {
      flexDirection: "row",
      gap: 10,
      marginVertical: 6,
    },
    text3: {
      fontSize: 14,
      fontWeight: "bold",
      backgroundColor: "#e0f7fa", // Light cyan
      borderRadius: 8,
      padding: 6,
      color: "#00796b", // Dark cyan text
    },
    text4: {
      fontSize: 14,
      fontWeight: "bold",
      backgroundColor: "#fff3e0", // Light orange
      borderRadius: 8,
      padding: 6,
      color: "#e65100", // Deep orange text
    },
    threemedicine: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 12,
      backgroundColor: "#e8f5e9", // Light green
      padding: 8,
      borderRadius: 8,
    },
    text5: {
      fontSize: 12,
      fontWeight: "bold",
      color: "#2e7d32", // Dark green
    },
    text6: {
      fontSize: 12,
      fontWeight: "bold",
      color: "#d84315", // Deep orange
    },
  });

// Props Type for TodayMedicine Component
interface TodayMedicineProps {
    medicine: string;
    dose: number;
    selectedFrequency: string;
    selectedDuration: string;
    startDate: string;
    endDate: string;
  }
  