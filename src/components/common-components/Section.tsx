import React from 'react';
import type {PropsWithChildren} from 'react';
import { useColorScheme, View, Text, StyleSheet } from "react-native";

type SectionProps = PropsWithChildren<{
    title: string;
  }>;
  
  export function Section({children, title}: SectionProps): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    return (
      <View style={styles.sectionContainer}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: 'white',
            },
          ]}>
          {title}
        </Text>
        <Text
          style={[
            styles.sectionDescription,
            {
              color: 'white',
            },
          ]}>
          {children}
        </Text>
      </View>
    );
  }


  const styles = StyleSheet.create({
    sectionContainer: {
      paddingLeft: 24,
      backgroundColor: 'blue'
    },
    sectionTitle: {
        marginTop: 24,
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      fontSize: 18,
      fontWeight: '400',
    },
  });