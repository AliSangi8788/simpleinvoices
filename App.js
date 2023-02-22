import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateInvoice from "./src/screens/CreateInvoice";
import InvoiceListing from "./src/screens/InvoiceListing";

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={"InvoiceListing"}
      >
        <Stack.Screen name="InvoiceListing" component={InvoiceListing} />
        <Stack.Screen name="CreateInvoice" component={CreateInvoice} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
