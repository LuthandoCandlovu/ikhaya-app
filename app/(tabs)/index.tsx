// tabs/index.tsx
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function Home() {
  const router = useRouter();

  const features = [
    {
      icon: "chatbubble-ellipses",
      title: "Chat Support",
      description: "Talk with our AI assistant",
      color: "#6366F1",
      route: "/chat",
    },
    {
      icon: "heart",
      title: "Mood Check",
      description: "Track your daily feelings",
      color: "#EC4899",
      route: "/mood",
    },
    {
      icon: "map",
      title: "Resources",
      description: "Find local support",
      color: "#10B981",
      route: "/map",
    },
    {
      icon: "play-circle",
      title: "Meditation",
      description: "Guided sessions",
      color: "#F59E0B",
      route: "/meditation",
    },
  ];

  const dailyActivities = [
    { activity: "Meditation", duration: "5 min", icon: "🌙", progress: 80 },
    { activity: "Mood", status: "Good", icon: "😊", progress: 90 },
    { activity: "Sleep", duration: "7h", icon: "💤", progress: 75 },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning! 👋</Text>
          <Text style={styles.subtitle}>How are you feeling today?</Text>
        </View>
        <View style={styles.avatar}>
          <Ionicons name="person" size={24} color="#6366F1" />
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Ionicons name="flame" size={24} color="#FF6B6B" />
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Day streak</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="checkmark-circle" size={24} color="#4ECDC4" />
          <Text style={styles.statNumber}>85%</Text>
          <Text style={styles.statLabel}>Weekly goal</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="happy" size={24} color="#FFD166" />
          <Text style={styles.statNumber}>4.5</Text>
          <Text style={styles.statLabel}>Avg mood</Text>
        </View>
      </View>

      {/* Daily Check-in Card */}
      <TouchableOpacity style={styles.checkinCard}>
        <View style={styles.checkinContent}>
          <View>
            <Text style={styles.checkinTitle}>Daily Check-in</Text>
            <Text style={styles.checkinText}>Share how you're feeling</Text>
          </View>
          <View style={styles.checkinButton}>
            <Ionicons name="chevron-forward" size={20} color="#fff" />
          </View>
        </View>
        <View style={styles.checkinEmojis}>
          <Text style={styles.emoji}>😊</Text>
          <Text style={styles.emoji}>😐</Text>
          <Text style={styles.emoji}>😔</Text>
          <Text style={styles.emoji}>😢</Text>
        </View>
      </TouchableOpacity>

      {/* Features Grid */}
      <Text style={styles.sectionTitle}>Quick Access</Text>
      <View style={styles.featuresGrid}>
        {features.map((feature, index) => (
          <TouchableOpacity
            key={index}
            style={styles.featureCard}
            onPress={() => router.push(feature.route as any)}
          >
            <View
              style={[styles.featureIcon, { backgroundColor: feature.color }]}
            >
              <Ionicons name={feature.icon as any} size={24} color="#fff" />
            </View>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureDescription}>{feature.description}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recent Activities */}
      <View style={styles.activitiesCard}>
        <View style={styles.activitiesHeader}>
          <Text style={styles.activitiesTitle}>Today's Progress</Text>
          <Ionicons name="time" size={20} color="#666" />
        </View>
        {dailyActivities.map((activity, index) => (
          <View key={index} style={styles.activityItem}>
            <Text style={styles.activityIcon}>{activity.icon}</Text>
            <View style={styles.activityInfo}>
              <Text style={styles.activityName}>{activity.activity}</Text>
              <Text style={styles.activityDetail}>
                {activity.duration || activity.status}
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${activity.progress}%` },
                ]}
              />
            </View>
          </View>
        ))}
      </View>

      {/* Motivation Card */}
      <View style={styles.motivationCard}>
        <Ionicons name="sparkles" size={24} color="#FFD166" />
        <Text style={styles.motivationText}>
          "Your mental health is a priority. Your happiness is essential. Your
          self-care is a necessity."
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E293B",
  },
  subtitle: {
    fontSize: 16,
    color: "#64748B",
    marginTop: 4,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E0E7FF",
    alignItems: "center",
    justifyContent: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#64748B",
  },
  checkinCard: {
    backgroundColor: "#667eea",
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
  },
  checkinContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  checkinTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  checkinText: {
    fontSize: 14,
    color: "#E0E7FF",
    marginTop: 4,
  },
  checkinButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  checkinEmojis: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  emoji: {
    fontSize: 28,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 16,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  featureCard: {
    width: (width - 60) / 2,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
    textAlign: "center",
  },
  featureDescription: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
  },
  activitiesCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  activitiesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  activitiesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  activityIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
  },
  activityDetail: {
    fontSize: 12,
    color: "#64748B",
  },
  progressBar: {
    width: 60,
    height: 6,
    backgroundColor: "#E2E8F0",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#10B981",
    borderRadius: 3,
  },
  motivationCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  motivationText: {
    flex: 1,
    fontSize: 14,
    color: "#475569",
    fontStyle: "italic",
    marginLeft: 12,
    lineHeight: 20,
  },
});
