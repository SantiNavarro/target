import { Text, View } from "react-native";
import tw from "twrnc";
import CustomButton from "../components/CustomButton";
import Layout from "../components/Layout";

const HomeScreen = ({ navigation }) => {
  return (
    <Layout>
      <View style={tw.style("flex items-center")}>
        <Text style={tw.style("w-full text-[#424242] p-[20px]")}>Home</Text>
        <CustomButton
          title="LOG OUT"
          onPress={() => navigation.navigate("Auth")}
        />
      </View>
    </Layout>
  );
};

export default HomeScreen;
