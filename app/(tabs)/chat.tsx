import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hey there! 👋 I'm Alex, your residence support assistant. How's your day going? What can I help you with today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const flatListRef = useRef<FlatList>(null);

  // More natural, conversational responses
  const botResponses = {
    greeting: [
      "Hey! Good to see you. What's on your mind?",
      "Hello! How's your day going?",
      "Hi there! What can I help you with today?",
      "Hey! 👋 Nice to hear from you. What's up?",
    ],
    thanks: [
      "You're welcome! 😊 Is there anything else you need?",
      "Happy to help! Don't hesitate to ask if you have more questions.",
      "Anytime! That's what I'm here for.",
      "No problem at all! Glad I could assist.",
    ],
    issue: [
      "I understand how frustrating {issue} can be. Let's see what we can do about it.",
      "Ah, {issue} can be really annoying. I've got some suggestions that might help.",
      "Sorry to hear you're dealing with {issue}. I know a few ways we might resolve that.",
      "I get it, {issue} is no fun. Let me help you figure this out.",
    ],
    general: [
      "I see what you mean. Could you tell me a bit more about that?",
      "Interesting. Let me think about the best way to help with that...",
      "Thanks for sharing that. I want to make sure I understand correctly.",
      "Okay, I'm following. What specifically would you like me to help with?",
    ],
    unknown: [
      "I'm not quite sure I understand. Could you explain that differently?",
      "Hmm, I want to make sure I give you the right help. Could you rephrase that?",
      "I'm still learning about all residence issues. Could you tell me more about what you're experiencing?",
      "Let me make sure I'm understanding you correctly. Could you say that another way?",
    ],
    farewell: [
      "Have a great day! Don't hesitate to reach out if anything else comes up.",
      "Talk to you later! Remember I'm here if you need more help.",
      "Take care! Hope everything works out with your residence.",
      "Bye for now! 😊 Let me know if you need anything else.",
    ],
    positive: [
      "That's great to hear! 😊",
      "Awesome! Happy to hear that.",
      "Wonderful! That's good news.",
      "Perfect! Glad everything's working out.",
    ],
    negative: [
      "I'm sorry to hear that. Let's see how we can make it better.",
      "That sounds tough. I'm here to help however I can.",
      "I understand that must be frustrating. Let's work on a solution.",
      "That's no good. Let me help you sort this out.",
    ],
  };

  // More sophisticated message analysis
  const analyzeMessage = (text: string) => {
    const lowerText = text.toLowerCase().trim();

    // Check for greetings
    if (
      /(hi|hello|hey|greetings|howdy|good morning|good afternoon|good evening)/i.test(
        lowerText
      ) &&
      lowerText.length < 30
    ) {
      return { type: "greeting", keywords: [], sentiment: "neutral" };
    }

    // Check for thanks
    if (/(thanks|thank you|appreciate|grateful|thx|ty)/i.test(lowerText)) {
      return { type: "thanks", keywords: [], sentiment: "positive" };
    }

    // Check for farewell
    if (
      /(bye|goodbye|see ya|later|cya|have a good one|talk to you later)/i.test(
        lowerText
      )
    ) {
      return { type: "farewell", keywords: [], sentiment: "neutral" };
    }

    // Check for positive sentiment
    if (
      /(good|great|awesome|wonderful|perfect|fine|ok|okay|alright|excellent|amazing)/i.test(
        lowerText
      )
    ) {
      return { type: "positive", keywords: [], sentiment: "positive" };
    }

    // Check for negative sentiment
    if (
      /(bad|terrible|awful|horrible|frustrating|annoying|upset|angry|mad|sad|stress)/i.test(
        lowerText
      )
    ) {
      return { type: "negative", keywords: [], sentiment: "negative" };
    }

    // Extract name if mentioned
    const nameMatch = lowerText.match(
      /(my name is|i'm|im|call me|this is) (\w+)/i
    );
    if (nameMatch && nameMatch[2]) {
      setUserName(nameMatch[2]);
    }

    // Extract potential issues with better context
    const issueKeywords = [
      "leak",
      "leaking",
      "water",
      "pipe",
      "noise",
      "loud",
      "sound",
      "music",
      "heating",
      "heat",
      "warm",
      "cold",
      "ac",
      "air conditioning",
      "electricity",
      "power",
      "outage",
      "blackout",
      "plumbing",
      "toilet",
      "shower",
      "sink",
      "drain",
      "window",
      "door",
      "lock",
      "key",
      "broken",
      "maintenance",
      "repair",
      "fix",
      "broken",
      "clean",
      "dirty",
      "mess",
      "trash",
      "pest",
      "bug",
      "insect",
      "rodent",
      "mouse",
      "roach",
      "wifi",
      "internet",
      "connection",
      "network",
      "neighbor",
      "neighbour",
      "noisy",
      "complaint",
      "rent",
      "payment",
      "bill",
      "due",
      "parking",
      "car",
      "vehicle",
    ];

    const foundKeywords = issueKeywords.filter((keyword) =>
      lowerText.includes(keyword)
    );

    if (foundKeywords.length > 0) {
      return { type: "issue", keywords: foundKeywords, sentiment: "negative" };
    }

    return { type: "unknown", keywords: [], sentiment: "neutral" };
  };

  // Generate more human-like responses
  const generateResponse = (userMessage: string) => {
    const analysis = analyzeMessage(userMessage);
    let response = "";

    // Add personal touch if we know user's name
    const personalGreeting = userName ? `, ${userName}` : "";

    switch (analysis.type) {
      case "greeting":
        response = `${
          botResponses.greeting[
            Math.floor(Math.random() * botResponses.greeting.length)
          ]
        }${personalGreeting}`;
        break;
      case "thanks":
        response =
          botResponses.thanks[
            Math.floor(Math.random() * botResponses.thanks.length)
          ];
        break;
      case "farewell":
        response =
          botResponses.farewell[
            Math.floor(Math.random() * botResponses.farewell.length)
          ];
        break;
      case "positive":
        response =
          botResponses.positive[
            Math.floor(Math.random() * botResponses.positive.length)
          ];
        break;
      case "negative":
        response =
          botResponses.negative[
            Math.floor(Math.random() * botResponses.negative.length)
          ];
        break;
      case "issue":
        const issueTemplate =
          botResponses.issue[
            Math.floor(Math.random() * botResponses.issue.length)
          ];
        const issue = analysis.keywords[0] || "that";
        response = issueTemplate.replace("{issue}", issue);

        // Add context-aware follow-up
        const suggestions = [
          " Would you like me to guide you through reporting this officially?",
          " I can help you submit a maintenance request if you'd like.",
          " Should I check what the standard procedure is for this type of issue?",
          " Let me get you the right contact information for this.",
        ];
        response += suggestions[Math.floor(Math.random() * suggestions.length)];
        break;
      case "unknown":
        response =
          botResponses.unknown[
            Math.floor(Math.random() * botResponses.unknown.length)
          ];
        break;
      default:
        response =
          botResponses.general[
            Math.floor(Math.random() * botResponses.general.length)
          ];
    }

    // Add more natural follow-up questions based on context
    if (
      analysis.type !== "thanks" &&
      analysis.type !== "farewell" &&
      Math.random() > 0.4
    ) {
      const followUps = [
        " How long has this been going on?",
        " Is this affecting anyone else in your residence?",
        " Have you already tried anything to resolve this?",
        " How urgent would you say this situation is?",
        " Could you describe this in a bit more detail?",
        " When did you first notice this happening?",
      ];
      response += followUps[Math.floor(Math.random() * followUps.length)];
    }

    // Occasionally add conversational elements
    if (Math.random() > 0.7) {
      const conversationalElements = [
        " 😊",
        " Let me know what you think.",
        " Sound good?",
        " What are your thoughts on that?",
      ];
      response +=
        conversationalElements[
          Math.floor(Math.random() * conversationalElements.length)
        ];
    }

    return response;
  };

  const handleSend = () => {
    if (inputText.trim()) {
      // Add user message
      const newUserMessage = {
        id: Date.now().toString(),
        text: inputText,
        sender: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newUserMessage]);
      setInputText("");
      setIsTyping(true);

      // More realistic typing simulation
      const typingTime = 800 + Math.random() * 2000; // 0.8-2.8 seconds

      setTimeout(() => {
        const botResponse = generateResponse(inputText);

        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            text: botResponse,
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
        setIsTyping(false);
      }, typingTime);
    }
  };

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      <Text style={styles.title}>Residence Support Chat</Text>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.sender === "user"
                ? styles.userContainer
                : styles.botContainer,
            ]}
          >
            <View style={styles.messageHeader}>
              <Text style={styles.senderName}>
                {item.sender === "user" ? userName || "You" : "Alex"}
              </Text>
              <Text style={styles.timestamp}>{formatTime(item.timestamp)}</Text>
            </View>
            <View
              style={[
                styles.messageBubble,
                item.sender === "user" ? styles.userBubble : styles.botBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  item.sender === "user" ? styles.userText : styles.botText,
                ]}
              >
                {item.text}
              </Text>
            </View>
          </View>
        )}
        style={styles.messagesList}
        ListFooterComponent={
          isTyping ? (
            <View style={styles.typingContainer}>
              <View style={styles.typingBubble}>
                <Text style={styles.typingText}>Alex is typing</Text>
                <View style={styles.typingDots}>
                  <View style={styles.dot} />
                  <View style={styles.dot} />
                  <View style={styles.dot} />
                </View>
              </View>
            </View>
          ) : null
        }
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message here..."
          placeholderTextColor="#999"
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            !inputText.trim() && styles.sendButtonDisabled,
          ]}
          onPress={handleSend}
          disabled={!inputText.trim()}
        >
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3a0ca3",
    textAlign: "center",
    marginBottom: 20,
  },
  messagesList: {
    flex: 1,
    marginBottom: 20,
  },
  messageContainer: {
    marginBottom: 15,
  },
  userContainer: {
    alignItems: "flex-end",
  },
  botContainer: {
    alignItems: "flex-start",
  },
  messageHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  senderName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#555",
    marginRight: 8,
  },
  timestamp: {
    fontSize: 10,
    color: "#999",
  },
  messageBubble: {
    padding: 15,
    borderRadius: 20,
    maxWidth: "80%",
  },
  userBubble: {
    backgroundColor: "#4361ee",
    borderTopRightRadius: 5,
  },
  botBubble: {
    backgroundColor: "#e9ecef",
    borderTopLeftRadius: 5,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userText: {
    color: "#fff",
  },
  botText: {
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 15,
    minHeight: 50,
    maxHeight: 120,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 0,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: "#4361ee",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  sendButtonDisabled: {
    backgroundColor: "#b6b6b6",
  },
  typingContainer: {
    alignItems: "flex-start",
    marginTop: 5,
    marginBottom: 10,
  },
  typingBubble: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e9ecef",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  typingText: {
    fontSize: 12,
    color: "#999",
    marginRight: 5,
  },
  typingDots: {
    flexDirection: "row",
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#999",
    marginHorizontal: 1,
    opacity: 0.6,
  },
});

export default ChatScreen;
