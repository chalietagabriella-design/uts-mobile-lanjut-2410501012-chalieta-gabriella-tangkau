import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { FavoriteProvider } from "./src/context/FavoriteContext";

export default function App() {
  return (
    <FavoriteProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </FavoriteProvider>
  );
}