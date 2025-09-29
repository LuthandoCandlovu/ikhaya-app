import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

// Define TypeScript interfaces
interface TranslationKeys {
  appSettings: string;
  pushNotifications: string;
  receiveUpdates: string;
  darkMode: string;
  switchDarkTheme: string;
  biometricLogin: string;
  useFingerprint: string;
  account: string;
  privacySecurity: string;
  language: string;
  helpSupport: string;
  about: string;
  termsOfService: string;
  privacyPolicy: string;
  appVersion: string;
  logout: string;
  currentLanguage: string;
  selectLanguage: string;
  cancel: string;
  confirmLogout: string;
  logoutMessage: string;
}

interface Translations {
  [key: string]: TranslationKeys;
}

// Language translations
const translations: Translations = {
  en: {
    appSettings: "App Settings",
    pushNotifications: "Push Notifications",
    receiveUpdates: "Receive important updates",
    darkMode: "Dark Mode",
    switchDarkTheme: "Switch to dark theme",
    biometricLogin: "Biometric Login",
    useFingerprint: "Use fingerprint or face ID",
    account: "Account",
    privacySecurity: "Privacy & Security",
    language: "Language",
    helpSupport: "Help & Support",
    about: "About",
    termsOfService: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    appVersion: "App Version",
    logout: "Logout",
    currentLanguage: "English",
    selectLanguage: "Select Language",
    cancel: "Cancel",
    confirmLogout: "Confirm Logout",
    logoutMessage: "Are you sure you want to logout?",
  },
  xh: {
    appSettings: "Izicwangciso ze-App",
    pushNotifications: "Izaziso zokuCofa",
    receiveUpdates: "Fumana iindaba ezibalulekileyo",
    darkMode: "Imowudi emnyama",
    switchDarkTheme: "Tshintsha kwi-theme emnyama",
    biometricLogin: "Ukungena nge-Biometric",
    useFingerprint: "Sebenzisa i-fingerprint okanye i-face ID",
    account: "Iakhawunti",
    privacySecurity: "UbuNgasese noKhuseleko",
    language: "Ulwimi",
    helpSupport: "Uncedo neNkxaso",
    about: "Malunga",
    termsOfService: "Imigaqo ngeNkonzo",
    privacyPolicy: "Umgaqo ngeBumfihlo",
    appVersion: "Uguqulelo lwe-App",
    logout: "Phuma",
    currentLanguage: "IsiXhosa",
    selectLanguage: "Khetha Ulwimi",
    cancel: "Rhoxisa",
    confirmLogout: "Qinisekisa Ukuphuma",
    logoutMessage: "Uqinisekile ukuba ufuna ukuphuma?",
  },
  zu: {
    appSettings: "Izilungiselelo ze-App",
    pushNotifications: "Izaziso Zokushayela",
    receiveUpdates: "Thola izibuyekezo ezibalulekile",
    darkMode: "Imodi Emnyama",
    switchDarkTheme: "Shintshela kuthimi elimnyama",
    biometricLogin: "Ukungena Nge-Biometric",
    useFingerprint: "Sebenzisa isithupha sokubala noma i-face ID",
    account: "I-akhawunti",
    privacySecurity: "Ubumfihlo Nokuphepha",
    language: "Ulimi",
    helpSupport: "Usizo Nokusekelwa",
    about: "Mayelana",
    termsOfService: "Imigomo Yesevisi",
    privacyPolicy: "Inqubomgomo Yobumfihlo",
    appVersion: "Inguqulo ye-App",
    logout: "Phuma",
    currentLanguage: "IsiZulu",
    selectLanguage: "Khetha Ulimi",
    cancel: "Khansela",
    confirmLogout: "Qinisekisa Ukuphuma",
    logoutMessage: "Uqinisekile ukuthi ufuna ukuphuma?",
  },
  ve: {
    appSettings: "Zwiko zwa App",
    pushNotifications: "Mafhungo a Push",
    receiveUpdates: "Wana mafhungo anga mbonalo",
    darkMode: "Mugimo wa Mvundu",
    switchDarkTheme: "Shandukisa kha theme ya mvundu",
    biometricLogin: "Login ya Biometric",
    useFingerprint: "Shumisa fingerprint kana face ID",
    account: "Akhaonto",
    privacySecurity: "Vhutshilo ha Muthu na Tshitokotelo",
    language: "Luambo",
    helpSupport: "Thuso na Thuthuwelo",
    about: "Mabindu",
    termsOfService: "Mikano ya Tshirendo",
    privacyPolicy: "Mulayo wa Vhutshilo ha Muthu",
    appVersion: "Muvhuso wa App",
    logout: "Bva",
    currentLanguage: "Tshivenda",
    selectLanguage: "Nanga Luambo",
    cancel: "Khanela",
    confirmLogout: "Tanganedza U bva",
    logoutMessage: "Naa vha toda u bva?",
  },
  nso: {
    appSettings: "Ditshwaetso tša App",
    pushNotifications: "Ditshedimoši tša go Kutollo",
    receiveUpdates: "Amogela ditlhabollo tša bohlokwa",
    darkMode: "Mokgwa o Leswiswi",
    switchDarkTheme: "Fetola go theme ye leswiswi",
    biometricLogin: "Login ya Biometric",
    useFingerprint: "Šomiša fingerprint goba face ID",
    account: "Akhaonto",
    privacySecurity: "Tshepo le Tšhireletšo",
    language: "Polelo",
    helpSupport: "Thušo le Tšehetšo",
    about: "Mabapi",
    termsOfService: "Melawana ya Tshebeletšo",
    privacyPolicy: "Mananeo a Tshepo",
    appVersion: "Mofuta wa App",
    logout: "Tšhwara",
    currentLanguage: "Sepedi",
    selectLanguage: "Kgetha Polelo",
    cancel: "Khansela",
    confirmLogout: "Tiišetša Go Tšhwara",
    logoutMessage: "Na o na le bonnete bja gore o nyaka go tšhwara?",
  },
  af: {
    appSettings: "App Instellings",
    pushNotifications: "Stootkennisgewings",
    receiveUpdates: "Ontvang belangrike opdaterings",
    darkMode: "Donker Modus",
    switchDarkTheme: "Skakel oor na donker tema",
    biometricLogin: "Biometrische Aanmelding",
    useFingerprint: "Gebruik vingerafdruk of gesigs-ID",
    account: "Rekening",
    privacySecurity: "Privaatheid & Sekuriteit",
    language: "Taal",
    helpSupport: "Hulp & Ondersteuning",
    about: "Oor",
    termsOfService: "Diensbepalings",
    privacyPolicy: "Privaatheidsbeleid",
    appVersion: "App Weergawe",
    logout: "Teken Uit",
    currentLanguage: "Afrikaans",
    selectLanguage: "Kies Taal",
    cancel: "Kanselleer",
    confirmLogout: "Bevestig Afmelding",
    logoutMessage: "Is jy seker jy wil afmeld?",
  },
};

const SettingsScreen = () => {
  const colorScheme = useColorScheme();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(colorScheme === "dark");
  const [biometric, setBiometric] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [t, setT] = useState<TranslationKeys>(translations.en);

  // Load saved settings on component mount
  useEffect(() => {
    loadSettings();
  }, []);

  // Update translations when language changes
  useEffect(() => {
    setT(translations[currentLanguage]);
    saveSettings();
  }, [currentLanguage]);

  // Save settings when they change
  useEffect(() => {
    saveSettings();
    applyTheme();
  }, [notifications, darkMode, biometric]);

  const loadSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem("appSettings");
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        setNotifications(settings.notifications ?? true);
        setDarkMode(settings.darkMode ?? colorScheme === "dark");
        setBiometric(settings.biometric ?? false);
        setCurrentLanguage(settings.language ?? "en");
      }
    } catch (error) {
      console.log("Error loading settings:", error);
    }
  };

  const saveSettings = async () => {
    try {
      const settings = {
        notifications,
        darkMode,
        biometric,
        language: currentLanguage,
      };
      await AsyncStorage.setItem("appSettings", JSON.stringify(settings));
    } catch (error) {
      console.log("Error saving settings:", error);
    }
  };

  const applyTheme = () => {
    // In a real app, you would update your theme context here
    console.log("Theme applied:", darkMode ? "dark" : "light");
  };

  const handleAction = (action: string) => {
    switch (action) {
      case "Privacy & Security":
        Alert.alert(
          t.privacySecurity,
          "Your privacy and security settings are managed here. All data is encrypted and stored securely.",
          [{ text: "OK" }]
        );
        break;

      case "Language":
        setLanguageModalVisible(true);
        break;

      case "Help & Support":
        Alert.alert(
          t.helpSupport,
          "Need help? Contact us at:\n\nEmail: support@ikhaya.app\nPhone: +27 12 345 6789\nHours: Mon-Fri 9AM-5PM",
          [
            {
              text: "Call Us",
              onPress: () => Linking.openURL("tel:+27123456789"),
            },
            {
              text: "Email Us",
              onPress: () => Linking.openURL("mailto:support@ikhaya.app"),
            },
            { text: "OK" },
          ]
        );
        break;

      case "Terms of Service":
        Alert.alert(
          t.termsOfService,
          "By using Ikhaya, you agree to our Terms of Service. These include guidelines for app usage, user responsibilities, and service limitations.",
          [{ text: "OK" }]
        );
        break;

      case "Privacy Policy":
        Alert.alert(
          t.privacyPolicy,
          "We value your privacy. We collect only necessary data to provide our services and never share your personal information with third parties without your consent.",
          [{ text: "OK" }]
        );
        break;

      case "App Version":
        Alert.alert(
          t.appVersion,
          "Ikhaya App\nVersion 1.0.0\nBuild 2024.01.001\n\n© 2024 Ikhaya Team. All rights reserved.",
          [{ text: "OK" }]
        );
        break;

      default:
        Alert.alert("Action", `You selected: ${action}`);
    }
  };

  const handleLogout = () => {
    Alert.alert(t.confirmLogout, t.logoutMessage, [
      {
        text: t.cancel,
        style: "cancel",
      },
      {
        text: t.logout,
        style: "destructive",
        onPress: () => {
          // Clear all settings on logout
          AsyncStorage.multiRemove(["appSettings", "userSession"])
            .then(() => {
              router.replace("/login");
            })
            .catch((error) => {
              console.log("Logout error:", error);
              router.replace("/login");
            });
        },
      },
    ]);
  };

  const changeLanguage = (langCode: string) => {
    setCurrentLanguage(langCode);
    setLanguageModalVisible(false);
  };

  const toggleNotifications = async (value: boolean) => {
    setNotifications(value);
    if (value) {
      // Request notification permissions
      Alert.alert(
        "Notifications Enabled",
        "You'll receive important updates and reminders.",
        [{ text: "OK" }]
      );
    }
  };

  const toggleBiometric = async (value: boolean) => {
    if (value) {
      Alert.alert(
        "Biometric Login",
        "Would you like to set up biometric login? This will allow you to use your fingerprint or face ID to access the app.",
        [
          { text: "Not Now", style: "cancel" },
          {
            text: "Set Up",
            onPress: () => setBiometric(true),
          },
        ]
      );
    } else {
      setBiometric(false);
    }
  };

  // Dynamic styles based on dark mode
  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? "#121212" : "#f8f9fa",
    },
    section: {
      backgroundColor: darkMode ? "#1e1e1e" : "#fff",
      margin: 10,
      borderRadius: 15,
      padding: 15,
      shadowColor: darkMode ? "#000" : "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: darkMode ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: darkMode ? "#bb86fc" : "#3a0ca3",
      marginBottom: 15,
    },
    settingLabel: {
      fontSize: 16,
      fontWeight: "500",
      color: darkMode ? "#ffffff" : "#333",
      marginBottom: 2,
    },
    settingDescription: {
      fontSize: 12,
      color: darkMode ? "#bbbbbb" : "#6c757d",
    },
    settingButtonText: {
      fontSize: 16,
      color: darkMode ? "#ffffff" : "#333",
      marginLeft: 15,
      flex: 1,
    },
    settingValue: {
      fontSize: 14,
      color: darkMode ? "#bbbbbb" : "#6c757d",
      marginRight: 5,
    },
    logoutButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: darkMode ? "#cf6679" : "#ff6b6b",
      margin: 10,
      padding: 15,
      borderRadius: 15,
      shadowColor: darkMode ? "#000" : "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    modalContent: {
      backgroundColor: darkMode ? "#1e1e1e" : "white",
      borderRadius: 15,
      padding: 20,
      width: "85%",
      maxWidth: 400,
      maxHeight: "80%",
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
      color: darkMode ? "#bb86fc" : "#3a0ca3",
    },
    languageText: {
      fontSize: 16,
      color: darkMode ? "#ffffff" : "#333",
    },
    cancelButton: {
      marginTop: 15,
      padding: 12,
      backgroundColor: darkMode ? "#2a2a2a" : "#f8f9fa",
      borderRadius: 10,
      alignItems: "center",
    },
    cancelButtonText: {
      color: darkMode ? "#bbbbbb" : "#6c757d",
      fontSize: 16,
      fontWeight: "500",
    },
  });

  return (
    <ScrollView style={dynamicStyles.container}>
      {/* Language Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={languageModalVisible}
        onRequestClose={() => setLanguageModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={dynamicStyles.modalContent}>
            <Text style={dynamicStyles.modalTitle}>{t.selectLanguage}</Text>

            <Pressable
              style={styles.languageOption}
              onPress={() => changeLanguage("en")}
            >
              <Text style={dynamicStyles.languageText}>English</Text>
              {currentLanguage === "en" && (
                <Ionicons name="checkmark" size={20} color="#4361ee" />
              )}
            </Pressable>

            <Pressable
              style={styles.languageOption}
              onPress={() => changeLanguage("xh")}
            >
              <Text style={dynamicStyles.languageText}>IsiXhosa</Text>
              {currentLanguage === "xh" && (
                <Ionicons name="checkmark" size={20} color="#4361ee" />
              )}
            </Pressable>

            <Pressable
              style={styles.languageOption}
              onPress={() => changeLanguage("zu")}
            >
              <Text style={dynamicStyles.languageText}>IsiZulu</Text>
              {currentLanguage === "zu" && (
                <Ionicons name="checkmark" size={20} color="#4361ee" />
              )}
            </Pressable>

            <Pressable
              style={styles.languageOption}
              onPress={() => changeLanguage("ve")}
            >
              <Text style={dynamicStyles.languageText}>Tshivenda</Text>
              {currentLanguage === "ve" && (
                <Ionicons name="checkmark" size={20} color="#4361ee" />
              )}
            </Pressable>

            <Pressable
              style={styles.languageOption}
              onPress={() => changeLanguage("nso")}
            >
              <Text style={dynamicStyles.languageText}>Sepedi</Text>
              {currentLanguage === "nso" && (
                <Ionicons name="checkmark" size={20} color="#4361ee" />
              )}
            </Pressable>

            <Pressable
              style={styles.languageOption}
              onPress={() => changeLanguage("af")}
            >
              <Text style={dynamicStyles.languageText}>Afrikaans</Text>
              {currentLanguage === "af" && (
                <Ionicons name="checkmark" size={20} color="#4361ee" />
              )}
            </Pressable>

            <TouchableOpacity
              style={dynamicStyles.cancelButton}
              onPress={() => setLanguageModalVisible(false)}
            >
              <Text style={dynamicStyles.cancelButtonText}>{t.cancel}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* App Settings */}
      <View style={dynamicStyles.section}>
        <Text style={dynamicStyles.sectionTitle}>{t.appSettings}</Text>

        <View style={styles.settingItem}>
          <Ionicons name="notifications" size={20} color="#4361ee" />
          <View style={styles.settingContent}>
            <Text style={dynamicStyles.settingLabel}>
              {t.pushNotifications}
            </Text>
            <Text style={dynamicStyles.settingDescription}>
              {t.receiveUpdates}
            </Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={toggleNotifications}
            thumbColor={notifications ? "#4361ee" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>

        <View style={styles.settingItem}>
          <Ionicons name="moon" size={20} color="#4361ee" />
          <View style={styles.settingContent}>
            <Text style={dynamicStyles.settingLabel}>{t.darkMode}</Text>
            <Text style={dynamicStyles.settingDescription}>
              {t.switchDarkTheme}
            </Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            thumbColor={darkMode ? "#4361ee" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>

        <View style={styles.settingItem}>
          <Ionicons name="finger-print" size={20} color="#4361ee" />
          <View style={styles.settingContent}>
            <Text style={dynamicStyles.settingLabel}>{t.biometricLogin}</Text>
            <Text style={dynamicStyles.settingDescription}>
              {t.useFingerprint}
            </Text>
          </View>
          <Switch
            value={biometric}
            onValueChange={toggleBiometric}
            thumbColor={biometric ? "#4361ee" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>
      </View>

      {/* Account Settings */}
      <View style={dynamicStyles.section}>
        <Text style={dynamicStyles.sectionTitle}>{t.account}</Text>

        <TouchableOpacity
          style={styles.settingButton}
          onPress={() => handleAction("Privacy & Security")}
        >
          <Ionicons name="shield-checkmark" size={20} color="#4361ee" />
          <Text style={dynamicStyles.settingButtonText}>
            {t.privacySecurity}
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingButton}
          onPress={() => handleAction("Language")}
        >
          <Ionicons name="language" size={20} color="#4361ee" />
          <Text style={dynamicStyles.settingButtonText}>{t.language}</Text>
          <Text style={dynamicStyles.settingValue}>{t.currentLanguage}</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingButton}
          onPress={() => handleAction("Help & Support")}
        >
          <Ionicons name="help-circle" size={20} color="#4361ee" />
          <Text style={dynamicStyles.settingButtonText}>{t.helpSupport}</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>

      {/* About */}
      <View style={dynamicStyles.section}>
        <Text style={dynamicStyles.sectionTitle}>{t.about}</Text>

        <TouchableOpacity
          style={styles.settingButton}
          onPress={() => handleAction("Terms of Service")}
        >
          <Ionicons name="document-text" size={20} color="#4361ee" />
          <Text style={dynamicStyles.settingButtonText}>
            {t.termsOfService}
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingButton}
          onPress={() => handleAction("Privacy Policy")}
        >
          <Ionicons name="lock-closed" size={20} color="#4361ee" />
          <Text style={dynamicStyles.settingButtonText}>{t.privacyPolicy}</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingButton}
          onPress={() => handleAction("App Version")}
        >
          <Ionicons name="information-circle" size={20} color="#4361ee" />
          <Text style={dynamicStyles.settingButtonText}>{t.appVersion}</Text>
          <Text style={dynamicStyles.settingValue}>1.0.0</Text>
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <TouchableOpacity
        style={dynamicStyles.logoutButton}
        onPress={handleLogout}
      >
        <Ionicons name="log-out" size={20} color="white" />
        <Text style={styles.logoutText}>{t.logout}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Static styles
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingContent: {
    marginLeft: 15,
    flex: 1,
  },
  settingButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  languageOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
});

export default SettingsScreen;
