import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: "#add8e6", // azul claro
          borderTopWidth: 0,
          height: 60,
        },
        tabBarActiveTintColor: "#000080", // azul escuro para item ativo
        tabBarInactiveTintColor: "#333", // cinza escuro para inativos
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
      }}
    />
  );
}
