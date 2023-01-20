import { Component } from "react";
import {Alert, Button, GestureResponderEvent, Linking, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Colors } from "react-native/Libraries/NewAppScreen";
import { connect, useDispatch } from "react-redux";
import { handleFetchPerson } from "../../controller/actions/personAction";
import { Address } from "../../model/Address";
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

    //Purpose: opens maps to the exact GeoLocation address specified for the person.
    openMaps(address: Address): void {
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${address.geoLocation.lat},${address.geoLocation.lon}`;
        const label = `${address.street} ${address.suite} ${address.zipCode}`;
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });
        if (url) {
            Linking.openURL(url);
        }
    }

    // Purpose: opens phone app with the phone number withouy extension pre-populated for calling the person on screen.
    callPhone(phone: string): void {
        let indexOfX = phone.indexOf('x'); // to remove extensions
        let phoneNumber = '';
        if (indexOfX != -1) {
            phoneNumber = phone.substring(0, indexOfX - 1);
        } else {
            phoneNumber = phone; // some phone numbers I noticed did not have extensions, in which case leave as is since phone app handles hyphens.
        }
        if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${phoneNumber}`;
        } else  {
            phoneNumber = `tel:${phoneNumber}`;
        }
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
                if (!supported) {
                    Alert.alert('Phone number is invalid. Please try again.');
                } else {
                    return Linking.openURL(phoneNumber);
                }
            })
            .catch(err => console.log(err));
    }

    // Purpose: open website URL on browser when clicked on.
    openWebsite(url: string) {
        let fullUrl: string = `https://www.${url}`;
        Linking.canOpenURL(fullUrl)
            .then(supported => {
                if (!supported) {
                    Alert.alert('Website is invalid. Please try again.');
                } else {
                    return Linking.openURL(fullUrl);
                }
            }).catch(err => console.log(err));
    }

    render(){
        let { emailText, detailContainer,fullNameText, companyNameText,contactAndOtherContainer, webLink,websiteText,
            contactAndOther,userNameAddressAndWebsite, phoneContainer, addressContainer, websiteContainer } = personViewStyles;

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
                                <TouchableOpacity style={addressContainer} onPress={() => this.openMaps(address)}>
                                    <Text style={userNameAddressAndWebsite}>{address.street}</Text>
                                    <Text style={userNameAddressAndWebsite}> {address.suite}</Text>
                                    <Text style={userNameAddressAndWebsite}>{address.city} {address.zipCode}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={phoneContainer} onPress={() => this.callPhone(phone)}>
                                    <Text style={userNameAddressAndWebsite}>{phone}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={contactAndOtherContainer}>
                                <Text style={contactAndOther}>Other Information</Text>
                                <Text style={userNameAddressAndWebsite}>User Name: {username}</Text>
                                <View style={websiteContainer}>
                                    <Text style={websiteText}>Website: </Text>
                                    <TouchableOpacity onPress={() => this.openWebsite(website)}><Text style={webLink}>{website}</Text></TouchableOpacity>
                                </View>
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
    phoneContainer: {
        backgroundColor: '#f5e1e1'
    },
    addressContainer: {
        backgroundColor: '#ADD8E6'
    },
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
    },
    websiteContainer: {
        backgroundColor: '#f5e1e1',
        paddingLeft: 20,
    },
    websiteText: {
        fontSize: 17,
        fontWeight: 'normal',
    },
    webLink: {
        fontSize: 17,
        fontWeight: 'normal',
        color: 'blue',
    }
  });

  const mapStateToProps = (state: RootState) => ({
    person: state.person.person,
    fetchingPerson: state.person.gettingPerson,
    fetchingPersonError: state.person.gettingPersonError,
  });

  export default connect(mapStateToProps, null)(PersonView);
