import { StyleSheet, ImageBackground, View } from "react-native";

type Props = {
  children: React.ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/backgroundTemplate.png")}
        resizeMode="cover"
        style={styles.image}
      >
        {children}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Layout;
