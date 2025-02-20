import { StyleSheet,FlatList, Text, View } from 'react-native'
import {useState,useEffect} from 'react'
import MedicineCard from './TodayMedicineCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TodayMedicine = () => {

  const [medicines, setMedicines] = useState<Medicine[]>([]);



 // Fetch Function to Get Stored Medicines
const Get_All_Medicines = async () => {
  try {
    const storedData = await AsyncStorage.getItem("medicines");
    const medicines = storedData ? JSON.parse(storedData) : [];

    // Get today's date in YYYY-MM-DD format
    const todayDate = new Date().toISOString().split("T")[0];

    // Filter medicines where startDate matches today's date
    const todaysMedicines = medicines.filter(med => {
      const medStartDate = new Date(med.startDate).toISOString().split("T")[0];
      return medStartDate === todayDate;
    });

    setMedicines(todaysMedicines);
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
};


  // Fetch medicines on component mount
  useEffect(() => {
    Get_All_Medicines();
  });


  return (
    <View style={styles.container}>
        <Text style={styles.today}>Today 's Medicine</Text>
      
      {/* Medicines List */}
      <FlatList
        data={medicines}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MedicineCard
            medicine={item.medicine}
            dose={item.dose}
            selectedFrequency={item.selectedFrequency}
            selectedDuration={item.selectedDuration}
            startDate={item.startDate}
            endDate={item.endDate}
          />
        )}
      />

    </View>
  )
}

export default TodayMedicine

const styles = StyleSheet.create({
    container:{
        height:"100%",
        backgroundColor:"#dbdbdd",
        borderRadius:22,
        elevation:10
    },
    today:{
        fontSize:20,
        fontWeight:"bold",
        color:"#048633",
        marginLeft:"4%",
    }
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
