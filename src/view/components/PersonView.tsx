import { Component } from "react";
import {Button, GestureResponderEvent, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Person } from "../../model/Person";
import { Section } from "./common-components/Section";
type Props = {
    person: Person;
    backgroundStyle: typeof Colors;
    onGoBack: () => void;
};

type State = {
    
};

export default class PersonView extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render(){
        let { fullName, companyName, email, address, phone, username, website } = {...this.props.person};
        let { emailText, detailContainer,fullNameText, companyNameText,contactAndOtherContainer, contactAndOther,userNameAddressAndWebsite } = {...personViewStyles};
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
