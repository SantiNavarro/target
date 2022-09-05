import { ImageBackground, View } from "react-native";
import tw from "twrnc";

type Props = {
  children: React.ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <View style={tw.style("flex-1")}>
      <ImageBackground
        source={require("../../assets/backgroundTemplate.png")}
        resizeMode="cover"
        style={tw.style("flex-1 justify-center")}
      >
        {children}
      </ImageBackground>
    </View>
  );
};

export default Layout;
