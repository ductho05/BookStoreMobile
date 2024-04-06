import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabAllRoutes from '../routerConfigs/TabAll.config';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import Cart from '../../screens/user/Cart';

import { useEffect } from 'react';
import { checkUser, fetchInitialData } from '../../stores/asyncActions';
import { getAddressDelivery, getOrientation } from '../../stores/otherSlice';
import { Dimensions } from 'react-native';
import { addUserToCart } from '../../stores/cartSlice';
import { logout } from '../../stores/userSlice';
const Stack = createNativeStackNavigator()

const TabAllStack = () => {
  const { token, user } = useSelector(state => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const onChange = ({ window }) => {
      const { width, height } = window;
      dispatch(getOrientation(width > height ? 'landscape' : 'portrait'));
    };

    Dimensions.addEventListener('change', onChange);

    return () => {
      Dimensions?.removeEventListener('change', onChange);
    };
  }, []);

  React.useEffect(() => {
    dispatch(checkUser(token))
    dispatch(fetchInitialData(token ? token + user?._id : null))
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"TabBottom"}
        screenOptions={{
          headerShown: false
        }}
      >
        {
          TabAllRoutes.map(screen => (
            <Stack.Screen
              key={screen.name}
              name={screen.name}
              component={screen.component}
            />
          ))
        }
        <Stack.Screen
          name='Cart'
          component={Cart}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default TabAllStack;
