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
  Pressable,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";

export default function App() {
  const [text, onChangeText] = useState("");
  const [myLocal, setMyLocal] = useState(null);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    async function getLocal() {
      const { status } = Location.requestForegroundPermissionsAsync();
      let currentLocal = await Location.getCurrentPositionAsync({});
      setMyLocal(currentLocal);
    }
    getLocal();
  }, []);

  useEffect(() => {
    async function verPermissoes() {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      requestPermission(cameraStatus === "granted");
    }

    verPermissoes();
  });

  const acessaCamera = async () => {
    const imagem = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    console.log(imagem);
    setPhoto(imagem.assets[0].uri);
  };

  const regiaoInicial = {
    latitude: -23.52618,
    longitude: -46.54027,
    latitudeDelta: 0.0052,
    longitudeDelta: 0.0012,
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
            <Pressable onPress={acessaCamera} style={styles.button}>
              <Text style={styles.buttonText}>Acessar câmera</Text>
            </Pressable>
          </View>

          <View style={styles.photo}>
            {photo && (
              <Image source={photo} style={{ width: 300, height: 200 }} />
            )}
          </View>

          <Pressable style={styles.button} onPress={newLocal} rr>
            <Text style={styles.buttonText}>Acessar Local</Text>
          </Pressable>

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
                >
                  {photo && (
                    <Image source={photo} style={{ width: 10, height: 10 }} />
                  )}
                </Marker>
              )}
            </MapView>
          </View>
          {local && (
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Enviar Dados</Text>
            </Pressable>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    margin: 5,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 5,
  },
  question: {
    fontSize: 18,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginBottom: 5,
  },
  photo: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C6C6C6",
    marginBottom: 5,
    width: 300,
    height: 200,
  },
  button: {
    backgroundColor: "black",
    height: 30,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    padding: 2,
    textAlign: "center",
    fontSize: 18,
  },
  viewMapa: {
    alignItems: "center",
    width: 300,
    height: 200,
    marginBottom: 5,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
