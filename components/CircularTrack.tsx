import {useState,useEffect} from 'react';
import { StyleSheet, Text, Dimensions, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
const { width, height } = Dimensions.get("window");
import AsyncStorage from '@react-native-async-storage/async-storage';

const size = width * 0.48; // Circle size
const strokeWidth = 20; // Border thickness

const CircularTrack = () => {

    // Fetch Function to Get Stored Medicines
    const [medicines, setMedicines] = useState<Medicine[]>([]);
   
    const Get_All_Medicines = async () => {
     try {
       const storedData = await AsyncStorage.getItem("medicines");
       setMedicines(storedData ? JSON.parse(storedData) : []);
     } catch (error) {
       console.error("Error retrieving data:", error);
     }
   };
 
 
 useEffect(() => {
   Get_All_Medicines();
 });
 
 const completeDoses=2;;
  const totalDoses=medicines.length;

  const progress = (completeDoses / totalDoses) * 100;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * progress) / 100;


 


  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background Circle (Gray) */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="lightgray"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress Circle (Blue based on progress) */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e58ef7"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{progress.toFixed(1)}%</Text>
        <Text style={styles.text}>{completeDoses} of {totalDoses}</Text>
      </View>
    </View>
  );
};

export default CircularTrack;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "green",
    borderRadius: 19,
    height: height * 0.26,
  },
  textContainer: {
    position: "absolute",
    alignItems: "center",
  },
  text: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
});

// Define TypeScript type for a single medicine item
interface Medicine {
  id: string;
  medicine: string;
  dose: number;
  selectedFrequency: string;
  selectedDuration: string;
  startDate: string;
  endDate: string;
}
