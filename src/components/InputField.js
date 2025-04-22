// import React from 'react';
// import { View, TextInput, Text, StyleSheet, Image } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

// export default function InputField({
//   label,
//   icon,
//   isPassword,
//   value,
//   onChangeText,
//   variant = 'filled',
//   customIcon, // <-- Add this prop
// }) {
//   return (
//     <View style={styles.container}>
//       {label && <Text style={styles.label}>{label}</Text>}
//       <View style={styles.inputWrapper}>
//         {customIcon ? (
//           <Image source={customIcon} style={styles.iconImage} />
//         ) : (
//           <Icon name={icon} size={20} color="#666" style={styles.icon} />
//         )}

//         <TextInput
//           value={value}
//           onChangeText={onChangeText}
//           secureTextEntry={isPassword}
//           style={styles.input}
//           placeholder={label}
//           placeholderTextColor="#aaa"
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     marginVertical: 10,
//   },
//   label: {
//     marginBottom: 5,
//     color: '#2D3B59',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   inputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     backgroundColor: '#f2f2f2',
//   },
//   icon: {
//     marginRight: 10,
//   },
//   iconImage: {
//     width: 20,
//     height: 20,
//     resizeMode: 'contain',
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     paddingVertical: 8,
//     fontSize: 16,
//     color: '#000',
//   },
// });

// import React, { useState } from 'react';
// import { View, TextInput, StyleSheet, Text, Animated } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// export default function InputField({ label, icon, isPassword, value, onChangeText }) {
//   const [isFocused, setIsFocused] = useState(false);

//   return (
//     <View style={styles.wrapper}>
//       <Text style={[styles.label, (isFocused || value) && styles.labelFocused]}>{label}</Text>

//       <View
//         style={[
//           styles.inputContainer,
//           isFocused && { borderColor: '#000' },
//           isPassword && { backgroundColor: isFocused ? '#fff' : '#eaeaea' },
//         ]}
//       >
//         <Ionicons name={icon} size={20} color="#000" style={styles.icon} />
//         <TextInput
//           style={styles.input}
//           placeholder=""
//           secureTextEntry={isPassword}
//           value={value}
//           onChangeText={onChangeText}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => setIsFocused(false)}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   wrapper: {
//     marginVertical: 15,
//   },
//   label: {
//     position: 'absolute',
//     top: -10,
//     left: 20,
//     backgroundColor: '#fff',
//     paddingHorizontal: 6,
//     fontSize: 14,
//     color: '#555',
//     fontFamily: 'Gilroy-Regular',
//     zIndex: 1,
//   },
//   labelFocused: {
//     color: '#000',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 50,
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   icon: {
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//     fontFamily: 'Gilroy-Regular',
//     color: '#000',
//   },
// });
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function InputField({ label, icon, isPassword, value, onChangeText, variant = 'filled' }) {
  const [isFocused, setIsFocused] = useState(false);

  const floating = variant === 'floating';

  return (
    <View style={styles.wrapper}>
      {floating ? (
        <Text
          style={[
            styles.floatingLabel,
            (isFocused || value) && styles.floatingLabelFocused,
          ]}
        >
          {label}
        </Text>
      ) : (
        <Text style={styles.staticLabel}>{label}</Text>
      )}

      <View
        style={[
          styles.inputContainer,
          isFocused && { borderColor: '#000' },
          isPassword && { backgroundColor: isFocused ? '#fff' : '#eaeaea' },
        ]}
      >
        <Ionicons name={icon} size={20} color="#000" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={floating ? '' : label}
          secureTextEntry={isPassword}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 15,
  },

  // Floating label styles
  floatingLabel: {
    position: 'absolute',
    top: -10,
    left: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 6,
    fontSize: 14,
    color: '#555',
    fontFamily: 'Gilroy-Regular',
    zIndex: 1,
  },
  floatingLabelFocused: {
    color: '#000',
  },

  // Filled label style (static above)
  staticLabel: {
    marginBottom: 8,
    fontSize: 14,
    color: '#555',
    fontFamily: 'Gilroy-Regular',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Gilroy-Regular',
    color: '#000',
  },
});
