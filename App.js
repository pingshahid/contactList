// In App.js in a new project

import * as React from 'react';
import { View, Text,TouchableHighlight,Image,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import AddContact from './src/AddContact';
import ShowContactList from './src/ShowContactList';
import ShowFavContactList from './src/ShowFavContactList';


function ContactList({navigation}) {
	const Stack = createStackNavigator();

	return(
		<Stack.Navigator
		screenOptions={{
			
			headerTintColor: '#000',
			headerTitleStyle: {
			  fontWeight: 'bold',
			},
			headerLeft: () => (

			<TouchableHighlight onPress={() => navigation.dispatch(DrawerActions.openDrawer())	}>
            <Image style={styles.imageSize} source={require('./images/drawer.png') } />
          </TouchableHighlight> 
			  )
		  }}
		>
		<Stack.Screen name="Contact List" component={ShowContactList} />
		<Stack.Screen name="Add Contact" component={AddContact} />
	</Stack.Navigator>
	);
}

function FavoriteList({navigation}){
	const Stack = createStackNavigator();

	return(
		<Stack.Navigator
		screenOptions={{
			
			headerTintColor: '#000',
			headerTitleStyle: {
			  fontWeight: 'bold',
			},
			headerLeft: () => (

			<TouchableHighlight onPress={() => navigation.dispatch(DrawerActions.openDrawer())	}>
            <Image style={styles.imageSize} source={require('./images/drawer.png') } />
          </TouchableHighlight> 
			  )
		  }}
		>
				

				<Stack.Screen name="Favorite Contact List" component={ShowFavContactList} />
				<Stack.Screen name="Add Contact" component={AddContact} />

	</Stack.Navigator>
	);
}



function App() {
	const Drawer = createDrawerNavigator();
	return (
		<NavigationContainer>
		  <Drawer.Navigator >
			<Drawer.Screen name="Contact List" component={ContactList} />
			<Drawer.Screen name="Favorite List" component={FavoriteList} />
		  </Drawer.Navigator>
		</NavigationContainer>
	  );
}
const styles = StyleSheet.create({
	imageSize: {
		width: 25,
		height:25,
		margin:10,
	},userSize: {
		width: 100,
		height:100,
		margin:10,
	},
	FavStyle:{
		padding:10,
		color:'#000',
		backgroundColor:'#000000'
	},container: {
		flex: 1
	  },
	  avatarContainer: {
		flex: 4,
		alignItems: "center",
		justifyContent: "center"
	  },
	  formContainer: {
		flex: 2,
		backgroundColor: '#FFF',
		paddingTop: 32,
		paddingLeft: 32,
		paddingRight: 32,
		justifyContent: "flex-start",
		alignItems: "center"
	  }
})
export default App;
