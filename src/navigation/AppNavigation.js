import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MainScreen } from '../screens/MainScreen';
import { PostScreen } from '../screens/PostScreen';
import { THEME } from '../theme';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { BookedScreen } from '../screens/BookedScreen';
import { Ionicons } from '@expo/vector-icons';
import { AboutScreen } from '../screens/AboutScreen';
import { CreateScreen } from '../screens/CreateScreen';

const PostNavigator = createNativeStackNavigator();
const BookNavigator = createNativeStackNavigator();
const CreateNavigator = createNativeStackNavigator();
const AboutNavigator = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AndroidTab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();

const defaultScreenOptions = () => {
  return {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff',
    },
    headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR,
  };
};

const iconCreateHandler = (title, iconName, pressFunc) => {
  return (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item title={title} iconName={iconName} onPress={pressFunc} />
    </HeaderButtons>
  );
};

const goToPost = ({ route, navigation }) => {
  const { date, booked } = route.params;
  const iconName = booked ? 'ios-star' : 'ios-star-outline';

  return {
    title: `Пост от ${new Date(date).toLocaleDateString()}`,
    headerRight: () =>
      iconCreateHandler('Star', iconName, () => console.log(1)),
  };
};

const PostNavigation = ({ navigation }) => {
  return (
    <PostNavigator.Navigator screenOptions={defaultScreenOptions}>
      <PostNavigator.Screen
        name='Main'
        component={MainScreen}
        options={{
          title: 'Мой блог',
          headerLeft: () =>
            iconCreateHandler('Menu', 'ios-menu', () =>
              navigation.openDrawer()
            ),
        }}
      />
      <PostNavigator.Screen
        name='Post'
        component={PostScreen}
        options={goToPost}
      />
    </PostNavigator.Navigator>
  );
};

const CreateNavigation = ({ navigation }) => {
  return (
    <CreateNavigator.Navigator screenOptions={defaultScreenOptions}>
      <CreateNavigator.Screen
        name='CreatePage'
        options={{
          title: 'Новый пост',
          headerLeft: () =>
            iconCreateHandler('Menu', 'ios-menu', () =>
              navigation.openDrawer()
            ),
        }}
        component={CreateScreen}
      />
    </CreateNavigator.Navigator>
  );
};

const AboutNavigation = ({ navigation }) => {
  return (
    <AboutNavigator.Navigator screenOptions={defaultScreenOptions}>
      <AboutNavigator.Screen
        name='AboutPage'
        options={{
          title: 'О приложении',
          headerLeft: () =>
            iconCreateHandler('Menu', 'ios-menu', () =>
              navigation.openDrawer()
            ),
        }}
        component={AboutScreen}
      />
    </AboutNavigator.Navigator>
  );
};

const BookNavigation = () => {
  return (
    <BookNavigator.Navigator screenOptions={defaultScreenOptions}>
      <BookNavigator.Screen
        name='Bookmark'
        options={{ title: 'Избранное' }}
        component={BookedScreen}
      />
      <BookNavigator.Screen
        name='Post'
        component={PostScreen}
        options={goToPost}
      />
    </BookNavigator.Navigator>
  );
};

const bottomTabsConfig = (Tab) => {
  return (
    <Tab.Navigator
      screenOptions={{
        ...defaultScreenOptions,
        headerShown: false,
        tabBarActiveTintColor:
          Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR,
      }}
      barStyle={{
        backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff',
      }}
    >
      <Tab.Screen
        name='Posts'
        component={PostNavigation}
        options={{
          tabBarIcon: (info) => (
            <Ionicons name='ios-albums' size={25} color={info.color} />
          ),
          tabBarLabel: 'Все',
        }}
      />
      <Tab.Screen
        name='Bookmarks'
        component={BookNavigation}
        options={{
          tabBarIcon: (info) => (
            <Ionicons name='ios-star' size={25} color={info.color} />
          ),
          tabBarLabel: 'Избранное',
        }}
      />
    </Tab.Navigator>
  );
};

const BottomTab = () =>
  Platform.OS === 'android'
    ? bottomTabsConfig(AndroidTab)
    : bottomTabsConfig(Tab);

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: THEME.MAIN_COLOR,
        drawerLabelStyle: { fontFamily: 'open-bold' },
      }}
    >
      <Drawer.Screen
        name='Bottom'
        options={{
          title: 'Главная',
        }}
        component={BottomTab}
      />
      <Drawer.Screen
        name='About'
        options={{ title: 'О приложении' }}
        component={AboutNavigation}
      />
      <Drawer.Screen
        name='Create'
        options={{ title: 'Новый пост' }}
        component={CreateNavigation}
      />
    </Drawer.Navigator>
  );
};

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};
