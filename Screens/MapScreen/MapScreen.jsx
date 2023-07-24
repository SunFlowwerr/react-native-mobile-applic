import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

export const MapScreen = ({ navigation, route }) => {
  const { location } = route.params || {};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home", { screen: "PostsScreen" })}
        >
          <Ionicons
            name="ios-arrow-back-outline"
            size={24}
            color="black"
            style={styles.backBtn}
          />
        </TouchableOpacity>

        <Text style={styles.headerText}>Мапа</Text>
      </View>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude: location?.latitude,
          longitude: location?.latitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        minZoomLevel={15}
        onMapReady={() => console.log("Map is ready")}
        onRegionChange={() => console.log("Region change")}
      >
        <Marker
          title="I am here"
          coordinate={{
            latitude: location?.latitude,
            longitude: location?.latitude,
          }}
          description="Hello"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: "100%",
    paddingBottom: 0,
    marginBottom: 0,
  },
  header: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    margin: 0,
    marginTop: 20,
    padding: 0,
    height: "7%",
    fontSize: 17,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#BDBDBD",
  },
  headerText: {
    fontSize: 17,
    fontWeight: 500,
  },
  backBtn: {
    position: "absolute",
    left: -120,
    top: -10,
    width: 24,
    height: 24,
  },
  mapStyle: {
    // width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,

    width: "100%",
    height: "90%",
  },
});
