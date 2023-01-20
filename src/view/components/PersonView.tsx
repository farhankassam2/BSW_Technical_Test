import { Component } from "react";
import {Button, GestureResponderEvent, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Colors } from "react-native/Libraries/NewAppScreen";
import { connect, useDispatch } from "react-redux";
import { handleFetchPerson } from "../../controller/actions/personAction";
import { Person } from "../../model/Person";
import store, { RootState } from "../../store";
import { ApiError } from "../../util/errorHandler";
import Helpers from "../../util/helpers";
import { LoadingIndicator } from "./common-components/Loading";
import { Section } from "./common-components/Section";
type Props = {
    personId: number,
    person?: Person;
    fetchingPerson: boolean,
    fetchingPersonError?: ApiError,
    backgroundStyle: typeof Colors;
    onGoBack: () => void;
};

type State = {
    
};

class PersonView extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    componentDidMount(): void {
        store.dispatch(handleFetchPerson(this.props.personId));
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        if (!this.props.fetchingPersonError && !this.props.fetchingPerson && prevProps.fetchingPerson) {
            Helpers.notifyUserError({message: 'Person details loaded successfully.'});
        }
        if(this.props.fetchingPersonError && this.props.fetchingPersonError.message && !this.props.fetchingPerson && prevProps.fetchingPerson) {
            Helpers.notifyUserError(this.props.fetchingPersonError);
        } 
    }

    render(){
        let { emailText, detailContainer,fullNameText, companyNameText,contactAndOtherContainer, contactAndOther,userNameAddressAndWebsite } = {...personViewStyles};

        if (this.props.fetchingPerson) {
            return (
                <LoadingIndicator/>
            )
        } else if (this.props.person) {
            let { fullName, companyName, email, address, phone, username, website } = this.props.person;
            return (
                <View style={this.props.backgroundStyle}>
                    <TouchableOpacity onPress={(event) => this.props.onGoBack()} >
                        <Section title="Go back"></Section>
                    </TouchableOpacity>
                    <ScrollView
                        showsVerticalScrollIndicator={true}
                        contentInsetAdjustmentBehavior="automatic"
                        style={this.props.backgroundStyle}>
                        <View style={detailContainer}>
                            <View>
                                <Text style={fullNameText}>{fullName}</Text>
                                <Text style={companyNameText}>{companyName}</Text>
                            </View>
                            <View style={contactAndOtherContainer}>
                                <Text style={contactAndOther}>Contact Information</Text>
                                <Text style={emailText}>{email}</Text>
                                <Text style={userNameAddressAndWebsite}>{address.street}</Text>
                                <Text style={userNameAddressAndWebsite}> {address.suite}</Text>
                                <Text style={userNameAddressAndWebsite}>{address.city} {address.zipCode}</Text>
                                <Text style={userNameAddressAndWebsite}>{phone}</Text>
                            </View>
                            <View style={contactAndOtherContainer}>
                                <Text style={contactAndOther}>Other Information</Text>
                                <Text style={userNameAddressAndWebsite}>User Name: {username}</Text>
                                <Text style={userNameAddressAndWebsite}>Website: {website}</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            );
        } else {
            return (<></>);
        }
        
    }

}

const personViewStyles = StyleSheet.create({
    detailContainer: {
        marginTop: 10,
    },
    otherInfoContainer: {
        paddingTop: 15,
    },
    fullNameText: {
      fontWeight: '800',
      textAlign: 'center',
      color: 'black',
      fontSize: 25,
    },
    companyNameText: {
      fontSize: 18,
      fontWeight: '600',
      color: '#949494',
      textAlign: 'center',
    },
    contactAndOther: {
        fontWeight: '700',
        textAlign: 'center',
        color: 'black',
        fontSize: 18,
    },
    contactAndOtherContainer: {
       paddingTop: 15,
    },
    emailText: {
        fontSize: 17,
        fontWeight: 'normal',
        color: '#3f3f3f',
        paddingLeft: 20,
        paddingBottom: 10,
    },
    userNameAddressAndWebsite: {
        fontSize: 17,
        fontWeight: 'normal',
        color: '#3f3f3f',
        paddingLeft: 20,
    }
  });

  const mapStateToProps = (state: RootState) => ({
    person: state.person.person,
    fetchingPerson: state.person.gettingPerson,
    fetchingPersonError: state.person.gettingPersonError,
  });

  export default connect(mapStateToProps, null)(PersonView);
