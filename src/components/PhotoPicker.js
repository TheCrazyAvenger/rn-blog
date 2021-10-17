import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, StyleSheet, Button, Image, Platform, Alert } from 'react-native';

export const PhotoPicker = ({ onPick }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Ошибка', 'Вы не предоставили права на создание фото');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      onPick(result.uri);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Button title='Выбрать фото' onPress={pickImage} />
      {image && <Image style={styles.image} source={{ uri: image }} />}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
});
