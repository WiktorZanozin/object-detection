import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ImageScreen from '../screens/ImageScreen';
import CameraScreen from './../screens/CameraScreen';


const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Introduction',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-home" />,
        }}
      />
      <BottomTab.Screen
        name="ImageScreen"
        component={ImageScreen}
        options={{
          title: 'Image Screen',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-image" />,
        }}
      />
      <BottomTab.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{
          title: 'Camera Screen',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-videocam" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Introduction';
    case 'ImageScreen':
      return 'Image Screen';
    case 'CameraScreen':
      return 'Camera Screen';
  }
}