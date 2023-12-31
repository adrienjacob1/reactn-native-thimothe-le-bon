import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';

import { useRouter } from 'expo-router';

import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import useFetch from '../../../hook/useFetch';

import styles from './popularjobs.style';
import { COLORS, SIZES } from '../../../constants';

const Popularjobs = () => {
  const router = useRouter();

  const { data, isLoading, error } = useFetch('search', { query: 'react native developer in Paris, FR', num_pages: '1'});

  const [selectedJob, setSelectedJob] = useState([]);

  function handleCardPress(item) {
    setSelectedJob(item.job_id);
    router.push(`/job-details/${item.job_id}`);
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <Text style={styles.headerTitle}>Popular jobs</Text>

        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        { /* JS expression */
          isLoading ? ( <ActivityIndicator size='large' colors={COLORS.primary} />  ) : 
          error ? ( <Text> Something went wrong </Text> ) : 
          (
            <FlatList 
              horizontal
              data={data}
              keyExtractor={item => item?.job_id }
              renderItem={ ( { item } ) => ( <PopularJobCard item={ item } selectedJob={selectedJob} handleCardPress={handleCardPress} /> ) }
              contentContainerStyle={ { columnGap: SIZES.medium } }
            />
          )
        }
      </View>

    </View>
  );
}

export default Popularjobs;