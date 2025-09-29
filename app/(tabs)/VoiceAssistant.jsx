import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import * as Speech from "expo-speech";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const [commandResult, setCommandResult] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [pulseAnim] = useState(new Animated.Value(1));
  const soundRef = useRef(new Audio.Sound());
  const recognitionTimeoutRef = useRef(null);

  // Enhanced voice commands with better responses
  const commands = {
    study: {
      action: () => {
        const responses = [
          "Starting focused study mode. I'll mute notifications for 25 minutes. 🎯",
          "Study session activated! Remember to stay hydrated. 💧",
          "Time to focus! Starting your study environment setup.",
        ];
        return responses[Math.floor(Math.random() * responses.length)];
      },
    },
    pomodoro: {
      action: () => {
        const responses = [
          "Pomodoro timer set for 25 minutes. Focus session starting now! ⏰",
          "25-minute work sprint begins now. You've got this! 💪",
          "Starting pomodoro: 25 minutes of deep work followed by a 5-minute break.",
        ];
        return responses[Math.floor(Math.random() * responses.length)];
      },
    },
    break: {
      action: () => {
        const responses = [
          "Break time! Step away from your desk for 5 minutes. 🚶‍♂️",
          "Time to recharge! 5-minute break starting now. ☕",
          "Break session activated. Stretch and relax for 5 minutes.",
        ];
        return responses[Math.floor(Math.random() * responses.length)];
      },
    },
    help: {
      action: () => {
        return "I can help you: Start study sessions, set pomodoro timers, take breaks, set reminders, and more. Just say what you need!";
      },
    },
    hello: {
      action: () => {
        const greetings = [
          "Hey there! Ready to study? 📚",
          "Hello! How can I assist with your learning today?",
          "Hi! I'm here to help you stay productive. What's the plan?",
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
      },
    },
    "remind me to": {
      action: (task) => {
        return `I'll remind you to ${task} in 1 hour. ✅`;
      },
    },
    stop: {
      action: () => {
        return "Session stopped. Great work today! 🎉";
      },
    },
  };

  useEffect(() => {
    initializeAssistant();
    return () => {
      cleanup();
    };
  }, []);

  const initializeAssistant = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
      });
    } catch (error) {
      console.log("Audio setup error:", error);
    }
  };

  const cleanup = () => {
    if (recognitionTimeoutRef.current) {
      clearTimeout(recognitionTimeoutRef.current);
    }
    soundRef.current.unloadAsync();
    Speech.stop();
  };

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.3,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.9,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopPulseAnimation = () => {
    pulseAnim.stopAnimation();
    Animated.timing(pulseAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const playSound = async (soundType = "start") => {
    try {
      // Sound playback would go here
    } catch (error) {
      console.log("Sound playback error:", error);
    }
  };

  const startListening = async () => {
    if (isProcessing) return;

    try {
      setIsListening(true);
      setIsProcessing(true);
      setRecognizedText("🎤 Listening... Speak now");
      setCommandResult("");
      startPulseAnimation();
      await playSound("start");

      addToHistory("user", "Activated voice assistant");

      // Simulate speech recognition with better timing
      recognitionTimeoutRef.current = setTimeout(() => {
        simulateSpeechRecognition();
      }, 1500);
    } catch (error) {
      console.log("Error starting listening:", error);
      stopListening();
    }
  };

  const simulateSpeechRecognition = () => {
    const sampleCommands = [
      "Start study session",
      "Begin pomodoro timer",
      "I need a break",
      "Hello assistant",
      "What can you do",
      "Remind me to check email",
      "Stop the session",
    ];

    const randomCommand =
      sampleCommands[Math.floor(Math.random() * sampleCommands.length)];
    setRecognizedText(`🗣️ Heard: "${randomCommand}"`);
    addToHistory("user", randomCommand);

    processCommand(randomCommand);
  };

  const processCommand = (text) => {
    const lowerText = text.toLowerCase().trim();
    let commandExecuted = false;

    // Check for specific command patterns
    for (const [cmd, config] of Object.entries(commands)) {
      if (lowerText.includes(cmd)) {
        let result;

        // Handle commands with parameters
        if (cmd === "remind me to" && lowerText.includes("remind me to")) {
          const task = lowerText.replace("remind me to", "").trim();
          result = config.action(task);
        } else {
          result = config.action();
        }

        executeCommand(result);
        commandExecuted = true;
        break;
      }
    }

    if (!commandExecuted) {
      const response =
        "I'm not sure I understand. Try saying 'start study session', 'pomodoro timer', or 'take a break'.";
      executeCommand(response);
    }
  };

  const executeCommand = (result) => {
    setIsProcessing(true);

    // Speak the result
    Speech.speak(result, {
      rate: 0.9,
      pitch: 1.0,
    });

    setCommandResult(result);
    addToHistory("assistant", result);

    // Auto-stop after command execution
    setTimeout(() => {
      stopListening();
    }, 1000);
  };

  const stopListening = () => {
    setIsListening(false);
    setIsProcessing(false);
    stopPulseAnimation();

    if (recognitionTimeoutRef.current) {
      clearTimeout(recognitionTimeoutRef.current);
    }

    Vibration.vibrate(50);
    playSound("end");
  };

  const addToHistory = (type, text) => {
    setConversationHistory((prev) => [...prev.slice(-4), { type, text }]);
  };

  const quickCommand = (command) => {
    setRecognizedText(`🔊 Quick command: "${command}"`);
    addToHistory("user", command);
    processCommand(command);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎧 Study Voice Assistant</Text>
      <Text style={styles.subtitle}>
        Say "study", "pomodoro", or "break" to start
      </Text>

      <View style={styles.assistantContainer}>
        <Animated.View
          style={[
            styles.voiceCircle,
            { transform: [{ scale: pulseAnim }] },
            isProcessing && styles.processingCircle,
          ]}
        >
          <Ionicons
            name={isListening ? "mic" : "mic-outline"}
            size={52}
            color={isListening ? "#FF6B6B" : "#4ECDC4"}
          />
          {isProcessing && (
            <View style={styles.processingIndicator}>
              <Text style={styles.processingText}>🤔</Text>
            </View>
          )}
        </Animated.View>

        <Text style={styles.statusText}>
          {isListening ? "🎤 Speak now..." : "Tap the mic to start"}
          {isProcessing && !isListening && " Processing..."}
        </Text>
      </View>

      {/* Quick Command Buttons */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.quickCommands}
      >
        <TouchableOpacity
          style={styles.quickButton}
          onPress={() => quickCommand("start study session")}
        >
          <Text style={styles.quickButtonText}>📚 Study</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickButton}
          onPress={() => quickCommand("pomodoro timer")}
        >
          <Text style={styles.quickButtonText}>⏰ Pomodoro</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickButton}
          onPress={() => quickCommand("take a break")}
        >
          <Text style={styles.quickButtonText}>☕ Break</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickButton}
          onPress={() => quickCommand("what can you do")}
        >
          <Text style={styles.quickButtonText}>❓ Help</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Recognition Results */}
      {recognizedText ? (
        <View style={styles.recognitionResult}>
          <Text style={styles.recognizedText}>{recognizedText}</Text>
        </View>
      ) : null}

      {/* Command Results */}
      {commandResult ? (
        <View style={styles.commandResult}>
          <Ionicons name="chatbubble-ellipses" size={20} color="#4ECDC4" />
          <Text style={styles.resultText}>{commandResult}</Text>
        </View>
      ) : null}

      {/* Conversation History */}
      {conversationHistory.length > 0 && (
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Recent</Text>
          {conversationHistory.map((item, index) => (
            <View
              key={index}
              style={[
                styles.historyItem,
                item.type === "user"
                  ? styles.userHistory
                  : styles.assistantHistory,
              ]}
            >
              <Text style={styles.historyText}>{item.text}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Main Control Button */}
      <TouchableOpacity
        style={[
          styles.listenButton,
          isListening && styles.listeningButton,
          isProcessing && styles.processingButton,
        ]}
        onPress={isListening ? stopListening : startListening}
        disabled={isProcessing}
      >
        <Ionicons
          name={isListening ? "stop-circle" : "mic"}
          size={24}
          color="white"
        />
        <Text style={styles.buttonText}>
          {isListening ? "Stop Listening" : "Start Voice Command"}
          {isProcessing && "..."}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f8ff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#2c3e50",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 30,
    textAlign: "center",
  },
  assistantContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  voiceCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 16,
  },
  processingCircle: {
    borderColor: "#4ECDC4",
    borderWidth: 3,
  },
  processingIndicator: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#FF6B6B",
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  processingText: {
    fontSize: 12,
  },
  statusText: {
    fontSize: 16,
    color: "#7f8c8d",
    fontWeight: "600",
  },
  quickCommands: {
    marginBottom: 20,
    maxHeight: 50,
  },
  quickButton: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2c3e50",
  },
  recognitionResult: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recognizedText: {
    fontSize: 16,
    color: "#2c3e50",
    textAlign: "center",
    fontWeight: "500",
  },
  commandResult: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e8f6f3",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#4ECDC4",
  },
  resultText: {
    fontSize: 16,
    color: "#2e7d32",
    marginLeft: 10,
    flex: 1,
    fontWeight: "500",
  },
  historyContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  historyTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#7f8c8d",
    marginBottom: 8,
  },
  historyItem: {
    padding: 8,
    marginBottom: 4,
    borderRadius: 6,
  },
  userHistory: {
    backgroundColor: "#f8f9fa",
  },
  assistantHistory: {
    backgroundColor: "#e8f6f3",
  },
  historyText: {
    fontSize: 12,
    color: "#2c3e50",
  },
  listenButton: {
    flexDirection: "row",
    backgroundColor: "#4ECDC4",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  listeningButton: {
    backgroundColor: "#FF6B6B",
  },
  processingButton: {
    backgroundColor: "#FFD166",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default VoiceAssistant;
