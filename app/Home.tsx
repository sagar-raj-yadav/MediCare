import { StyleSheet, Text, View ,Dimensions,ScrollView,Modal, TouchableOpacity,Animated} from 'react-native'
import {useState,useEffect,useRef,useCallback} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
const { width, height } = Dimensions.get("window");
import Svg, { Circle } from "react-native-svg";
import { notificationAsync } from 'expo-haptics';
import {Link,useRouter} from 'expo-router';

const AnimatedCircle=Animated.createAnimatedComponent(Circle);

const QUICK_ACTIONS = [
  {
    icon: "add-circle-outline" as const,
    label: "Add\nMedication",
    route: "/medications/add" as const,
    color: "#2E7D32",
    gradient: ["#4CAF50", "#2E7D32"] as [string, string],
  },
  {
    icon: "calendar-outline" as const,
    label: "Calendar\nView",
    route: "/calendar" as const,
    color: "#1976D2",
    gradient: ["#2196F3", "#1976D2"] as [string, string],
  },
  {
    icon: "time-outline" as const,
    label: "History\nLog",
    route: "/history" as const,
    color: "#C2185B",
    gradient: ["#E91E63", "#C2185B"] as [string, string],
  },
  {
    icon: "medical-outline" as const,
    label: "Refill\nTracker",
    route: "/refills" as const,
    color: "#E64A19",
    gradient: ["#FF5722", "#E64A19"] as [string, string],
  },
];


function CircularProgress({progress,totalDoses, completeDoses}:circularProgressprops){
    const animationValue=useRef(new Animated.Value(0)).current;
    const size=width*0.55;
    const strokeWidth=15;
    const radius=(size-strokeWidth)/2;
    const circumference=2*Math.PI*radius;

    useEffect(()=>{
        Animated.timing(animationValue,{
            toValue:progress,
            duration:1000,
            useNativeDriver:true,
        }).start();
    },[progress])

    const strokeDashOffset=animationValue.interpolate({
        inputRange:[0,1],
        outputRange:[circumference,0],
    })

    return (
        <View style={styles.progressContainer}>
            <View style={styles.progressTextContainer}>
                <Text style={styles.progressPercentage}>{Math.round(progress)}%</Text>
                <Text style={styles.progressLabel}>{completeDoses} of {totalDoses} doses </Text>
            </View>
            <Svg width={size} height={size} style={styles.progressRing} >
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="white"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
        </View>
    )

}



const Home = () => {

  
  return (
    <ScrollView style={styles.container}>
      <LinearGradient style={styles.header} colors={["#1A8E2D","#146922"]}>
        <View style={styles.headerContent}>
            <View style={styles.headerTop}>
                <View style={{flex:1}}>
                    <Text style={styles.greeting}>Daily progress</Text>
                </View>

                <TouchableOpacity style={styles.notificationButton}>
                    <Ionicons size={28} name='notifications-outline' color='white' />
                    {
                      <View style={styles.notificationBadge}>
                        <Text style={styles.notificationCount}>1</Text>
                      </View>
                    }
                </TouchableOpacity>
            </View>

            {/* circular progress bar */}
            <CircularProgress
            progress={80}
            totalDoses={30}
            completeDoses={15}
          
            />
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.quickActioncontainer}>
          <Text style={styles.sectiontitle}>Quick Actions</Text>
          <View style={styles.quickActionGrid}>
            {
              QUICK_ACTIONS.map((value,index)=>(
                <Link href={value.route} key={value.label} asChild>
                  <TouchableOpacity style={styles.actionButton}>
                    <LinearGradient colors={value.gradient} style={styles.actioncontent}>
                      
                      <View style={styles.actionGradient}>
                      <Ionicons name={value.icon} size={30} color="white" />
                      <Text style={styles.actionLabel}>{value.label}</Text>
                      </View>
                      </LinearGradient>
                  </TouchableOpacity>
                </Link>
              ))
            }
          </View>
        </View>
      </View>



      <View style={{paddingHorizontal:20}}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Schedule</Text>
            <Link href="/calendar" asChild>
              <TouchableOpacity>
                <Text style={styles.seeAllButton}>See All</Text>
              </TouchableOpacity>
            </Link>
          </View>
          {true?(
            <View style={styles.emptyState}>
              <Ionicons name="medical-outline" size={48} color="#ccc" />
              <Text style={styles.emptyStateText}>
                No medications scheduled for today
              </Text>
              <Link href="/medications/add" asChild>
                <TouchableOpacity style={styles.addMedicationButton}>
                  <Text style={styles.addMedicationButtonText}>
                    Add Medication
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          ) : (
            [].map((value) => {
              return (
                <View style={styles.doseCard}>
                  <View
                    style={[
                      styles.doseBadge,
                      // { backgroundColor: `${value.color}15` },
                    ]}
                  >
                    <Ionicons
                      name="medical"
                      size={24}
                      // color={value.color}
                    />
                  </View>
                  <View style={styles.doseInfo}>
                    <View>
                      <Text style={styles.medicineName}>name</Text>
                      <Text style={styles.dosageInfo}>dosage</Text>
                    </View>
                    <View style={styles.doseTime}>
                      <Ionicons name="time-outline" size={16} color="#666" />
                      <Text style={styles.timeText}>time</Text>
                    </View>
                  </View>
                  {true ? (
                    <View style={[styles.takenBadge]}>
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color="#4CAF50"
                      />
                      <Text style={styles.takenText}>Taken</Text>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={[
                        styles.takeDoseButton,
                        // { backgroundColor: value.color },
                      ]}
                      // onPress={() => handleTakeDose(value)}
                    >
                      <Text style={styles.takeDoseText}>Take</Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })
          )}
        </View>

        <Modal visible={true} transparent={true} animationType='slide'>
          <View >
            <View>
              <Text>Notification</Text>
              <TouchableOpacity>
                <Ionicons name='close' size={24}  color="#333" />
              </TouchableOpacity>
            </View>

            {
              [].map((value)=>(
                <View>
                  <View><Ionicons name="medical" size={24}/></View>
                  <View>
                    <Text>medication name</Text>
                    <Text>medication dosage</Text>
                    <Text>medication time</Text>
                  </View>
                </View>
              ))
            }
          </View>

        </Modal>
        
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#f8f9fa",
  },
  header:{
    paddingTop:50,
    paddingBottom:25,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
  },
  headerContent:{
    alignItems:"center",
    paddingHorizontal:20,
  },
  headerTop:{
    flexDirection:"row",
    alignItems:"center",
    width:"100%",
    marginBottom:20,
  },
  greeting:{
    fontSize:18,
    fontWeight:"bold",
    color:"white",
    opacity:0.9,
  },
    content:{
      flex:1,
      paddingTop:20,
    },
  notificationButton:{
    position:"relative",
    padding:8,
    backgroundColor:"rgb(255,255,255,0.9)",
    borderRadius:12,
    marginLeft:8,
    elevation:10
  },
  notificationBadge:{
    position:"absolute",
    top:-1,
    right:-4,
    backgroundColor:"#ff5252",
    borderRadius:10,
    height:20,
    justifyContent:"center",
    alignItems:"center",
    paddingHorizontal:4,
    borderWidth:2,
    borderColor:"#146922",
    minWidth:20,
  },
  notificationCount:{
    fontSize:11,
    fontWeight:"600",
    color:"White",
  },
  progressContainer:{
    marginVertical:10,
    alignItems:"center",
    justifyContent:"center",
  },
  progressTextContainer:{
    position:"absolute",
    alignItems:"center",
    justifyContent:"center",
    zIndex:1,
  },
  progressPercentage:{
    fontSize:30,
    color:"white",
    fontWeight:"bold",
  },
  progressLabel:{
    fontSize:18,
    color:"rgba(255,255,255,0.9)",
    fontWeight:"bold",
  },
  progressDetails:{
    fontSize:11,
    color:"white",
    fontWeight:"bold",
  },
  progressRing:{
    transform:[{rotate:"-90deg"}],
  },
  quickActioncontainer:{
    paddingHorizontal:20,
    marginBottom:25,
  },
  quickActionGrid:{
    flexDirection:"row",
    flexWrap:"wrap",
    gap:12,
    marginTop:15,
  },
  actionButton:{
    width:(width-52)/2,
    height:110,
    borderRadius:16,
    overflow:"hidden",
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
  sectiontitle:{
    fontSize:20,
    fontWeight:"bold",
    color:"#1a1a1a",
    marginBottom:5,
  },
  actioncontent:{
    flex:1,
    justifyContent:"space-between",
  },
  section: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 5,
  },
  seeAllButton: {
    color: "#2E7D32",
    fontWeight: "600",
  },
  doseCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  doseBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  doseInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  medicineName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  dosageInfo: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  doseTime: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    marginLeft: 5,
    color: "#666",
    fontSize: 14,
  },
  takeDoseButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginLeft: 10,
  },
  takeDoseText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  emptyState: {
    alignItems: "center",
    padding: 30,
    backgroundColor: "white",
    borderRadius: 16,
    marginTop: 10,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
    marginBottom: 20,
  },
  addMedicationButton: {
    backgroundColor: "#1a8e2d",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  addMedicationButtonText: {
    color: "white",
    fontWeight: "600",
  },
  takenBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: 10,
  },
  takenText: {
    color: "#4CAF50",
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 4,
  },
})



interface circularProgressprops{
    progress: number,
    totalDoses:number,
    completeDoses:number,
}