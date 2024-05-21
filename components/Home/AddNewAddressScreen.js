// AddNewAddressScreen.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';




const AddNewAddressScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <GoogleMapsComponent />
            <View style={styles.formContainer}>
                <Text style={styles.label}>First Name</Text>
                <TextInput style={styles.input} />
                <Text style={styles.label}>Phone Number</Text>
                <TextInput style={styles.input} />
                <Text style={styles.label}>Building Address</Text>
                <TextInput style={styles.input} />
                <Text style={styles.label}>Street Address</Text>
                <TextInput style={styles.input} />
                <Text style={styles.label}>City</Text>
                <TextInput style={styles.input} />
                <Text style={styles.label}>State</Text>
                <TextInput style={styles.input} />
                <Text style={styles.label}>Pincode</Text>
                <TextInput style={styles.input} />
                <Text style={styles.label}>Latitude</Text>
                <TextInput style={styles.input} />
                <Text style={styles.label}>Longitude</Text>
                <TextInput style={styles.input} />
                <Text style={styles.label}>Address Type</Text>
                <TextInput style={styles.input} />
                <Text style={styles.label}>Save Address As</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.saveButton}>
                        <Text style={styles.buttonText}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveButton}>
                        <Text style={styles.buttonText}>Office</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveButton}>
                        <Text style={styles.buttonText}>Other</Text>
                    </TouchableOpacity>
                </View>
                {/* Add other input fields for address details here */}
                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.buttonText}>Add Address</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    formContainer: {
        padding: 20,
    },
    label: {
        marginTop: 10,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    saveButton: {
        backgroundColor: 'lightgrey',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    addButton: {
        backgroundColor: 'green',
        borderRadius: 20,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default AddNewAddressScreen;
