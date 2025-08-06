// import { useState, useEffect } from "react";
// import {
//   Alert,
//   StyleSheet,
//   View,
//   AppState,
//   AppStateStatus,
//   TextInput,
//   Text,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";
// import { supabase } from "../services/supabase";
// import React = require("react");

// const Auth: React.FC = () => {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     const subscription = AppState.addEventListener(
//       "change",
//       handleAppStateChange
//     );
//     return () => subscription.remove();
//   }, []);

//   const handleAppStateChange = (state: AppStateStatus) => {
//     if (state === "active") {
//       supabase.auth.startAutoRefresh();
//     } else {
//       supabase.auth.stopAutoRefresh();
//     }
//   };

//   const signInWithEmail = async () => {
//     setLoading(true);
//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) Alert.alert(error.message);
//     setLoading(false);
//   };

//   return (
//     <View style={[styles.verticallySpaced, styles.container]}>
//       <View style={styles.formWrapper}>
//         <Text style={styles.header}>Welcome Back!</Text>
//         <Text style={styles.subHeader}>Sign in to your account.</Text>

//         <View style={styles.formContainer}>
//           <Text style={styles.inputLabel}>Email</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="email@address.com"
//             placeholderTextColor="#999"
//             onChangeText={(text: string) => setEmail(text)}
//             value={email}
//             autoCapitalize="none"
//             keyboardType="email-address"
//             textContentType="emailAddress"
//           />

//           <Text style={styles.inputLabel}>Password</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Password"
//             placeholderTextColor="#999"
//             onChangeText={(text: string) => setPassword(text)}
//             value={password}
//             secureTextEntry
//             autoCapitalize="none"
//             textContentType="password"
//           />

//           <TouchableOpacity
//             style={[styles.button, styles.signInButton]}
//             onPress={signInWithEmail}
//             disabled={loading}
//           >
//             {loading ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <Text style={styles.buttonText}>Sign In</Text>
//             )}
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default Auth;

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 40,
//     padding: 12,
//   },
//   verticallySpaced: {
//     paddingTop: 4,
//     paddingBottom: 4,
//     alignSelf: "stretch",
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 16, // Added horizontal padding for better layout
//   },
//   mt20: {
//     marginTop: 20,
//   },
//   formWrapper: {
//     width: "100%", // The form wrapper now takes up the full width within the padding
//     maxWidth: 400, // Optional: keeps the form from being too wide on tablets
//   },
//   header: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 8,
//     textAlign: "center",
//   },
//   subHeader: {
//     fontSize: 16,
//     color: "#666",
//     marginBottom: 40,
//     textAlign: "center",
//   },
//   formContainer: {
//     width: "100%",
//   },
//   inputLabel: {
//     fontSize: 16,
//     color: "#333",
//     fontWeight: "600",
//     marginBottom: 8,
//     marginTop: 16,
//   },
//   input: {
//     height: 50,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     paddingHorizontal: 16,
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: "#e0e0e0",
//   },
//   button: {
//     height: 50,
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 30,
//   },
//   signInButton: {
//     backgroundColor: "#6C63FF",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "600",
//   },
// });
