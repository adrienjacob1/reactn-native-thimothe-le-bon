import React from 'react';

import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from './popularjobcard.style.js';
import checkImageUrl from '../../../../utils';

const PopularJobCard = ( { item, selectedJob, handleCardPress } ) => {
  const placeholderImage = "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg";

  return (
    <TouchableOpacity
      style={styles.container(selectedJob, item)}
      onPress={ () => handleCardPress(item) }
    >
      <TouchableOpacity style={styles.logoContainer(selectedJob, item)} >
        <Image resizeMode="contain" style={styles.logoImage} source={ { uri: checkImageUrl(item.employer_logo) ? item.employer_logo : placeholderImage } } />
      </TouchableOpacity>


      <Text style={styles.companyName}> { item.employer_name } </Text>

      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedJob, item)}> { item.job_title } </Text>
      </View>

    </TouchableOpacity>
  )
}
export default PopularJobCard