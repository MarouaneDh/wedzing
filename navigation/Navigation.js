import { useDispatch, useSelector } from 'react-redux';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from '../Screens/Register';
import Login from '../Screens/Login';
import Settings from '../Screens/Settings';
import Dashboard from '../Screens/Dashboard';
import OneList from '../Screens/OneList';
import AddNewList from '../Screens/AddNewList';
import Profile from '../Screens/Profile';
import { useEffect, useState } from 'react';
import { getAsyncStorageData } from '../helpers/storage';
import { getOneUser } from '../redux/slices/user/userAsyncThunk';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth.auth);
  const user = useSelector((state) => state.user.user)
  const [token, setToken] = useState("")

  useEffect(() => {
    const settingToken = async () => {
      const tokenString = await getAsyncStorageData("token")
      setToken(tokenString)
    }
    settingToken()
  }, [auth])

  useEffect(() => {
    dispatch(getOneUser())
  }, [auth])

  return (
    user?.user?.password || token || auth?.auth?.token ?
      <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName="Dashboard">
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