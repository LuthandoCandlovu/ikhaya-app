import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

// Screens
import Chat from "./chat";
import Feedback from "./Feedback";
import Index from "./index";
import Map from "./map";
import Motivation from "./motivation";
import Profile from "./profile";
import Report from "./report";
import Settings from "./settings";

// New Feature Screens
import Achievements from "./Achievements";
import StudyProgressTracker from "./StudyProgressTracker";
import StudyTimer from "./StudyTimer";
import VoiceAssistant from "./VoiceAssistant";

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home-outline";

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Chat") {
            iconName = focused ? "chatbubbles" : "chatbubbles-outline";
          } else if (route.name === "Map") {
            iconName = focused ? "map" : "map-outline";
          } else if (route.name === "Motivation") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Report") {
            iconName = focused ? "document-text" : "document-text-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          } else if (route.name === "Feedback") {
            iconName = focused ? "star" : "star-outline";
          } else if (route.name === "Timer") {
            iconName = focused ? "timer" : "timer-outline";
          } else if (route.name === "Achievements") {
            iconName = focused ? "trophy" : "trophy-outline";
          } else if (route.name === "Voice") {
            iconName = focused ? "mic" : "mic-outline";
          } else if (route.name === "Progress") {
            iconName = focused ? "stats-chart" : "stats-chart-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Index} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="Timer" component={StudyTimer} />
      <Tab.Screen name="Progress" component={StudyProgressTracker} />
      <Tab.Screen name="Motivation" component={Motivation} />
      <Tab.Screen name="Achievements" component={Achievements} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Report" component={Report} />
      <Tab.Screen name="Feedback" component={Feedback} />
      <Tab.Screen name="Voice" component={VoiceAssistant} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
