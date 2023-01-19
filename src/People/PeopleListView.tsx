import React, {Component, ComponentPropsWithoutRef, PropsWithChildren} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Section } from '../common-components/Section';
import {
  } from 'react-native/Libraries/NewAppScreen';
import { Person } from '../types/Person';

type Props = {
    backgroundStyle: typeof Colors;
    people: Person[];
}
export default class PeopleListView extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={this.props.backgroundStyle}>
                {this.props.people.map(person => {
                    return <PersonCard person={person} key={person.id} />
                })
                }
        </ScrollView>
        )
    }
};

type PersonProps = {
    person: Person;
};
export function PersonCard({person}: PersonProps): JSX.Element {
    return (
        <View style={personCardStyles.cardContainer}>
            <Text style={personCardStyles.cardName}>{person.fullName}</Text>
            <Text style={personCardStyles.cardEmail}>{person.email}</Text>
        </View>
    )
}

const personCardStyles = StyleSheet.create({
    cardContainer: {
      marginTop: 2,
      width: '100%',
      backgroundColor: '#D3D3D3'
    },
    cardName: {
        paddingLeft: 24,
      fontSize: 24,
      fontWeight: '700',
      color: 'black'
    },
    cardEmail: {
        paddingLeft: 24,
      marginTop: 8,
      fontSize: 19,
      fontWeight: '400',
      color: 'grey'
    },
  });

