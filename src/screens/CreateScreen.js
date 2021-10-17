import React, { useRef, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { PhotoPicker } from '../components/PhotoPicker';
import { addPost } from '../store/actions/post';
import { THEME } from '../theme';

export const CreateScreen = ({ navigation }) => {
  const [text, setText] = useState('');
  const imgRef = useRef();

  const dispatch = useDispatch();

  const saveHandler = () => {
    const post = {
      date: new Date().toJSON(),
      text: text,
      img: imgRef.current,
      booked: false,
    };

    dispatch(addPost(post));
    navigation.navigate('Main');
  };

  const pickHandler = (uri) => {
    imgRef.current = uri;
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Создать новый пост</Text>
          <TextInput
            style={styles.textArea}
            placeholder='Введите текст заметки'
            value={text}
            onChangeText={setText}
            multiline
          />
          <PhotoPicker onPick={pickHandler} />

          <Button
            title='Создать пост'
            color={THEME.MAIN_COLOR}
            onPress={saveHandler}
            disabled={!text}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'open-regular',
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
});
