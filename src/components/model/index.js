import { View, Text, Modal } from "react-native";
import React from "react";
import { COLORS, Theme } from "../../utils/Theme";
import styles from "./style";
import { WaveIndicator } from "react-native-indicators";
const Modals = ({ loaderIndicator, visible, label }) => {
  return (
    <>
      {loaderIndicator === true ? (
        <Modal visible={visible} transparent>
          <View style={styles.modalWrap}>
            <View style={{ height: Theme.hp("12%") }}>
              <WaveIndicator size={Theme.hp("12%")} color={COLORS.primary} />
            </View>
            {label && <Text style={styles.txtLoading}>{label}</Text>}
          </View>
        </Modal>
      ) : null}
    </>
  );
};

export default Modals;
