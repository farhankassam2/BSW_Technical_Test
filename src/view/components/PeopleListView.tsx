import {Component, ComponentPropsWithoutRef, PropsWithChildren} from 'react';
import { Button, GestureResponderEvent, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Section } from './common-components/Section';
import {
  } from 'react-native/Libraries/NewAppScreen';
import { Person } from '../../model/Person';
import PersonView from './PersonView';

import React, { useState } from 'react'
import store, { useAppSelector, useAppDispatch, RootState } from '../../store';
import { handleFetchPeople } from '../../controller/actions/peopleAction';
import { connect } from 'react-redux';
import { ApiError } from '../../util/errorHandler';
import Helpers from '../../util/helpers';
import { LoadingIndicator } from './common-components/Loading';

type Props = {
    backgroundStyle: typeof Colors;
    people: Person[];
    isFetching: boolean;
    fetchingFailed?: ApiError;
}
type State = {
    personDetail?: Person;
}

class PeopleListView extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            personDetail: undefined,
        }
    }

    componentDidMount(): void {
        store.dispatch(handleFetchPeople);
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        if (!this.props.fetchingFailed && !this.props.isFetching && prevProps.isFetching) {
            Helpers.notifyUserError({message: 'User list loaded successfully.'});
        }
        if(this.props.fetchingFailed && this.props.fetchingFailed.message && !this.props.isFetching && prevProps.isFetching) {
            Helpers.notifyUserError(this.props.fetchingFailed);
        } 
    }

    onCardClick = (person: Person): void => {
        this.setState({ personDetail: person });
    }

    onGoBack = (): void => {
        this.setState({ personDetail: undefined });
    }

    render() {
        if (this.props.isFetching) {
            // Loading indicator
            return (
                <LoadingIndicator/>
                )
        } else if (!this.state.personDetail) {
            // If user is not viewing a person's details
            return (
                <>
                    <Section title="My Application"/>
                    <ScrollView
                    showsVerticalScrollIndicator={true}
                    contentInsetAdjustmentBehavior="automatic"
                    style={this.props.backgroundStyle}
                    contentContainerStyle={peopleListStyles.scrollContainer}>
                        {this.props.people.map(person => {
                            return <PersonCard person={person} key={person.id} onCardClick={this.onCardClick} />;
                        })}
                    </ScrollView>
                </>
                )
        } else if (this.state.personDetail) {
            return (
                <PersonView backgroundStyle={this.props.backgroundStyle} onGoBack={this.onGoBack} personId={this.state.personDetail.id}></PersonView>
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
      scrollContainer: {
        paddingBottom: 100,
      }
});


// TODO: switch to using 'em' values for margin, padding and sizing below so that it can accommodate varying screen sizes.
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
  const mapStateToProps = (state: RootState) => ({
    people: state.people.people,
    isFetching: state.people.gettingPeople,
    fetchingFailed: state.people.gettingPeopleError,
  });

  // Map action dispatchers to props: I prefer not using this as store.dispatch is clearer to me when reading...
//   const mapDispatchToProps = {
//     handleFetchPeople,
//   }

  export default connect(mapStateToProps, null)(PeopleListView);

