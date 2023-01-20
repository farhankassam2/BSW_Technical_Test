import {Component, ComponentPropsWithoutRef, PropsWithChildren} from 'react';
import {Button, GestureResponderEvent, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Section } from './common-components/Section';
import {
  } from 'react-native/Libraries/NewAppScreen';
import { Person } from '../../model/Person';
import PersonView from './PersonView';

import React, { useState } from 'react'
import store, { useAppSelector, useAppDispatch } from '../../store';
import { handleFetchPeople } from '../../controller/actions/peopleAction';
import { ApplicationState } from '../../controller/rootReducer';
import { connect } from 'react-redux';
import { ApiError } from '../../util/errorHandler';

type Props = {
    backgroundStyle: typeof Colors;
    people: Person[];
    isFetching: boolean;
    fetchingFailed?: ApiError;
}
type State = {
    isViewingDetail: boolean;
    personDetail?: Person;
}

class PeopleListView extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isViewingDetail: false,
        }
    }

    componentDidMount() {
        this.fetchPeople();
    }
    
    fetchPeople = async (): Promise<void> => {
        const dispatch = useAppDispatch();
        dispatch(handleFetchPeople);
    }

    onCardClick = (person: Person): void => {
        this.setState({ isViewingDetail: true, personDetail: person });
    }

    onGoBack = (): void => {
        this.setState({ isViewingDetail: false, personDetail: undefined });
    }

    render() {
        if (this.props.isFetching) {
            // Loading indicator
            return (
                <View style={peopleListStyles.loadingContainer}>
                    <Text style={peopleListStyles.welcome}>Loading...........</Text>
                </View>
                )
        } else if (!this.state.isViewingDetail) {
            // If user is not viewing a person's details
            return (
                <>
                    <Section title="My Application"/>
                    <ScrollView
                    showsVerticalScrollIndicator={true}
                    contentInsetAdjustmentBehavior="automatic"
                    style={this.props.backgroundStyle}>
                        {this.props.people.map(person => {
                            return <PersonCard person={person} key={person.id} onCardClick={this.onCardClick} />;
                        })}
                    </ScrollView>
                </>
                )
        } else if (this.state.personDetail) {
            return (
                // TODO: modify such that it dispatches action to fetch person detail, in case it has been updated in the database by someone else.
                <PersonView backgroundStyle={this.props.backgroundStyle} person={this.state.personDetail} onGoBack={this.onGoBack} ></PersonView>
            );
        } else {
            return (<></>)
        }
    }
};

type PersonProps = {
    person: Person;
    onCardClick: (person: Person) => any;
};
export function PersonCard({person, onCardClick}: PersonProps): JSX.Element {
    return (
            <TouchableOpacity style={personCardStyles.cardContainer} onPress={(event) => onCardClick(person)}>
                     <Text style={personCardStyles.cardName}>{person.fullName}</Text>
                    <Text style={personCardStyles.cardEmail}>{person.email}</Text>
            </TouchableOpacity>
    )
}

const peopleListStyles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        justifyContent: 'center',
      },
      welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 50,
        width: 100%,
      },
})


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

  // Map redux state to props
  const mapStateToProps = (state: ApplicationState) => ({
    people: state.peopleState.people,
    isFetching: state.peopleState.gettingPeople,
    fetchingFailed: state.peopleState.gettingPeopleError,
  });

  // Map action dispatchers to props
//   const mapDispatchToProps = {
//     handleFetchPeople,
//   }

  export default connect(mapStateToProps, null)(PeopleListView);

