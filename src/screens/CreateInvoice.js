import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import Header from "../components/header";
import Modals from "../components/model";
import { createInvoice } from "../services/apis";
import { COLORS, Theme } from "../utils/Theme";
import { invoice_data } from "./dummyData";

const CreateInvoice = ({
  navigation,
  route: {
    params: { accessToken, orgToken },
  },
}) => {
  const [isFetching, setIsFetching] = useState(false);
  const [invoiceData, setInvoiceData] = useState(invoice_data);
  const onCreateInvoicePress = async () => {
    setIsFetching(true);
    createInvoice(
      JSON.stringify(invoiceData),
      accessToken,
      orgToken,
      setIsFetching,
      navigation
    );
  };
  return (
    <View style={Theme.app}>
      <Modals visible={isFetching} loaderIndicator label={"Creating Invoice"} />
      <Header title={"Create Invoice"} withBtn={false} />
      <View style={{ flex: 1, width: Theme.width, alignSelf: "center" }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "black",
            marginVertical: Theme.hp("1%"),
          }}
        >
          Create your Invoice Here
        </Text>

        <View style={styles.card}>
          <ScrollView
            contentContainerStyle={{ alignItems: "center" }}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ width: "95%", marginTop: Theme.hp("1%") }}>
              <Text style={styles.txtLabel}>Bank Account</Text>

              <TextInput
                placeholder="Bank Id"
                style={styles.textbox}
                value={invoiceData.invoices[0].bankAccount.bankId}
              />
              <TextInput
                placeholder="Sort Code"
                style={styles.textbox}
                value={invoiceData.invoices[0].bankAccount.sortCode}
              />
              <TextInput
                placeholder="Account Name"
                style={styles.textbox}
                value={invoiceData.invoices[0].bankAccount.accountName}
              />
              <TextInput
                placeholder="Account Number"
                style={styles.textbox}
                value={invoiceData.invoices[0].bankAccount.accountNumber}
              />
            </View>

            <View style={{ width: "95%", marginTop: Theme.hp("1%") }}>
              <Text style={styles.txtLabel}>Customer</Text>

              <TextInput
                placeholder="First Name"
                style={styles.textbox}
                value={invoiceData.invoices[0].customer.firstName}
              />
              <TextInput
                placeholder="Last Name"
                style={styles.textbox}
                value={invoiceData.invoices[0].customer.lastName}
              />
              <TextInput
                placeholder="Email"
                style={styles.textbox}
                value={invoiceData.invoices[0].customer.contact.email}
              />
              <TextInput
                placeholder="Mobile Number"
                style={styles.textbox}
                value={invoiceData.invoices[0].customer.contact.mobileNumber}
              />
            </View>

            <View style={{ width: "95%", marginTop: Theme.hp("1%") }}>
              <Text style={styles.txtLabel}>Address</Text>

              <TextInput
                placeholder="Premise"
                style={styles.textbox}
                value={invoiceData.invoices[0].customer.addresses[0].premise}
              />
              <TextInput
                placeholder="Country Code"
                style={styles.textbox}
                value={
                  invoiceData.invoices[0].customer.addresses[0].countryCode
                }
              />
              <TextInput
                placeholder="Post Code"
                style={styles.textbox}
                value={invoiceData.invoices[0].customer.addresses[0].postcode}
              />
              <TextInput
                placeholder="County"
                style={styles.textbox}
                value={invoiceData.invoices[0].customer.addresses[0].county}
              />
              <TextInput
                placeholder="City"
                style={styles.textbox}
                value={invoiceData.invoices[0].customer.addresses[0].city}
              />
            </View>

            <View style={{ width: "95%", marginTop: Theme.hp("1%") }}>
              <Text style={styles.txtLabel}>Documents</Text>

              <TextInput
                placeholder="Document Id"
                style={styles.textbox}
                value={invoiceData.invoices[0].documents[0].documentId}
              />
              <TextInput
                placeholder="Document Name"
                style={styles.textbox}
                value={invoiceData.invoices[0].documents[0].documentName}
              />
              <TextInput
                placeholder="Document URL"
                style={styles.textbox}
                value={invoiceData.invoices[0].documents[0].documentUrl}
              />
            </View>

            <View style={{ width: "95%", marginTop: Theme.hp("1%") }}>
              <Text style={styles.txtLabel}>Invoice Reference</Text>

              <TextInput
                placeholder="Invoice Number"
                style={styles.textbox}
                value={invoiceData.invoices[0].invoiceReference}
              />
              <TextInput
                placeholder="Currency"
                style={styles.textbox}
                value={invoiceData.invoices[0].currency}
              />
              <TextInput
                placeholder="Invoice Date"
                style={styles.textbox}
                value={invoiceData.invoices[0].invoiceDate}
              />

              <TextInput
                placeholder="Due Date"
                style={styles.textbox}
                value={invoiceData.invoices[0].dueDate}
              />
              <TextInput
                placeholder="Description"
                style={styles.textbox}
                value={invoiceData.invoices[0].description}
              />
            </View>
          </ScrollView>
          <TouchableOpacity
            style={styles.btnCreate}
            onPress={() => onCreateInvoicePress()}
          >
            <Text style={styles.txtLabel}>Create Invoice</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CreateInvoice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e2e5f4",
  },
  textbox: {
    alignSelf: "center",
    width: "100%",
    padding: 10,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: Theme.hp("1%"),
  },
  card: {
    flex: 1,
    width: "100%",
    marginVertical: Theme.hp("1%"),
  },
  txtLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  btnCreate: {
    width: Theme.wp("40%"),
    height: Theme.hp("6%"),
    borderRadius: 25,
    margin: Theme.hp("1%"),
    backgroundColor: "lightgreen",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
});
