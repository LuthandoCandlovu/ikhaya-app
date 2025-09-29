import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ReportScreen = () => {
  const router = useRouter();
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState("medium");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const issueCategories = [
    { id: "noise", name: "Noise Complaint", icon: "volume-high" },
    { id: "wifi", name: "WiFi Issues", icon: "wifi" },
    { id: "cleanliness", name: "Cleanliness", icon: "trash" },
    { id: "maintenance", name: "Maintenance", icon: "construct" },
    { id: "safety", name: "Safety Concern", icon: "shield" },
    { id: "other", name: "Other Issue", icon: "help-circle" },
  ];

  const handleSubmit = () => {
    if (!issueType || !description) {
      Alert.alert("Error", "Please select issue type and provide description");
      return;
    }

    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        "Success!",
        "Your issue has been reported. Maintenance team will contact you soon.",
        [{ text: "OK", onPress: () => router.back() }]
      );

      // Reset form
      setIssueType("");
      setDescription("");
      setUrgency("medium");
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report Issue</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        {/* Issue Type Selection */}
        <Text style={styles.sectionTitle}>What's the problem?</Text>
        <View style={styles.categoriesGrid}>
          {issueCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                issueType === category.id && styles.categoryButtonSelected,
              ]}
              onPress={() => setIssueType(category.id)}
            >
              <Ionicons
                name={category.icon as any}
                size={24}
                color={issueType === category.id ? "#fff" : "#4361ee"}
              />
              <Text
                style={[
                  styles.categoryText,
                  issueType === category.id && styles.categoryTextSelected,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Urgency Level */}
        <Text style={styles.sectionTitle}>How urgent is this?</Text>
        <View style={styles.urgencyContainer}>
          <TouchableOpacity
            style={[
              styles.urgencyButton,
              urgency === "low" && styles.urgencyButtonLow,
            ]}
            onPress={() => setUrgency("low")}
          >
            <Ionicons
              name="time"
              size={20}
              color={urgency === "low" ? "#fff" : "#4caf50"}
            />
            <Text
              style={[
                styles.urgencyText,
                urgency === "low" && styles.urgencyTextSelected,
              ]}
            >
              Low
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.urgencyButton,
              urgency === "medium" && styles.urgencyButtonMedium,
            ]}
            onPress={() => setUrgency("medium")}
          >
            <Ionicons
              name="alert"
              size={20}
              color={urgency === "medium" ? "#fff" : "#ff9800"}
            />
            <Text
              style={[
                styles.urgencyText,
                urgency === "medium" && styles.urgencyTextSelected,
              ]}
            >
              Medium
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.urgencyButton,
              urgency === "high" && styles.urgencyButtonHigh,
            ]}
            onPress={() => setUrgency("high")}
          >
            <Ionicons
              name="warning"
              size={20}
              color={urgency === "high" ? "#fff" : "#f44336"}
            />
            <Text
              style={[
                styles.urgencyText,
                urgency === "high" && styles.urgencyTextSelected,
              ]}
            >
              High
            </Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <Text style={styles.sectionTitle}>Describe the issue</Text>
        <TextInput
          style={styles.descriptionInput}
          placeholder="Please provide detailed description of the problem..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            isSubmitting && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Ionicons name="send" size={20} color="#fff" />
          <Text style={styles.submitButtonText}>
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Text>
        </TouchableOpacity>

        {/* Emergency Contact */}
        <View style={styles.emergencyNotice}>
          <Ionicons name="alert-circle" size={24} color="#f44336" />
          <Text style={styles.emergencyText}>
            For emergencies, immediately contact Residence Management: 012 345
            6789
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
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#4361ee",
    padding: 20,
    paddingTop: 50,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3a0ca3",
    marginBottom: 15,
    marginTop: 20,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryButton: {
    width: "48%",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#e9ecef",
  },
  categoryButtonSelected: {
    backgroundColor: "#4361ee",
    borderColor: "#4361ee",
  },
  categoryText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
  categoryTextSelected: {
    color: "#fff",
  },
  urgencyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  urgencyButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#e9ecef",
  },
  urgencyButtonLow: {
    backgroundColor: "#4caf50",
    borderColor: "#4caf50",
  },
  urgencyButtonMedium: {
    backgroundColor: "#ff9800",
    borderColor: "#ff9800",
  },
  urgencyButtonHigh: {
    backgroundColor: "#f44336",
    borderColor: "#f44336",
  },
  urgencyText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  urgencyTextSelected: {
    color: "#fff",
  },
  descriptionInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    minHeight: 120,
    fontSize: 16,
    marginBottom: 20,
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4361ee",
    padding: 18,
    borderRadius: 10,
    marginBottom: 20,
  },
  submitButtonDisabled: {
    backgroundColor: "#8fa0e3",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  emergencyNotice: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffebee",
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#f44336",
  },
  emergencyText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#d32f2f",
    fontWeight: "500",
  },
});

export default ReportScreen;
