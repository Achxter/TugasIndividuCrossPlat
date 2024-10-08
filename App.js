import './gesture-handler';
import { StyleSheet } from 'react-native';
import HomePage from './pages/HomePage';
import Search from './pages/Search';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Divider, Icon, PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import data from './data.json';

SplashScreen.preventAutoHideAsync();

function CustomDrawerContent(props) {
  const [loaded, error] = useFonts({
    'ProductSans': require('./assets/fonts/ProductSans-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <DrawerContentScrollView {...props}
    >
      <DrawerItem
        label={"Gmail"}
        labelStyle={{ fontSize: 20, color: '#c63833', fontWeight: 'thin', fontFamily: 'ProductSans' }}
        onPress={() => { }}
        pressColor="transparent"
      />
      <Divider style={{ marginBottom: 8 }} />
      <DrawerItem
        style={{ paddingHorizontal: 10 }}
        activeBackgroundColor='#d4e5f5'
        label={"Active"}
        labelStyle={{ marginLeft: -12 }}
        icon={() => <Icon source="circle" color='#128532' size={16} />}
        pressColor="transparent"
      />
      <DrawerItem
        style={{ paddingHorizontal: 8, marginTop: -4 }}
        activeBackgroundColor='#d4e5f5'
        label={"Add a status"}
        labelStyle={{ marginLeft: -16 }}
        icon={() => <Icon source="pencil-outline" size={24} />}
        pressColor="transparent"
      />
      <Divider style={{ marginBottom: 8 }} />
      <DrawerItemList {...props} />
      <DrawerItem
        label={"All labels"}
        labelStyle={{ fontSize: 12, marginTop: -8 }}
        onPress={() => { }}
        pressColor="transparent"
      />
      {data.drawer.sections.map((section, index) => (
        <DrawerItem
          style={{ paddingHorizontal: 8, marginTop: index === 0 ? -8 : 0 }}
          activeBackgroundColor='#d4e5f5'
          icon={() => <Icon source={section.icon} size={24} />}
          key={section.label}
          label={section.label}
          labelStyle={{ fontSize: 14, color: '#425363', marginLeft: -16 }}
          onPress={() => { }}
          pressColor='transparent'
        />
      ))}
      <DrawerItem
        label={"Google Apps"}
        labelStyle={{ fontSize: 12 }}
        onPress={() => { }}
        pressColor="transparent"
      />
      <DrawerItem
        style={{ paddingHorizontal: 10, marginTop: -4 }}
        activeBackgroundColor='#d4e5f5'
        label={"Calendar"}
        labelStyle={{ marginLeft: -16 }}
        icon={() => <Icon source="calendar-blank" size={24} />}
        pressColor="transparent"
      />
      <DrawerItem
        style={{ paddingHorizontal: 10, marginTop: -4 }}
        activeBackgroundColor='#d4e5f5'
        label={"Contacts"}
        labelStyle={{ marginLeft: -16 }}
        icon={() => <Icon source="account-circle-outline" size={24} />}
        pressColor="transparent"
      />
      <Divider style={{ marginBottom: 8 }} />
      <DrawerItem
        style={{ paddingHorizontal: 10, marginTop: -4 }}
        activeBackgroundColor='#d4e5f5'
        label={"Settings"}
        labelStyle={{ marginLeft: -16 }}
        icon={() => <Icon source="cog-outline" size={24} />}
        pressColor="transparent"
      />
      <DrawerItem
        style={{ paddingHorizontal: 10, marginTop: -4 }}
        activeBackgroundColor='#d4e5f5'
        label={"Help and feedback"}
        labelStyle={{ marginLeft: -16 }}
        icon={() => <Icon source="help-circle-outline" size={24} />}
        pressColor="transparent"
      />
    </DrawerContentScrollView>
  );
}

export default function App() {
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();
  const MyTheme = {
    dark: false,
    colors: {
      primary: 'rgb(255, 45, 85)',
      background: 'rgb(242, 242, 242)',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(28, 28, 30)',
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)',
      divider: '#cdd3d9',
    },
    fonts: {
      regular: {
        fontFamily: 'ProductSans',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'ProductSans',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'ProductSans',
        fontWeight: 'light',
      },
      thin: {
        fontFamily: 'ProductSans',
        fontWeight: 'thin',
      },
    },
  };

  const [loaded, error] = useFonts({
    'ProductSans': require('./assets/fonts/ProductSans-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={MyTheme}>
        <PaperProvider>
          <Drawer.Navigator screenOptions={{
            headerShown: false,
            drawerStyle: { backgroundColor: '#f6f9fe', width: '80%' },
            drawerActiveBackgroundColor: '#d4e5f5',
            drawerItemStyle: { borderRadius: 24, paddingHorizontal: 8 },
            drawerLabelStyle: { marginLeft: -16 },
            drawerActiveTintColor: '#102131',
            drawerInactiveTintColor: '#404751',
          }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen
              name="Inbox"
              options={{
                drawerIcon: () => (
                  <Icon source='inbox' size={24} />
                ),
              }}>
              {() => (
                <Stack.Navigator screenOptions={{ headerShown: false, animationTypeForReplace: 'push' }}>
                  <Stack.Screen name="HomePage" component={HomePage} />
                  <Stack.Screen name="Search" component={Search} />
                </Stack.Navigator>
              )}
            </Drawer.Screen>
            <Drawer.Screen
              name="Search"
              component={Search}
              options={{
                drawerLabel: () => null,
                title: null,
                drawerIcon: () => null,
                drawerItemStyle: { display: 'none' }, // Hide the button itself
              }}
            />
          </Drawer.Navigator>
        </PaperProvider>
      </NavigationContainer>
    </SafeAreaProvider >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
