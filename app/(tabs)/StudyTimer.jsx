import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";

export default function StudyTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState("work");
  const [scaleAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      Vibration.vibrate([500, 200, 500]);
      setIsActive(false);
      setMode(mode === "work" ? "break" : "work");
      setTimeLeft(mode === "work" ? 5 * 60 : 25 * 60);

      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => {
    setIsActive(!isActive);

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === "work" ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: mode === "work" ? "#e74c3c" : "#2ecc71" },
      ]}
    >
      <Text style={styles.modeText}>
        {mode === "work" ? "Focus Time" : "Break Time"}
      </Text>

      <Animated.Text
        style={[styles.timerText, { transform: [{ scale: scaleAnim }] }]}
      >
        {formatTime(timeLeft)}
      </Animated.Text>

      <View style={styles.controls}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity style={styles.controlButton} onPress={toggleTimer}>
            <Ionicons
              name={isActive ? "pause" : "play"}
              size={32}
              color="white"
            />
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity style={styles.controlButton} onPress={resetTimer}>
          <Ionicons name="refresh" size={32} color="white" />
        </TouchableOpacity>
      </View>

      <Text style={styles.tipText}>
        {mode === "work"
          ? "Stay focused on your task"
          : "Take a short break, you deserve it!"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modeText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  timerText: {
    color: "white",
    fontSize: 72,
    fontWeight: "bold",
    marginVertical: 16,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  controlButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 50,
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 12,
  },
  tipText: {
    color: "white",
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
  },
});
