import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
const Theme = {
  txtTiny: RFPercentage(1.3),
  txtSmallest: RFPercentage(1.8),
  txtSmall: RFPercentage(2),
  txtMedium: RFPercentage(2.5),
  txtLarge: RFPercentage(3),
  txtExtraLarge: RFPercentage(3.5),
  wp,
  hp,
  RFPercentage,
  width: wp("95%"),
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  app: {
    flex: 1,
    backgroundColor: "#e2e5f4",
  },
};
const COLORS = {
  primary: "green",
  secondary: "#E7873B",
  bg: "#e2e5f4",
  white: "white",
  black: "black",
  gray1: "#525455",
};
export { Theme, COLORS };
