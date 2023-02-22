import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./style";
import { Theme } from "../../utils/Theme";
import { images } from "../../assets/images";
const Header = ({ title, onPressCreateInvoice, withBtn }) => {
  return (
    <>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={images.list}
            style={{ width: Theme.wp("9%"), height: Theme.wp("9%") }}
            resizeMode="center"
          />
          <Text style={styles.txtHeader}>{title}</Text>
        </View>
        {withBtn ? (
          <TouchableOpacity
            onPress={onPressCreateInvoice}
            style={styles.btnCreate}
          >
            <Text style={styles.txtTitle}>Create Invoice</Text>
          </TouchableOpacity>
        ) : (
          <Text />
        )}
      </View>
    </>
  );
};

export default Header;
