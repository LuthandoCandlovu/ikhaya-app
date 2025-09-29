import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProfileScreen = () => {
  const [user] = useState({
    name: "Luthando ",
    email: "luthando@student.ufh.ac.za",
    studentId: "UFH202312345",
    course: "Computer Science",
    year: "Honours",
    campus: "Alice Campus",
    phone: "+27 782765932",
  });

  const [stats] = useState({
    streak: 5,
    goalsCompleted: 12,
    studyHours: 28,
    assignmentsDue: 3,
  });

  const handleAction = (action: string) => {
    Alert.alert("Action", `You selected: ${action}`);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle" size={80} color="#3a0ca3" />
          <View style={styles.statusIndicator} />
        </View>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <Text style={styles.userCourse}>
          {user.course} • {user.year}
        </Text>
      </View>

      {/* Student Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.streak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.goalsCompleted}</Text>
          <Text style={styles.statLabel}>Goals Done</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.studyHours}h</Text>
          <Text style={styles.statLabel}>Study Time</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.assignmentsDue}</Text>
          <Text style={styles.statLabel}>Due Soon</Text>
        </View>
      </View>

      {/* Student Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Student Information</Text>

        <View style={styles.infoItem}>
          <Ionicons name="school" size={20} color="#4361ee" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Student ID</Text>
            <Text style={styles.infoValue}>{user.studentId}</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="book" size={20} color="#4361ee" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Course</Text>
            <Text style={styles.infoValue}>{user.course}</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="calendar" size={20} color="#4361ee" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Year of Study</Text>
            <Text style={styles.infoValue}>{user.year}</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="location" size={20} color="#4361ee" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Campus</Text>
            <Text style={styles.infoValue}>{user.campus}</Text>
          </View>
        </View>
      </View>

      {/* Account Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleAction("Edit Profile")}
        >
          <Ionicons name="create" size={20} color="#4361ee" />
          <Text style={styles.actionText}>Edit Profile</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleAction("Academic Records")}
        >
          <Ionicons name="document-text" size={20} color="#4361ee" />
          <Text style={styles.actionText}>Academic Records</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleAction("Course Registration")}
        >
          <Ionicons name="list" size={20} color="#4361ee" />
          <Text style={styles.actionText}>Course Registration</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleAction("Notification Settings")}
        >
          <Ionicons name="notifications" size={20} color="#4361ee" />
          <Text style={styles.actionText}>Notification Settings</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => handleAction("Timetable")}
          >
            <Ionicons name="time" size={24} color="#4361ee" />
            <Text style={styles.quickActionText}>Timetable</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => handleAction("Assignments")}
          >
            <Ionicons name="document" size={24} color="#4361ee" />
            <Text style={styles.quickActionText}>Assignments</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => handleAction("Resources")}
          >
            <Ionicons name="folder" size={24} color="#4361ee" />
            <Text style={styles.quickActionText}>Resources</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => handleAction("Campus Map")}
          >
            <Ionicons name="map" size={24} color="#4361ee" />
            <Text style={styles.quickActionText}>Campus Map</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Emergency Contact */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Contact</Text>

        <View style={styles.infoItem}>
          <Ionicons name="person" size={20} color="#4361ee" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}> MRS Bonnie (Admin)</Text>
            <Text style={styles.infoValue}>+27 83 456 7890</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.emergencyButton}
          onPress={() => handleAction("Emergency Call")}
        >
          <Ionicons name="alert-circle" size={20} color="#fff" />
          <Text style={styles.emergencyText}>Emergency Call</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    alignItems: "center",
    padding: 30,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 15,
  },
  statusIndicator: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 16,
    height: 16,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#fff",
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#3a0ca3",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: "#6c757d",
    marginBottom: 5,
  },
  userCourse: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4361ee",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    padding: 15,
    margin: 10,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3a0ca3",
  },
  statLabel: {
    fontSize: 12,
    color: "#6c757d",
    marginTop: 5,
  },
  section: {
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3a0ca3",
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoContent: {
    marginLeft: 15,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  actionText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 15,
    flex: 1,
  },
  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  quickActionButton: {
    width: "48%",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    marginBottom: 10,
  },
  quickActionText: {
    marginTop: 8,
    color: "#2c3e50",
    fontWeight: "500",
  },
  emergencyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff6b6b",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  emergencyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default ProfileScreen;
