import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Achievements() {
  const [unlockedBadges, setUnlockedBadges] = useState([1, 3, 5]);
  const [selectedBadge, setSelectedBadge] = useState(1);
  const [scaleAnim] = useState(new Animated.Value(0));
  const [rotateAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const badges = [
    {
      id: 1,
      name: "First Steps",
      icon: "footsteps",
      description: "Complete your first task",
    },
    { id: 2, name: "Bookworm", icon: "book", description: "Read for 10 hours" },
    {
      id: 3,
      name: "Early Bird",
      icon: "sunny",
      description: "Study before 8 AM",
    },
    {
      id: 4,
      name: "Mastermind",
      icon: "bulb",
      description: "Score 100% on a quiz",
    },
    {
      id: 5,
      name: "Consistent",
      icon: "calendar",
      description: "7-day streak",
    },
    {
      id: 6,
      name: "Socializer",
      icon: "people",
      description: "Join a study group",
    },
  ];

  const renderBadge = (badge) => {
    const isUnlocked = unlockedBadges.includes(badge.id);
    const isSelected = selectedBadge === badge.id;

    return (
      <TouchableOpacity
        key={badge.id}
        style={[
          styles.badgeContainer,
          isSelected && styles.selectedBadge,
          !isUnlocked && styles.lockedBadge,
        ]}
        onPress={() => isUnlocked && setSelectedBadge(badge.id)}
        activeOpacity={isUnlocked ? 0.7 : 1}
      >
        <View style={styles.badgeIconContainer}>
          <Ionicons
            name={isUnlocked ? badge.icon : "lock-closed"}
            size={24}
            color={
              isUnlocked ? (isSelected ? "#3498db" : "#7f8c8d") : "#bdc3c7"
            }
          />
        </View>
        <Text
          style={[
            styles.badgeName,
            isSelected && styles.selectedText,
            !isUnlocked && styles.lockedText,
          ]}
          numberOfLines={1}
        >
          {badge.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const selectedBadgeData = badges.find((b) => b.id === selectedBadge);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Achievements</Text>

      <Animated.View
        style={[
          styles.featuredBadge,
          {
            transform: [{ scale: scaleAnim }, { rotate: spin }],
          },
        ]}
      >
        <View style={styles.featuredIconContainer}>
          <Ionicons
            name={selectedBadgeData.icon}
            size={48}
            color={
              unlockedBadges.includes(selectedBadge) ? "#f1c40f" : "#bdc3c7"
            }
          />
        </View>
        <Text style={styles.featuredName}>{selectedBadgeData.name}</Text>
        <Text style={styles.featuredDescription}>
          {unlockedBadges.includes(selectedBadge)
            ? selectedBadgeData.description
            : "Locked - complete requirements to unlock"}
        </Text>
        {unlockedBadges.includes(selectedBadge) && (
          <View style={styles.unlockedLabel}>
            <Ionicons name="checkmark" size={16} color="white" />
            <Text style={styles.unlockedText}>Unlocked</Text>
          </View>
        )}
      </Animated.View>

      <View style={styles.badgesGrid}>{badges.map(renderBadge)}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#2c3e50",
  },
  featuredBadge: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  featuredIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  featuredName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#2c3e50",
  },
  featuredDescription: {
    fontSize: 14,
    color: "#7f8c8d",
    textAlign: "center",
  },
  unlockedLabel: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2ecc71",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
  },
  unlockedText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
  },
  badgesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  badgeContainer: {
    width: "30%",
    alignItems: "center",
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedBadge: {
    backgroundColor: "#e1f0fa",
    transform: [{ scale: 1.05 }],
  },
  lockedBadge: {
    opacity: 0.6,
  },
  badgeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  badgeName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#7f8c8d",
    textAlign: "center",
  },
  selectedText: {
    color: "#3498db",
  },
  lockedText: {
    color: "#bdc3c7",
  },
});
