import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const MotivationScreen = () => {
  const [currentTip, setCurrentTip] = useState(0);

  const mentalHealthTips = [
    {
      title: "Study Breaks",
      content:
        "Take 5-minute breaks every 25 minutes of studying. Your brain needs rest to absorb information.",
      icon: "timer",
    },
    {
      title: "Sleep Well",
      content:
        "Aim for 7-8 hours of sleep. Your memory consolidates during sleep.",
      icon: "moon",
    },
    {
      title: "Stay Connected",
      content:
        "Talk to friends and family regularly. Social support reduces stress.",
      icon: "people",
    },
    {
      title: "Physical Activity",
      content:
        "30 minutes of exercise daily can significantly reduce anxiety and improve mood.",
      icon: "bicycle",
    },
    {
      title: "Healthy Eating",
      content:
        "Balanced meals help maintain energy levels and focus throughout the day.",
      icon: "nutrition",
    },
  ];

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % mentalHealthTips.length);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mental Health & Motivation</Text>
      <Text style={styles.subtitle}>Support for your academic journey</Text>

      {/* Current Tip */}
      <View style={styles.tipCard}>
        <Ionicons
          name={mentalHealthTips[currentTip].icon as any}
          size={40}
          color="#4361ee"
        />
        <Text style={styles.tipTitle}>
          {mentalHealthTips[currentTip].title}
        </Text>
        <Text style={styles.tipContent}>
          {mentalHealthTips[currentTip].content}
        </Text>
        <TouchableOpacity style={styles.nextButton} onPress={nextTip}>
          <Text style={styles.nextButtonText}>Next Tip</Text>
        </TouchableOpacity>
      </View>

      {/* Emergency Resources */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Immediate Help</Text>
        <TouchableOpacity style={styles.emergencyButton}>
          <Ionicons name="call" size={20} color="#fff" />
          <Text style={styles.emergencyText}>
            Campus Counseling: 012 345 6789
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.emergencyButton}>
          <Ionicons name="medkit" size={20} color="#fff" />
          <Text style={styles.emergencyText}>Health Center: 012 345 6780</Text>
        </TouchableOpacity>
      </View>

      {/* Daily Affirmations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily Affirmations</Text>
        <View style={styles.affirmationCard}>
          <Text style={styles.affirmationText}>
            "I am capable of handling challenges that come my way."
          </Text>
        </View>
        <View style={styles.affirmationCard}>
          <Text style={styles.affirmationText}>
            "My mental health is important and I prioritize it."
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3a0ca3",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    marginBottom: 20,
  },
  tipCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3a0ca3",
    marginTop: 10,
    marginBottom: 10,
  },
  tipContent: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
    lineHeight: 22,
  },
  nextButton: {
    backgroundColor: "#4361ee",
    padding: 12,
    borderRadius: 8,
  },
  nextButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3a0ca3",
    marginBottom: 15,
  },
  emergencyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff6b6b",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  emergencyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  affirmationCard: {
    backgroundColor: "#e9ecef",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#4361ee",
  },
  affirmationText: {
    fontSize: 16,
    color: "#333",
    fontStyle: "italic",
  },
});

export default MotivationScreen;
