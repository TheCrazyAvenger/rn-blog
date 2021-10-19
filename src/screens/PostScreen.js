import React, { useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removePost, toggleBooked } from '../store/actions/post';
import { THEME } from '../theme';

export const PostScreen = ({ route, navigation }) => {
  const { postId, imgUrl, text } = route.params;

  const post = useSelector((state) =>
    state.post.allPosts.find((post) => post.id === postId)
  );
  const booked = useSelector((state) =>
    state.post.bookedPosts.some((post) => post.id === postId)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setParams({ booked });
  }, [booked]);

  const toggleHandler = useCallback(() => {
    dispatch(toggleBooked(post));
  }, [dispatch, post]);

  useEffect(() => {
    navigation.setParams({ toggleHandler });
  }, [toggleHandler]);

  const removeHandler = () => {
    Alert.alert(
      'Удаление поста',
      'Вы точно хотите удалить пост?',
      [
        {
          text: 'Отменить',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: () => {
            dispatch(removePost(postId));
            navigation.navigate('Main');
          },
        },
      ],
      {
        cancelable: false,
      }
    );
  };

  return (
    <ScrollView>
      <ImageBackground style={styles.image} source={{ uri: imgUrl }} />
      <View style={styles.textWrap}>
        <Text style={styles.title}>{text}</Text>
      </View>
      <Button
        title='Удалить'
        color={THEME.DANGER_COLOR}
        onPress={removeHandler}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  textWrap: {
    padding: 10,
  },
  title: {
    fontFamily: 'open-regular',
  },
});
