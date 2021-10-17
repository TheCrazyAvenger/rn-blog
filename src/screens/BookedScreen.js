import React from 'react';
import { useSelector } from 'react-redux';
import { PostList } from '../components/PostList';

export const BookedScreen = ({ navigation }) => {
  const bookedPosts = useSelector((state) => state.post.bookedPosts);

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

  const data = bookedPosts.filter((post) => post.booked);

  return <PostList data={data} onOpen={openPostHandler} />;
};
