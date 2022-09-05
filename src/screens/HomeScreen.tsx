import { Text, View, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";
import Layout from "../components/Layout";

const HomeScreen = ({ navigation }) => {
  return (
    <Layout>
      <Text style={styles.text}>Home</Text>
      <CustomButton
        title="LOG OUT"
        onPress={() => navigation.navigate("Auth")}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  text: {
    width: "100%",
    color: "#424242",
    padding: 20,
  },
});

export default HomeScreen;
