import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import capitalize from "capitalize";
import { ListItem } from "react-native-elements";
import  randomColor  from "randomcolor";

const styles = StyleSheet.create({
  avatarContainer: {
    height: 32,
    width: 32,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center"
  },
  initials: {
    textAlign: "center",
    color: '#FFF'
  }
});

const getInitials = (name = "") => name[0].toUpperCase();
const renderInitials = (name = "") => (
  <View
    style={[
      styles.avatarContainer,
      { backgroundColor: randomColor({ luminosity: "dark" }) }
    ]}>
    <Text style={styles.initials}>{getInitials(name)}</Text>
  </View>
);
const renderPicture = ({ uri, name }) => (
  <Image
    alt={name}
    style={styles.avatarContainer}
    source={{ uri: uri }}
  />
);

const Contact = ({ name, mobile,uri }) => (
  <ListItem
    title={capitalize.words(name)}
    subtitle={mobile}
    leftAvatar={
      mobile ? renderPicture({ uri, name }) : renderInitials(name)
    }
  />
);
export default Contact;
