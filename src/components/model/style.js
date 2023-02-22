import { StyleSheet } from "react-native";
import { COLORS, Theme } from "../../utils/Theme";
const styles = StyleSheet.create({
  modalWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.85)",
  },
  txtLoading: {
    fontSize: Theme.txtSmall,
    color: COLORS.black,
    marginTop: "5%",
    fontWeight: "800",
  },
});

export default styles;
