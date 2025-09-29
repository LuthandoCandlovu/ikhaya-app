import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function StudyProgress() {
  const [progressData] = useState({
    weeklyGoal: 20, // hours
    completed: 12.5,
    subjects: [
      { name: "Mathematics", hours: 4.5, color: "#4361ee" },
      { name: "Biology", hours: 3.2, color: "#4cc9f0" },
      { name: "English", hours: 2.8, color: "#f72585" },
      { name: "Physics", hours: 2.0, color: "#7209b7" },
    ],
    streak: 5,
  });

  const progressAnimation = new Animated.Value(0);

  Animated.timing(progressAnimation, {
    toValue: (progressData.completed / progressData.weeklyGoal) * 100,
    duration: 1500,
    easing: Easing.out(Easing.exp),
    useNativeDriver: false,
  }).start();

  const widthInterpolate = progressAnimation.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Study Progress</Text>
        <Text style={styles.subtitle}>Weekly Overview</Text>
      </View>

      {/* Progress Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="time" size={24} color="#4361ee" />
          <Text style={styles.cardTitle}>Weekly Goal</Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressLabels}>
            <Text style={styles.progressText}>
              {progressData.completed}h of {progressData.weeklyGoal}h
            </Text>
            <Text style={styles.percentageText}>
              {Math.round(
                (progressData.completed / progressData.weeklyGoal) * 100
              )}
              %
            </Text>
          </View>

          <View style={styles.progressBarBackground}>
            <Animated.View
              style={[styles.progressBarFill, { width: widthInterpolate }]}
            />
          </View>
        </View>

        <View style={styles.streakContainer}>
          <Ionicons name="flame" size={20} color="#ff6b6b" />
          <Text style={styles.streakText}>
            {progressData.streak} day streak!
          </Text>
        </View>
      </View>

      {/* Subject Breakdown */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="library" size={24} color="#4361ee" />
          <Text style={styles.cardTitle}>Subject Breakdown</Text>
        </View>

        {progressData.subjects.map((subject, index) => (
          <View key={index} style={styles.subjectItem}>
            <View style={styles.subjectInfo}>
              <View
                style={[
                  styles.subjectColor,
                  { backgroundColor: subject.color },
                ]}
              />
              <Text style={styles.subjectName}>{subject.name}</Text>
            </View>
            <Text style={styles.subjectHours}>{subject.hours}h</Text>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="flash" size={24} color="#4361ee" />
          <Text style={styles.cardTitle}>Quick Actions</Text>
        </View>

        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="document-text" size={28} color="#4361ee" />
            <Text style={styles.actionText}>Notes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="calendar" size={28} color="#4361ee" />
            <Text style={styles.actionText}>Schedule</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="book" size={28} color="#4361ee" />
            <Text style={styles.actionText}>Resources</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="stats-chart" size={28} color="#4361ee" />
            <Text style={styles.actionText}>Analytics</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Motivation Section */}
      <View style={styles.motivationCard}>
        <Ionicons name="trophy" size={32} color="#FFD700" />
        <Text style={styles.motivationText}>
          You're doing great! Keep up the good work!
        </Text>
        <Text style={styles.motivationSubtext}>
          Just {progressData.weeklyGoal - progressData.completed}h left to reach
          your weekly goal.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#3a0ca3",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    marginTop: 5,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3a0ca3",
    marginLeft: 10,
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressText: {
    fontSize: 16,
    color: "#2c3e50",
  },
  percentageText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4361ee",
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: "#ecf0f1",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#4361ee",
    borderRadius: 4,
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff5f5",
    padding: 10,
    borderRadius: 8,
  },
  streakText: {
    color: "#e74c3c",
    fontWeight: "600",
    marginLeft: 5,
  },
  subjectItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  subjectInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  subjectColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  subjectName: {
    fontSize: 16,
    color: "#2c3e50",
  },
  subjectHours: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4361ee",
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionButton: {
    width: "48%",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    marginBottom: 10,
  },
  actionText: {
    marginTop: 8,
    color: "#2c3e50",
    fontWeight: "500",
  },
  motivationCard: {
    backgroundColor: "#e8f4fd",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 30,
  },
  motivationText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  motivationSubtext: {
    fontSize: 14,
    color: "#6c757d",
    textAlign: "center",
  },
});
