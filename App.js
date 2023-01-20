import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  StatusBar,
  Image,
  Alert,
  Button,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function App() {
  const [text, onChangeText] = useState("");
  const [myLocal, setMyLocal] = useState(null);

  useEffect(() => {
    async function getLocal() {
      const { status } = Location.requestForegroundPermissionsAsync();
      let currentLocal = await Location.getCurrentPositionAsync({});
      setMyLocal(currentLocal);
    }
    getLocal();
  }, []);

  const regiaoInicial = {
    latitude: -23.52618,
    longitude: -46.54027,
    latitudeDelta: 0.0222,
    longitudeDelta: 0.00121,
  };

  const [local, setLocal] = useState();

  const newLocal = (event) => {
    setLocal({
      ...local,
      latitude: myLocal.coords.latitude,
      longitude: myLocal.coords.longitude,
    });
    console.log(myLocal);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <View>
          <Text style={styles.title}>Estive Aqui! (exercício 1)</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="Onde você esteve?"
          />
        </View>

        <View>
          <View style={styles.botao}>
            <Button title="descobrir minha localização" onPress={newLocal} />
          </View>
          <View style={styles.viewMapa}>
            <MapView
              onPress={newLocal}
              style={styles.map}
              mapType="standard"
              region={local ?? regiaoInicial}
            >
              {local && (
                <Marker
                  coordinate={local}
                  title="Aqui!"
                  onPress={(e) => console.log(e.nativeEvent)}
                />
              )}
            </MapView>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    padding: 10,
  },
  question: {
    fontSize: 18,
    textAlign: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
