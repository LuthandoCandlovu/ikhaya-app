import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";

export default function DailyGoals() {
  const [goals, setGoals] = useState([
    { id: 1, text: "Complete math assignment", completed: false },
    { id: 2, text: "Read chapter 5 of biology", completed: true },
    { id: 3, text: "Practice English vocabulary", completed: false },
    { id: 4, text: "Attend study group session", completed: false },
  ]);

  const [newGoal, setNewGoal] = useState("");

  const toggleGoal = (id) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  const addGoal = () => {
    if (newGoal.trim() === "") {
      Alert.alert("Error", "Please enter a goal");
      return;
    }

    const newGoalItem = {
      id: Date.now(),
      text: newGoal,
      completed: false,
    };
    setGoals([...goals, newGoalItem]);
    setNewGoal("");
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const renderRightActions = (progress, dragX, id) => {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteGoal(id)}
      >
        <Ionicons name="trash" size={24} color="white" />
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Today's Goals</Text>
        <Text style={styles.subtitle}>
          {goals.filter((g) => g.completed).length} of {goals.length} completed
        </Text>
      </View>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${
                (goals.filter((g) => g.completed).length / goals.length) * 100
              }%`,
            },
          ]}
        />
      </View>

      <View style={styles.addGoalContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new goal..."
          value={newGoal}
          onChangeText={setNewGoal}
          onSubmitEditing={addGoal}
        />
        <TouchableOpacity style={styles.addButton} onPress={addGoal}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.goalsList}>
        {goals.map((goal) => (
          <Swipeable
            key={goal.id}
            renderRightActions={(progress, dragX) =>
              renderRightActions(progress, dragX, goal.id)
            }
          >
            <TouchableOpacity
              style={styles.goalItem}
              onPress={() => toggleGoal(goal.id)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.checkbox,
                  goal.completed && styles.checkboxCompleted,
                ]}
              >
                {goal.completed && (
                  <Ionicons name="checkmark" size={16} color="white" />
                )}
              </View>
              <Text
                style={[
                  styles.goalText,
                  goal.completed && styles.goalTextCompleted,
                ]}
              >
                {goal.text}
              </Text>
            </TouchableOpacity>
          </Swipeable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  subtitle: {
    fontSize: 16,
    color: "#7f8c8d",
  },
  progressBar: {
    height: 6,
    backgroundColor: "#ecf0f1",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 16,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#2ecc71",
    borderRadius: 3,
  },
  addGoalContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    backgroundColor: "white",
  },
  addButton: {
    backgroundColor: "#3498db",
    borderRadius: 8,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  goalsList: {
    marginBottom: 16,
  },
  goalItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "white",
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#bdc3c7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  checkboxCompleted: {
    backgroundColor: "#2ecc71",
    borderColor: "#2ecc71",
  },
  goalText: {
    fontSize: 16,
    color: "#2c3e50",
    flex: 1,
  },
  goalTextCompleted: {
    textDecorationLine: "line-through",
    color: "#7f8c8d",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "80%",
    borderRadius: 8,
    marginTop: 8,
  },
});
