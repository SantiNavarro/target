import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

const CustomButton = (props) => {
  const { onPress, title = "Save" } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: "black",
    maxWidth: 140
  },
  text: {
    fontSize: 12,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "#fff",
  },
});

export default CustomButton;
