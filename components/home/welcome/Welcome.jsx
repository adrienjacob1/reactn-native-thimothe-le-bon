import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';

import { useRouter } from 'expo-router'; 

import styles from './welcome.style';
import { icons, SIZES } from '../../../constants';

const jobType = ["Full-time", "Part-time", "Contractor"];

const Welcome = () => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState("full-time");


  return (
    <View>
      <Text>Welcome</Text>
    </View>
  );
};

export default Welcome;