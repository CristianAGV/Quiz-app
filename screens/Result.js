import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React from "react";
import Title from "../components/Title";

export default function Result({ navigation, route }) {
  const { score } = route.params;
  return (
    <View style={styles.container}>
      <Title title="Results" />
      <Text style={styles.scoreValue}>{score}/100 Points</Text>
      <View style={styles.bannerContainer}>
        {score > 40 ? (
          <Image
            source={require("../assets/win.png")}
            resizeMode="contain"
            style={styles.banner}
          />
        ) : (
          <Image
            source={{
              uri: "https://cdni.iconscout.com/illustration/premium/thumb/sad-man-thinking-4884146-4087495.png",
            }}
            resizeMode="contain"
            style={styles.banner}
          />
        )}
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Go to Home</Text>
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
  scoreValue: {
    fontSize: 24,
    fontWeight: "800",
    alignSelf: "center",
  },
});
