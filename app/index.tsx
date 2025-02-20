import { StyleSheet, Text, View ,Animated} from 'react-native'
import {useEffect,useRef} from 'react';
import {Ionicons} from "@expo/vector-icons";
import {useRouter} from 'expo-router';


const SplashScreen = () => {

  const router=useRouter();

  const FadeAnim=useRef(new Animated.Value(0)).current;
  const scaleAnim=useRef(new Animated.Value(0.5)).current;

  useEffect(()=>{
    Animated.parallel([
      Animated.timing(FadeAnim,{
        toValue:1,
        duration:1000,
        useNativeDriver:true
      }),
      Animated.spring(scaleAnim,{
        toValue:1,
        tension:10,
        friction:2,
        useNativeDriver:true
      })
      ]).start();
     const timer= setTimeout(()=>{
      router.replace("/Home");
      },2000)

      return ()=>clearTimeout(timer);
  },[])

  return (
    <View style={styles.container}>
      <Animated.View
      style={[ styles.iconContainer,
        {
          opacity:FadeAnim,
          transform:[{scale:scaleAnim}]
        }
      ]}>
         {/* icon color */}
        <Ionicons name="medical" size={80} color="white" />
        <Text style={styles.appname}>MediCare</Text>
      </Animated.View>
     
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#4CAF50",
        alignItems:"center",
        justifyContent:"center"
    },
    iconContainer:{
      alignItems:"center",
    },
    appname:{
      color:"white",
      fontSize:32,
      fontWeight:"bold",
      marginTop:20,
      letterSpacing:1,
    },
   
})