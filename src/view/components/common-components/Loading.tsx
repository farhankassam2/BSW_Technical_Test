import { View, Text, StyleSheet } from "react-native";

export function LoadingIndicator({}: {}): JSX.Element {
    return (
        <View style={peopleListStyles.loadingContainer}>
            <Text style={peopleListStyles.welcome}>Loading........... Thank you for your patience.</Text>
        </View>
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
        width: '100%',
      },
});