import { StyleSheet,Image,Dimensions,Platform, Text,TouchableOpacity, TextInput, View, ScrollView, Pressable } from 'react-native'
import {useState,useEffect} from 'react'
const { width, height } = Dimensions.get("window");
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const icons = {
  add: require("../assets/images/addmedicine/pill.png"),
  calendar: require("../assets/images/addmedicine/medicine.png"),
  history: require("../assets/images/addmedicine/three.png"),
  refill: require("../assets/images/addmedicine/pills.png"),
};

const FREQUENCIES = [
  {
    id: "1",
    label: "Once daily",
    icon: icons.add,
    times: ["09:00"],
  },
  {
    id: "2",
    label: "Twice daily",
    icon:icons.calendar,
    times: ["09:00", "21:00"],
  },
  {
    id: "3",
    label: "Three times daily",
    icon: icons.history,
    times: ["09:00", "15:00", "21:00"],
  },
  {
    id: "4",
    label: "Four times daily",
    icon: icons.refill,
    times: ["09:00", "13:00", "17:00", "21:00"],
  },
];

const DURATIONS = [
  { id: "1", label: "7 days", value: 7 },
  { id: "2", label: "14 days", value: 14 },
  { id: "3", label: "30 days", value: 30 },
  { id: "4", label: "90 days", value: 90 },
];



const AddMedication = () => {

  const [medicine,setMedicine]=useState<string>("");
  const [dose,setDose]=useState<number|null>(null);
  const [selectedFrequency, setSelectedFrequency] = useState("");
  const [selectedDuration, setselectedDuration] = useState("");

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);


  // Function to handle date selection
  const onChangeStartDate = (event: any, selectedDate?: Date) => {
    setShowStartDatePicker(Platform.OS === 'ios'); // Keep picker open on iOS
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const onChangeEndDate = (event: any, selectedDate?: Date) => {
    setShowEndDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const router = useRouter();

  const Add_Data_LocalStorage=async()=>{
    const data = {
      id: new Date().getTime(),
      medicine,
      dose,
      selectedFrequency,
      selectedDuration,
      startDate: startDate?.toISOString(),  // Convert Date to String
      endDate: endDate?.toISOString(),
    };
    
    
    try{
      const existingDate=await AsyncStorage.getItem("medicines");
      let medicineArray=existingDate ? JSON.parse(existingDate):[];

      medicineArray.push(data);
      await AsyncStorage.setItem("medicines",JSON.stringify(medicineArray));
      console.log("Data Added successfully",startDate,endDate);
      console.log(medicineArray)
      setMedicine("");
      setDose(null);
      setSelectedFrequency("");
      setselectedDuration("");
      setStartDate(null);
      setEndDate(null);
    }catch (error) {
    console.error("Error storing data:", error);
  }

  };


  return (
<ScrollView>

<Pressable 
onPress={()=>router.back()}
style={{marginHorizontal:"6%",width:"14%",borderRadius:50}}>
  <Image style={{height:40,width:40}} source={require("../assets/images/addmedicine/left.png")} />
          </Pressable>


    <View style={styles.inputContainer}>
      <TextInput
      style={styles.input} 
      placeholder='Medicine Name'
      value={medicine}
      onChangeText={setMedicine}
      />

     <TextInput 
      style={styles.input} 
      placeholder='Medicine Dose (ex: 500mg)'
      value={dose !== null ? dose.toString() : ''} // Convert number to string for TextInput
      onChangeText={(value)=>{
        const numericValue = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
          setDose(numericValue ? parseInt(numericValue, 10) : null); // Store number or null
      }}
      keyboardType="numeric" // Ensure only numbers can be entered

      />
    </View>

      <Text style={{fontSize:25,fontWeight:"bold",marginLeft:"6%"}}>How Often?</Text>
      <View style={styles.howoftencontainer}>
        {
          FREQUENCIES.map((value,index)=>(
            <TouchableOpacity
            key={value.id}
            style={[ styles.optionCard,
               selectedFrequency === value.label && styles.selectedOptionCard,
              ]}

              onPress={()=>{
                setSelectedFrequency(value.label);
              }}
            >
            <View
              style={[
                styles.optionIcon,
                selectedFrequency === value.label && styles.selectedOptionIcon,
              ]}
            >
          
        <Image   style={{height:30,width:30}} source={value.icon} />
              
            </View>
            <Text
              style={[
                styles.optionLabel,
                selectedFrequency === value.label && styles.selectedOptionLabel,
              ]}
            >
              {value.label}
            </Text>
          </TouchableOpacity>
          ))
        }

      </View>

      <Text style={{fontSize:25,fontWeight:"bold",marginLeft:"6%"}}>For How Long?</Text>
      <View style={styles.howoftencontainer}>
        {
          DURATIONS.map((value,index)=>(
            <TouchableOpacity
            key={value.id}
            style={[ styles.optionCard,
              selectedDuration === value.label && styles.selectedOptionCard,
              ]}

              onPress={()=>{
                setselectedDuration(value.label);
              }}
            >
            <View
              style={[
                styles.optionIcon,
                selectedDuration === value.label && styles.selectedOptionIcon,
              ]}
            >
             <Text style={{fontSize:20,fontWeight:"bold"}}>{value.value}</Text>
            </View>
            <Text
              style={[
                styles.optionLabel,
                selectedDuration === value.label && styles.selectedOptionLabel,
              ]}
            >
              {value.label}
            </Text>
          </TouchableOpacity>
          ))
        }

      </View>      

      <View>
      {/* Start Date Button */}
      <TouchableOpacity 
      style={styles.datePicker}
      onPress={() => setShowStartDatePicker(true)}>
        <Text style={styles.textdatePicker}>
          Start Date: {startDate ? startDate.toDateString() : 'Select a date'}{' '}
          <Image style={{height:20,width:20}} source={require("../assets/images/Home/calendar.png")} />
        </Text>
      </TouchableOpacity>

      {/* Show DateTimePicker when the button is pressed */}
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display="default"
          onChange={onChangeStartDate}
        />
      )}

      {/* End Date Button */}
      <TouchableOpacity 
      style={styles.datePicker}
      onPress={() => setShowEndDatePicker(true)}>
        <Text style={styles.textdatePicker}>
          End Date: {endDate ? endDate.toDateString() : 'Select a date'}{' '}
          <Image style={{height:20,width:20}} source={require("../assets/images/Home/calendar.png")} />
        </Text>
      </TouchableOpacity>

      {/* Show DateTimePicker when the button is pressed */}
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display="default"
          onChange={onChangeEndDate}
        />
      )}
    </View>


   {/* save button */}
      <TouchableOpacity
      onPress={Add_Data_LocalStorage}
      activeOpacity={0.7}
      style={styles.addButton}>
        <Text  style={styles.addButtonText}>Add Medicine</Text>
      </TouchableOpacity>
      

</ScrollView>
  )
}

export default AddMedication

const styles = StyleSheet.create({
  inputContainer:{
    alignSelf:'center',
  },
  input:{
    marginVertical:8,
    padding:9,
    borderWidth: 1,
    backgroundColor: "#d3f2e0",
    borderRadius: 20,
    width:0.9*width, 
    fontSize: 16,
    fontWeight:"bold",
  },

  howoftencontainer:{
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  optionCard: {
    width: (width - 60) / 2,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 6,
    margin: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedOptionCard: {
    backgroundColor: "#1a8e2d",
    borderColor: "#1a8e2d",
  },
  optionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  selectedOptionIcon: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  selectedOptionLabel: {
    color: "white",
  },
  textdatePicker:{
    color:"black",
    fontSize:16,
    fontWeight:"bold",
  },
  datePicker:{
    width: width - 60,
    backgroundColor:"white",
    alignSelf:"center",
    borderRadius:50,
    paddingVertical:8,
    alignItems:"center",
    justifyContent:"center",
    marginVertical:4
  },
  addButton:{
    marginVertical:8,
    width: width - 60,
    padding: 15,
    backgroundColor: "green",
    elevation:2,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  addButtonText:{
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  }
})