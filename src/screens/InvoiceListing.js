import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import qs from "qs";
import { getInvoicesList, getUserProfile } from "../services/apis";
import { COLORS, Theme } from "../utils/Theme";
import Modal from "../components/model";
import Header from "../components/header";
import { useIsFocused } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/MaterialCommunityIcons";

const InvoiceListing = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [accessToken, setAccessToken] = useState("");
  const [orgToken, setOrgToken] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [invoiceListData, setInvoiceListData] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [isAlphabatically, setIsAlphabatically] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    if (isFocused) {
      // ? Calling API's on every Focus
      setIsFetching(true);
      generateAccessToken();
    }
  }, [isFocused]);
  // ? Genrating Access Token Getting UserProfile after that getting invoices
  const generateAccessToken = async () => {
    let data = qs.stringify({
      client_id: "oO8BMTesSg9Vl3_jAyKpbOd2fIEa",
      client_secret: "0Exp4dwqmpON_ezyhfm0o_Xkowka",
      grant_type: "password",
      scope: "openid",
      username: "dung+octopus4@101digital.io",
      password: "Abc@123456",
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie:
          "JSESSIONID=DF40708EA8440BEE9B7ADB6DED23BAC4; JSESSIONID=9B056D615EF24469E06F7753E25E856D",
      },
      data: data,
    };

    axios(config)
      .then(async (response) => {
        setAccessToken(response.data?.access_token);
        let userProfile = await getUserProfile(response.data?.access_token);
        setOrgToken(userProfile?.data?.memberships[0]?.token);
        let invoicesList = await getInvoicesList(
          response.data?.access_token,
          userProfile?.data?.memberships[0]?.token
        );
        setInvoiceListData(invoicesList?.data);
        setMasterDataSource(invoicesList?.data);
      })
      .catch((error) => {
        console.log(
          "ERROR generateAccessToken() => ",
          JSON.stringify(error, 2, 4)
        );
      })
      .finally(() => {
        setIsFetching(false);
      });
  };
  // ? Search Filter by invoice Number
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter((val) => {
        if (val?.invoiceNumber?.toLowerCase().includes(text.toLowerCase()))
          return val;
      });
      setInvoiceListData(newData);
    } else {
      setInvoiceListData(masterDataSource);
    }
    setSearchQuery(text);
  };
  // ? renderInvoice Card
  const renderInvoice = ({ item, index }) => {
    return (
      <View style={styles.invoiceCard} key={index}>
        <View
          style={{
            ...styles.sideBar,
            backgroundColor: item?.totalAmount > 0 ? "green" : "lightgreen",
          }}
        />
        <View style={{ flexDirection: "column", width: "40%" }}>
          <Text style={styles.txtTitle}>Invoice ID</Text>
          <Text style={styles.txtDesc}>{item?.invoiceNumber}</Text>

          <Text style={styles.txtTitle}>Description</Text>
          <Text style={styles.txtDesc} numberOfLines={1}>
            {item?.description == "" ? "NAN" : item?.description}
          </Text>

          <Text style={styles.txtTitle}>Number Of Documents</Text>
          <Text style={styles.txtDesc}>{item?.numberOfDocuments}</Text>
        </View>

        <View style={{ flexDirection: "column", width: "40%" }}>
          <Text style={styles.txtTitle}>Type</Text>
          <Text style={styles.txtDesc}>{item?.type}</Text>

          <Text style={styles.txtTitle}>Amount</Text>
          <Text style={styles.txtDesc}>
            {item?.currencySymbol} {item?.totalAmount}
          </Text>

          <Text style={styles.txtTitle}>Due Date</Text>
          <Text style={styles.txtDesc}>{item?.dueDate}</Text>
        </View>
      </View>
    );
  };
  const onCreateInvoice = () => {
    navigation.navigate("CreateInvoice", { accessToken, orgToken });
    // * Resetting States
    setSearchQuery("");
    setIsAlphabatically(false);
  };
  return (
    <View style={Theme.app}>
      <Modal visible={isFetching} loaderIndicator label={"Fetching Invoices"} />
      <Header
        title={"Invoice List"}
        onPressCreateInvoice={() => onCreateInvoice()}
        withBtn={true}
      />
      <View style={styles.searchView}>
        <TextInput
          placeholderTextColor={COLORS.gray1}
          placeholder="Search by Invoice ID"
          style={styles.textbox}
          value={searchQuery}
          onChangeText={searchFilterFunction}
        />
        <TouchableOpacity
          onPress={() => setIsAlphabatically(!isAlphabatically)}
        >
          <FontAwesome5
            name={
              isAlphabatically
                ? "sort-calendar-ascending"
                : "sort-calendar-descending"
            }
            size={Theme.hp("3.5%")}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={
          isAlphabatically
            ? invoiceListData.sort(
                (a, b) => new Date(a?.createdAt) - new Date(b?.createdAt)
              )
            : invoiceListData.sort(
                (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
              )
        }
        renderItem={renderInvoice}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => <View style={{ height: 10 }} />}
        keyExtractor={(item) => item.invoiceId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  invoiceCard: {
    width: Theme.width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: Theme.hp("16%"),
    backgroundColor: "white",
    marginTop: Theme.hp("1.5%"),
    borderRadius: 10,
    alignSelf: "center",
  },
  sideBar: {
    height: "100%",
    width: Theme.wp("2.5%"),
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  searchView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: Theme.width,
    alignSelf: "center",
  },
  textbox: {
    width: "88%",
    padding: 10,
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: Theme.hp("1%"),
  },
  txtTitle: { color: "black", fontWeight: "600", fontSize: Theme.txtSmall },
  txtDesc: { color: "black", fontWeight: "300", fontSize: Theme.txtSmallest },
});

export default InvoiceListing;
