import { Text, View, Pressable, StyleSheet, Dimensions } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const IMAGE_HEIGHT = SCREEN_HEIGHT * 0.6;
const CONTENT_HEIGHT = SCREEN_HEIGHT * 0.4;

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/reading.jpg")}
          style={styles.image}
          contentFit="cover"
        />
        <LinearGradient
          colors={["transparent", "rgba(255,255,255,0.3)", "rgba(255,255,255,0.7)", "#FFFFFF"]}
          locations={[0, 0.7, 0.85, 1]}
          style={styles.gradient}
        />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.text}>
          Lorem ipsum dolor{"\n"}
          sit amet,{"\n"}
          consectetur{"\n"}
          adipiscing eli
        </Text>

        <Pressable style={styles.button} onPress={() => console.log("Get Started pressed")}>
          <Text style={styles.buttonText}>Get Started</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  imageContainer: {
    height: IMAGE_HEIGHT,
    width: "100%",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
  },
  contentContainer: {
    height: CONTENT_HEIGHT,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 2,
    paddingBottom: 40,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: "400",
    color: "#000000",
    textAlign: "center",
    lineHeight: 32,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#000000",
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
