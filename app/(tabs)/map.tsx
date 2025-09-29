import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  Linking,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Define TypeScript interfaces for our data
interface Location {
  id: number;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  description: string;
}

const CampusMapScreen = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);

  const openMaps = () => {
    Linking.openURL(
      "https://www.google.com/maps/place//@-32.7808993,26.8507025,14z?entry=ttu&g_ep=EgoyMDI1MDkxNS.4wIKXMDSoASAFQAw%3D%3D"
    );
  };

  // Define locations with proper typing
  const locations: Location[] = [
    {
      id: 1,
      name: "Main Library",
      icon: "library",
      description:
        "The main library houses over 500,000 books, study spaces, and digital resources.",
    },
    {
      id: 2,
      name: "Student Center",
      icon: "cafe",
      description:
        "The student center offers dining options, lounge areas, and student organization offices.",
    },
    {
      id: 3,
      name: "Residences",
      icon: "home",
      description:
        "Student residence halls with accommodation for over 2,000 students.",
    },
    {
      id: 4,
      name: "Health Center",
      icon: "medkit",
      description:
        "Campus health services providing medical care and wellness programs.",
    },
    {
      id: 5,
      name: "Science Building",
      icon: "flask",
      description:
        "State-of-the-art laboratories and classrooms for science programs.",
    },
    {
      id: 6,
      name: "Administration",
      icon: "business",
      description: "Main administration building housing university offices.",
    },
  ];

  const handleLocationPress = (location: Location) => {
    setSelectedLocation(location);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Alice Campus Map</Text>
        <Text style={styles.subtitle}>University of Fort Hare</Text>

        {/* Map Container with Residence Logo */}
        <View style={styles.mapContainer}>
          <Image
            source={{
              uri: "https://img.freepik.com/free-vector/house-logo-design-with-roof-concept_23-2148654408.jpg?w=826&t=st=1726939815~exp=1726940415~hmac=6c27e3a6b6e62a4a3eeffd2a6c8c4e4e1a1d8c4b4b4b4b4b4b4b4b4b4b4b4b4",
            }} // Residence logo from Freepik
            style={styles.residenceLogo}
            resizeMode="contain"
          />
          <Text style={styles.logoText}>Student Residences</Text>
        </View>

        <View style={styles.locations}>
          {locations.map((location) => (
            <TouchableOpacity
              key={location.id}
              style={styles.locationItem}
              onPress={() => handleLocationPress(location)}
            >
              <Ionicons name={location.icon} size={22} color="#4361ee" />
              <Text style={styles.locationText}>{location.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.openMapsButton} onPress={openMaps}>
          <Ionicons name="map" size={20} color="#fff" />
          <Text style={styles.openMapsText}>Open in Google Maps</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedLocation?.name}</Text>
            <Ionicons
              name={selectedLocation?.icon || "help-circle"}
              size={40}
              color="#4361ee"
              style={styles.modalIcon}
            />
            <Text style={styles.modalDescription}>
              {selectedLocation?.description}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#3a0ca3",
    textAlign: "center",
    marginBottom: 5,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    marginBottom: 25,
  },
  mapContainer: {
    position: "relative",
    width: "100%",
    height: 250,
    borderRadius: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  residenceLogo: {
    width: 150,
    height: 150,
  },
  logoText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#3a0ca3",
  },
  locations: {
    marginTop: 15,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  locationText: {
    marginLeft: 15,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  openMapsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4361ee",
    padding: 16,
    borderRadius: 10,
    marginTop: 25,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  openMapsText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    width: "85%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#3a0ca3",
  },
  modalIcon: {
    marginBottom: 15,
  },
  modalDescription: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
    lineHeight: 22,
  },
  closeButton: {
    backgroundColor: "#4361ee",
    borderRadius: 10,
    padding: 12,
    elevation: 2,
    width: "100%",
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CampusMapScreen;
