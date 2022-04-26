import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React from "react";
import Title from "../components/Title";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Title title="QUIZZLER" />
      <View style={styles.bannerContainer}>
        <Image
          source={require("../assets/banner.png")}
          resizeMode="contain"
          style={styles.banner}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Quiz")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 16,
    height: "100%",
    backgroundColor: "#A5C4D4",
  },
  bannerContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  banner: {
    width: 300,
    height: 300,
  },
  button: {
    width: "100%",
    padding: 16,
    marginBottom: 30,
    borderRadius: 16,
    alignItems: "center",
    backgroundColor: "#1A759F",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
  },
});
