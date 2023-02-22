import { StyleSheet } from "react-native";
import { COLORS, Theme } from "../../utils/Theme";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: Theme.hp("1.5%"),
    width: Theme.width,
    alignSelf: "center",
  },
  txtHeader: {
    color: "black",
    fontWeight: "600",
    fontSize: Theme.txtLarge,
    marginLeft: 8,
  },
  btnCreate: {
    backgroundColor: "lightgreen",
    padding: Theme.wp("2%"),
    borderRadius: 10,
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  txtTitle: { color: "black", fontWeight: "600", fontSize: Theme.txtSmall },
});
export default styles;
