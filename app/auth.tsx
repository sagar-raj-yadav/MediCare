import * as LocalAuthentication from "expo-local-authentication";
import { useEffect, useState } from "react";
import { Button, Text, TouchableOpacity, View,Dimensions, StyleSheet } from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {LinearGradient} from 'expo-linear-gradient';
const { width, height } = Dimensions.get("window");
import {useRouter} from 'expo-router';

const AuthScreen = () => {

    const router=useRouter();

    const [hasbiometrics,setHasBiometrics]=useState(true);
    const [isAuthenticated,setIsAuthenticated]=useState(false);
    const [error,setError]=useState<string | null>(null);


  const checkBiometrics = async () => {
    const hardware=await LocalAuthentication.authenticateAsync();
    const isEnabled=await LocalAuthentication.isEnrolledAsync();

    setHasBiometrics(hardware && isEnabled);
  };

useEffect(()=>{
    checkBiometrics()
},[]);


const authenticate=async()=>{
    try{
        setIsAuthenticated(true);
        setError(null);
        const hasHardware=await LocalAuthentication.hasHardwareAsync();
        const isEnrolled =await LocalAuthentication.isEnrolledAsync();

        const supportedTypes=await LocalAuthentication.supportedAuthenticationTypesAsync();

        //handle supported types
        const auth=await LocalAuthentication.authenticateAsync({
            promptMessage:hasHardware && isEnrolled? 'Scan your face/Touch ID':"Enter your pin to access Medicare",
            fallbackLabel:'use pin',
            cancelLabel:'cancel',
            disableDeviceFallback:false,
        });

        if(auth.success){
            router.replace("/Home")  //yaha home page dalna h
        }
       else{
        setError("Authentication Failed:please try again");
       }
    }catch(error){ }
}

useEffect(()=>{
    authenticate();
},[])


  return (
    <LinearGradient colors={["#4CAF50","#2E7D32"]} style={styles.container}>
        <View style={styles.content}>
            <View style={styles.iconContainer}> 
                <Ionicons name="medical" size={80} color="white" /> 
            </View>
            <Text style={styles.title}>MediTrack</Text>
            <Text style={styles.subtitle}>Your Personal Medicaton Reminder</Text>
            <View style={styles.card}>
                <Text style={styles.welcomeText}>Welcome Back!</Text>
                <Text style={styles.instructionText}>{hasbiometrics?"use Face ID/Touch ID or PIN":"Enter Your Pin to access your Medicare"}</Text>
                <TouchableOpacity style={[styles.button,isAuthenticated&&styles.buttonDiasble]} 
                //   onPress={authenticate}
                  >
                    <Ionicons style={styles.buttonIcon} name={hasbiometrics?"finger-print-outline":"keypad-outline" } size={24} color="white" />
                    <Text style={styles.buttonText}>{isAuthenticated ? "Verifying..." : hasbiometrics ? "Authenticate" : "Enter Pin"}</Text>
                    </TouchableOpacity>
                {error && (
                <View style={styles.errorConatiner}>
                    <Ionicons name="alert-circle" size={20} color={"#f44336"}/>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
                )}
            </View>
        </View>
   
    </LinearGradient>
  );
};

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    content:{
        flex:1,
        padding:20,
        justifyContent:"center",
        alignItems:"center",
    },
    iconContainer:{
        width:120,
        height:120,
        backgroundColor:"rgba(255,255,255,0.2)",
        borderRadius:16,
        justifyContent:"center",
        alignItems:"center",
        marginBottom:20
    },
    title:{
        fontSize:24,
        fontWeight:"bold",
        color:"white",
        textShadowColor:"rgba(0,0,0,0.2)",
        textShadowOffset:{width:1,height:1},
        textShadowRadius:10,
    },
    subtitle:{
        fontSize:18,
        color:"rgba(255,255,255,0.9)",
        marginBottom:10,
        textAlign:"center"
    },
    card:{
        backgroundColor:"white",
        borderRadius:20,
        padding:30,
        width:width-40,
        alignItems:"center",
        shadowColor:"#000",
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.25,
        shadowRadius:3.84,
        elevation:5
    },
    welcomeText:{
        fontSize:24,
        marginBottom:10,
        fontWeight:"bold",
        color:"#333",
    },
    instructionText:{
        fontSize:16,
        marginBottom:30,
        textAlign:"center",
        color:"#666",
    },
    button:{
        backgroundColor:"#4CAF50",
        borderRadius:12,
        paddingVertical:15,
        paddingHorizontal:30,
        width:'100%',
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
    },
    buttonDiasble:{
        opacity:0.7,
    },
    buttonIcon:{
        marginRight:10,
    },
    buttonText:{
        color:"white",
        fontSize:16,
        fontWeight:"bold",
    },
    errorConatiner:{
        flexDirection:"row",
        alignItems:"center",
        marginTop:20,
        padding:10,
        backgroundColor:"ffebee",
        borderRadius:8,
    },
    errorText:{
        color:"#f44336",
        fontSize:14,
        marginLeft:8
    },

})
export default AuthScreen;
