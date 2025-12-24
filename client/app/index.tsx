import { View, StyleSheet, Dimensions, Text } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import AppView from "./components/ui/AppView";
import AppText from "./components/ui/AppText";
import AppTitle from "./components/ui/AppTitle";
import AppButton from "./components/ui/AppButton";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const IMAGE_HEIGHT = SCREEN_HEIGHT * 0.6;
const CONTENT_HEIGHT = SCREEN_HEIGHT * 0.4;

export default function Index() {
  return (
    <AppView style={styles.container}>
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

      <AppView style={styles.contentContainer}>
        <AppView style={styles.textContainer}>
          <AppTitle>Welcome to the world of reading,</AppTitle>
          <AppText style={styles.description}>
            where you can find your next favorite book.
          </AppText>
        </AppView>

        <AppButton onPress={() => console.log("Get Started pressed")}>
          <Text style={styles.buttonText}>Get Started</Text>
        </AppButton>
      </AppView>
    </AppView>
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
    flex: 1,
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  description: {
    fontSize: 16,
    textAlign: "left",
    lineHeight: 24,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
  },
});
