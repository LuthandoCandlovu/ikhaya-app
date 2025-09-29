import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Animated,
  Easing,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Feature {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  description: string;
}

const HomeScreen = () => {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [progressAnim] = useState(new Animated.Value(0));
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeEvents, setActiveEvents] = useState([
    {
      id: 1,
      title: "Study Group - Library",
      time: "2:00 PM",
      location: "Main Library",
    },
    {
      id: 2,
      title: "Residence Meeting",
      time: "5:30 PM",
      location: "Common Room",
    },
  ]);

  useEffect(() => {
    // Animate progress rings on component mount
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 1500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert("Updated", "Your content has been refreshed!");
    }, 1500);
  };

  const handleFeaturePress = (featureName: string): void => {
    switch (featureName) {
      case "Study Timer":
        router.push("/Timer" as never);
        break;
      case "Goals":
        router.push("/Goals" as never);
        break;
      case "Achievements":
        router.push("/Achievements" as never);
        break;
      case "Voice Assistant":
        router.push("/Voice" as never);
        break;
      case "Feedback":
        router.push("/Feedback" as never);
        break;
      case "Profile":
        router.push("/Profile" as never);
        break;
      case "Chat":
        router.push("/Chat" as never);
        break;
      case "Map":
        router.push("/Map" as never);
        break;
      default:
        Alert.alert(
          "Feature Coming Soon",
          `${featureName} will be available soon!`
        );
    }
  };

  const features: Feature[] = [
    {
      name: "Study Timer",
      icon: "timer",
      color: "#4361ee",
      description: "Focus with Pomodoro technique",
    },
    {
      name: "Goals",
      icon: "checkbox",
      color: "#4cc9f0",
      description: "Track daily objectives",
    },
    {
      name: "Achievements",
      icon: "trophy",
      color: "#f72585",
      description: "Earn badges & rewards",
    },
    {
      name: "Voice Assistant",
      icon: "mic",
      color: "#7209b7",
      description: "Hey Khaya, help me study",
    },
    {
      name: "Feedback",
      icon: "star",
      color: "#3a0ca3",
      description: "Rate our app",
    },
    {
      name: "Chat",
      icon: "chatbubbles",
      color: "#4895ef",
      description: "Connect with peers",
    },
    {
      name: "Map",
      icon: "map",
      color: "#4cc9f0",
      description: "Campus navigation",
    },
    {
      name: "Profile",
      icon: "person",
      color: "#f72585",
      description: "Your account & progress",
    },
  ];

  const userData = {
    name: "Student",
    streak: 5,
    goalsCompleted: 3,
    totalGoals: 7,
    focusTime: "12h 45m",
  };

  // Calculate progress ring values
  const goalsProgress = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, (userData.goalsCompleted / userData.totalGoals) * 100],
  });

  const streakProgress = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, (userData.streak / 7) * 100],
  });

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <View style={styles.container}>
      {/* Header with time and weather */}
      <View style={styles.header}>
        <View>
          <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
          <Text style={styles.dateText}>
            {currentTime.toLocaleDateString([], {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>
        <View style={styles.weatherContainer}>
          <Ionicons name="partly-sunny" size={24} color="#FFA500" />
          <Text style={styles.weatherText}>24°C</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Welcome Section */}
        <View style={styles.welcomeContainer}>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>{userData.name} 👋</Text>
          </View>
          <TouchableOpacity onPress={() => router.push("/Profile" as never)}>
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        {/* Quick Stats with Animated Progress Rings */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <View style={styles.progressRing}>
              <Animated.View
                style={[
                  styles.progressFill,
                  {
                    backgroundColor: "#4361ee",
                    width: streakProgress.interpolate({
                      inputRange: [0, 100],
                      outputRange: ["0%", "100%"],
                    }),
                  },
                ]}
              />
              <Text style={styles.statNumber}>{userData.streak}</Text>
            </View>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>

          <View style={styles.statItem}>
            <View style={styles.progressRing}>
              <Animated.View
                style={[
                  styles.progressFill,
                  {
                    backgroundColor: "#4cc9f0",
                    width: goalsProgress.interpolate({
                      inputRange: [0, 100],
                      outputRange: ["0%", "100%"],
                    }),
                  },
                ]}
              />
              <Text style={styles.statNumber}>
                {userData.goalsCompleted}/{userData.totalGoals}
              </Text>
            </View>
            <Text style={styles.statLabel}>Goals Done</Text>
          </View>

          <View style={styles.statItem}>
            <View style={styles.progressRing}>
              <Ionicons name="time" size={24} color="#f72585" />
            </View>
            <Text style={styles.statNumber}>{userData.focusTime}</Text>
            <Text style={styles.statLabel}>Focus Time</Text>
          </View>
        </View>

        {/* Active Events Section */}
        <View style={styles.eventsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Events</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {activeEvents.map((event) => (
            <TouchableOpacity key={event.id} style={styles.eventCard}>
              <View style={styles.eventTime}>
                <Text style={styles.eventTimeText}>{event.time}</Text>
              </View>
              <View style={styles.eventDetails}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventLocation}>{event.location}</Text>
              </View>
              <Ionicons name="notifications" size={20} color="#4361ee" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Motivation Quote */}
        <View style={styles.quoteContainer}>
          <Ionicons name="book" size={24} color="#3a0ca3" />
          <Text style={styles.quoteText}>
            Education is the most powerful weapon which you can use to change
            the world.
          </Text>
          <Text style={styles.quoteAuthor}>- Nelson Mandela</Text>
        </View>

        {/* Main Features Grid */}
        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>Study Tools</Text>

          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <TouchableOpacity
                key={index}
                style={styles.featureCard}
                onPress={() => handleFeaturePress(feature.name)}
              >
                <View
                  style={[
                    styles.featureIcon,
                    { backgroundColor: feature.color },
                  ]}
                >
                  <Ionicons name={feature.icon} size={24} color="#fff" />
                </View>
                <Text style={styles.featureText}>{feature.name}</Text>
                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  timeText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#3a0ca3",
  },
  dateText: {
    fontSize: 16,
    color: "#6c757d",
    marginTop: 4,
  },
  weatherContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  weatherText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#3a0ca3",
    marginLeft: 5,
  },
  welcomeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    marginTop: 10,
  },
  welcomeText: {
    fontSize: 14,
    color: "#6c757d",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3a0ca3",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#4361ee",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    backgroundColor: "#fff",
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
  progressRing: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    overflow: "hidden",
    position: "relative",
  },
  progressFill: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "100%",
    opacity: 0.2,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3a0ca3",
  },
  statLabel: {
    fontSize: 12,
    color: "#6c757d",
    marginTop: 5,
  },
  eventsContainer: {
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
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3a0ca3",
  },
  seeAllText: {
    fontSize: 14,
    color: "#4361ee",
    fontWeight: "500",
  },
  eventCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    marginBottom: 10,
  },
  eventTime: {
    backgroundColor: "#4361ee",
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  eventTimeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 12,
    color: "#6c757d",
  },
  quoteContainer: {
    backgroundColor: "#e8f4fd",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#3a0ca3",
  },
  quoteText: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#3a0ca3",
    marginVertical: 5,
  },
  quoteAuthor: {
    fontSize: 12,
    color: "#6c757d",
    textAlign: "right",
  },
  featuresContainer: {
    padding: 15,
    marginBottom: 20,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  featureText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 11,
    color: "#6c757d",
    textAlign: "center",
  },
});

export default HomeScreen;
