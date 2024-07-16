import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from '../Screens/Register';
import Login from '../Screens/Login';
import Settings from '../Screens/Settings';
import Dashboard from '../Screens/Dashboard';
import OneList from '../Screens/OneList';
import AddNewList from '../Screens/AddNewList';
import Profile from '../Screens/Profile';

import { getAsyncStorageData } from '../helpers/storage';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const auth = useSelector((state) => state.auth.auth);

  const [token, setToken] = useState(null)

  useEffect(() => {
    getAsyncStorageData('token').then((tokenKey) => {
      setToken(tokenKey)
    })
  }, [auth])

  return (
    token || auth?.data?.token ?
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="OneList" component={OneList} />
        <Stack.Screen name="AddNewList" component={AddNewList} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator> :
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
  )
}

export default Navigation