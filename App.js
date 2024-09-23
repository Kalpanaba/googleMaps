import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

export default function App() {
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [destination, setDestination] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [currentAddress, setCurrentAddress] = useState('Fetching location...');
  const [destinationCoordinates, setDestinationCoordinates] = useState(null);
  const [distance, setDistance] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  // Replace with your actual Google API key
  const GOOGLE_API_KEY = 'AIzaSyAEVsTjBYWgi0L9Dzxh_5l4-XzaJ13tsxY';

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = coords;

      setLocation({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      fetchAddressFromCoordinates(latitude, longitude);
    })();
  }, []);

  const fetchAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const address = response.data.display_name;
      // Shorten the address by taking the first few components
      setCurrentAddress(address.split(',').slice(0, 4).join(', '));
    } catch (error) {
      console.error('Error fetching address:', error);
      setCurrentAddress('Unable to fetch location');
    }
  };

  // Fetch only suggestions from India and format the address
  const fetchSuggestions = async (text) => {
    if (text.length < 3) return;
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${text}, India&format=json&addressdetails=1&limit=5&accept-language=en`
      );
      
      // Filter results to only those where "country" is India
      const indianSuggestions = response.data.filter(
        (item) => item.address && item.address.country === 'India'
      );

      setSuggestions(indianSuggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSelectDestination = (item) => {
    setDestination(item.display_name);
    setDestinationCoordinates({
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon),
    });
    setSuggestions([]);
    fetchRoute(location, { latitude: parseFloat(item.lat), longitude: parseFloat(item.lon) });
  };

  const getCurrentLocation = async () => {
    try {
      let { coords } = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = coords;
      setLocation({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      fetchAddressFromCoordinates(latitude, longitude);
    } catch (error) {
      console.error('Error getting current location: ', error);
    }
  };

  const calculateHaversineDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (x) => (x * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const handleCalculateDistance = () => {
    if (!destinationCoordinates) {
      Alert.alert('Please select a destination first');
      return;
    }

    const dist = calculateHaversineDistance(
      location.latitude,
      location.longitude,
      destinationCoordinates.latitude,
      destinationCoordinates.longitude
    );
    
    setDistance(dist.toFixed(2) + ' km');
    Alert.alert(`Distance: ${dist.toFixed(2)} km`);
  };

  const fetchRoute = async (origin, destination) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${GOOGLE_API_KEY}`
      );

      if (response.data.routes && response.data.routes.length > 0) {
        const points = decodePolyline(response.data.routes[0].overview_polyline.points);
        setRouteCoordinates(points);
      } else {
        console.error('No routes found:', response.data);
        Alert.alert('Error', 'No routes found for the given destination.');
      }
    } catch (error) {
      console.error('Error fetching route:', error);
      Alert.alert('Error', 'Failed to fetch route. Please check your inputs.');
    }
  };

  const decodePolyline = (t, e = 5) => {
    let points = [];
    let index = 0,
      lat = 0,
      lng = 0;

    while (index < t.length) {
      let b, shift = 0,
        result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = (result & 1 ? ~(result >> 1) : result >> 1);
      lat += dlat;

      shift = result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = (result & 1 ? ~(result >> 1) : result >> 1);
      lng += dlng;

      points.push({
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      });
    }
    return points;
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={location} showsUserLocation={true}>
        <Marker coordinate={location} title="Current Location" />
        {destinationCoordinates && (
          <>
            <Marker coordinate={destinationCoordinates} title="Destination" />
            <Polyline
              coordinates={routeCoordinates}
              strokeColor="blue"
              strokeWidth={2}
            />
          </>
        )}
      </MapView>

      <View style={styles.header}>
        <Text>
          <Text style={styles.hamburgerText}>☰</Text>
        </Text>

        <TouchableOpacity style={styles.currentLocationBox} onPress={getCurrentLocation}>
          <Text style={styles.currentLocationText}>{currentAddress}</Text>
          <View style={styles.circle}></View>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <View style={styles.destinationContainer}>
          <TextInput
            style={styles.destinationInput}
            placeholder="Enter Destination"
            value={destination}
            onChangeText={(text) => {
              setDestination(text);
              fetchSuggestions(text);
            }}
          />
          <TouchableOpacity style={styles.searchIcon}>
            <Image
              source={{ uri: 'https://img.icons8.com/material-outlined/24/000000/search.png' }}
              style={styles.searchIconImage}
            />
          </TouchableOpacity>
        </View>

        {suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.place_id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectDestination(item)}>
                <Text style={styles.suggestionText}>{item.display_name}</Text>
              </TouchableOpacity>
            )}
          />
        )}

        <TouchableOpacity style={styles.distanceButton} onPress={handleCalculateDistance}>
          <Text style={styles.distanceButtonText}>Calculate Distance</Text>
        </TouchableOpacity>

        {distance && (
          <View style={styles.distanceBox}>
            <Text>Distance: {distance}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '60%',
  },
  header: {
    position: 'absolute',
    top: 50,
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hamburgerText: {
    fontSize: 24,
  },
  currentLocationBox: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentLocationText: {
    fontSize: 16,
    marginRight: 10,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  destinationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  destinationInput: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  searchIcon: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  searchIconImage: {
    width: 24,
    height: 24,
  },
  suggestionText: {
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  distanceButton: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
  },
  distanceButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  distanceBox: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
});