import { Pressable,Image,StyleSheet,FlatList, Text, View } from 'react-native'
import {useState,useEffect} from 'react'
import MedicineCard from './TodayMedicineCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const TodayMedicine = () => {

  const [medicines, setMedicines] = useState<Medicine[]>([]);

  // Fetch Function to Get Stored Medicines
  const Get_All_Medicines = async () => {
    try {
      const storedData = await AsyncStorage.getItem("medicines");
      setMedicines(storedData ? JSON.parse(storedData) : []);
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

  // Fetch medicines on component mount
  useEffect(() => {
    Get_All_Medicines();
  },[]);

  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable 
      onPress={()=>router.back()}
      style={{marginHorizontal:"6%",borderRadius:50, flexDirection: "row", alignItems: "center"}}>
        <Image style={{height:40,width:40}} source={require("../assets/images/addmedicine/left.png")} />
      
        <Text style={styles.today}> Medicine's History:</Text>

      </Pressable>
      
      
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
        fontSize:25,
        fontWeight:"bold",
        color:"#048633",
        marginLeft:"10%",
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
