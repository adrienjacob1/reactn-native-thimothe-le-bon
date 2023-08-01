import React, { useCallback, useState } from "react";
import { Text, View, SafeAreaView,  ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";

import { Company, JobFooter, JobTabs, ScreenHeaderBtn, Specifics, JobAbout } from "../components";
import useFetch from "../hook/useFetch";

import { COLORS, icons, SIZES } from "../constants";

export default function JobDetails() {
    const params = useSearchParams();
    const router = useRouter();

    const tabs = ["About", "Qualifications", "Responsibilities"];

    const { data, isLoading, error, refetch } = useFetch('job-details', { job_id: params.id });

    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState(tabs[0]);

    function onRefresh() {
        useCallback(() => {
            setRefreshing(true);
            refetch();
            setRefreshing(false);
        }, []);
    }

    function displayTabContent() {
        switch (activeTab) {
            case "Qualifications":
                
                return <Specifics title="Qualifications" points={data[0].job_highlights?.Qualifications ?? ['N/A'] } /> ;

            case "About":
            
                return <JobAbout info={data[0].job_description ?? ['No data provided'] } /> ;

            case "Responsibilities":
            
            return <Specifics title="Responsibilities" points={data[0].job_highlights?.Responsibilities ?? ['N/A'] } /> ;
    
            default:
                break;
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension="60%"
                            handlePress={() => router.back()}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn iconUrl={icons.share} dimension="100%" />
                    ),
                    headerTitle: "",
                }}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {isLoading ? (
                    <ActivityIndicator size="large" colors={COLORS.primary} />
                ) : error ? (
                    <Text> Something went wrong </Text>
                ) : (
                    <View></View>
                )}
            </ScrollView>
        </SafeAreaView>
    );

}