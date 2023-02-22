import axios from "axios";
import { ToastAndroid } from "react-native";

export const getUserProfile = async (access_token) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "membership-service/1.2.0/users/me",
    headers: {
      Authorization: `Bearer ${access_token}`,
      Cookie: "JSESSIONID=0E0601D06B60FC70D369B51D457254DF",
    },
  };
  try {
    let res = await axios(config);
    return res.data;
  } catch (error) {
    console.log("ERROR getUserProfile() => ", JSON.stringify(error, 2, 4));
  }
};

export const getInvoicesList = async (access_token, orgToken) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "invoice-service/2.0.0/invoices",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
      "Operation-Mode": "SYNC",
      "org-token": orgToken,
      Accept: "application/json",
      Cookie: "JSESSIONID=A3E0A04898C5BDEDF02D2F6FF2CF22F3",
    },
    data: "",
  };
  try {
    let res = await axios(config);
    return res.data;
  } catch (error) {
    console.log("ERROR getInvoicesList() => ", JSON.stringify(error, 2, 4));
  }
};

export const createInvoice = async (
  data,
  access_token,
  orgToken,
  setIsFetching,
  navigation
) => {
  // let data = JSON.stringify({
  //   invoices: [
  //     {
  //       bankAccount: {
  //         bankId: "",
  //         sortCode: "09-01-01",
  //         accountNumber: "12345678",
  //         accountName: "John Terry",
  //       },
  //       customer: {
  //         firstName: "Nguyen",
  //         lastName: "Dung 2",
  //         contact: {
  //           email: "nguyendung2@101digital.io",
  //           mobileNumber: "+6597594971",
  //         },
  //         addresses: [
  //           {
  //             premise: "CT11",
  //             countryCode: "VN",
  //             postcode: "1000",
  //             county: "hoangmai",
  //             city: "hanoi",
  //           },
  //         ],
  //       },
  //       documents: [
  //         {
  //           documentId: "96ea7d60-89ed-4c3b-811c-d2c61f5feab2",
  //           documentName: "Bill",
  //           documentUrl: "http://url.com/#123",
  //         },
  //       ],
  //       invoiceReference: "#123456",
  //       invoiceNumber: "INV" + new Date().getTime(),
  //       currency: "GBP",
  //       invoiceDate: "2021-05-27",
  //       dueDate: "2021-06-04",
  //       description: "Invoice is issued to Akila Jayasinghe",
  //       customFields: [
  //         {
  //           key: "invoiceCustomField",
  //           value: "value",
  //         },
  //       ],
  //       extensions: [
  //         {
  //           addDeduct: "ADD",
  //           value: 10,
  //           type: "PERCENTAGE",
  //           name: "tax",
  //         },
  //         {
  //           addDeduct: "DEDUCT",
  //           type: "FIXED_VALUE",
  //           value: 10,
  //           name: "discount",
  //         },
  //       ],
  //       items: [
  //         {
  //           itemReference: "itemRef",
  //           description: "Honda RC150",
  //           quantity: 1,
  //           rate: 1000,
  //           itemName: "Honda Motor",
  //           itemUOM: "KG",
  //           customFields: [
  //             {
  //               key: "taxiationAndDiscounts_Name",
  //               value: "VAT",
  //             },
  //           ],
  //           extensions: [
  //             {
  //               addDeduct: "ADD",
  //               value: 10,
  //               type: "FIXED_VALUE",
  //               name: "tax",
  //             },
  //             {
  //               addDeduct: "DEDUCT",
  //               value: 10,
  //               type: "PERCENTAGE",
  //               name: "tax",
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // });
  console.log("Body=> ", data);
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "invoice-service/2.0.0/invoices",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Operation-Mode": "SYNC",
      "org-token": orgToken,
      "Content-Type": "application/json",
      Cookie:
        "JSESSIONID=5BA11DC3F1045B524AD6F0714A18EEDC; JSESSIONID=A3E0A04898C5BDEDF02D2F6FF2CF22F3",
    },
    data: data,
  };

  axios(config)
    .then((response) => {
      navigation.goBack();
      ToastAndroid.showWithGravity(
        "Invoice Created",
        2000,
        ToastAndroid.BOTTOM
      );
      console.log(JSON.stringify(response.data, 2, 4));
    })
    .catch((error) => {
      console.log("ERROR createInvoice() => ", JSON.stringify(error, 2, 4));
    })
    .finally(() => {
      setIsFetching(false);
    });
};
