import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { PostList } from '../components/PostList';
import { loadPosts } from '../store/actions/post';

export const MainScreen = ({ navigation }) => {
  const openPostHandler = (post) => {
    navigation.navigate('Post', {
      postId: post.id,
      date: post.date,
      imgUrl: post.img,
      text: post.text,
      booked: post.booked,
      date: post.date,
    });
  };

  const allPosts = useSelector((state) => state.post.allPosts);
  const loading = useSelector((state) => state.post.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  return <PostList data={allPosts} onOpen={openPostHandler} />;
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
