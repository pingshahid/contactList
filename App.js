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

// function ShowContactList({navigation}) {

// 	// const {itemId} = route.params;
// 	// const {otherParam} = route.params;
// 	return (
// 			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
// 			<Text>ShowContactList Screen</Text>
// 			<ActionButton
//   				buttonColor="rgba(231,76,60,1)"
//   				onPress={() => { navigation.push('Add Contact')}}
// 			/>
// 			</View>
// 	       );
// }

// function ShowFavContactList({navigation}) {

// 	return (
// 			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
// 			<Text>ShowFavContactList Screen</Text>
// 			</View>
// 	       );
// }

// function AddContact({navigation}) {

// 	// const {itemId} = route.params;
// 	// const {otherParam} = route.params;

// 	React.useLayoutEffect(() => {
// 		navigation.setOptions({
// 		  headerLeft: () => (
// 			<TouchableHighlight onPress={() => navigation.goBack()	}>
//             <Image style={styles.imageSize} source={require('./images/backbtn.png') } />
//           </TouchableHighlight> 
// 		  ),
// 		  headerRight: () => (
// 			<Button style={styles.FavStyle} onPress={() => console.log('f')} title="Fav"  />
// 		  )
// 		//   headerRight: () => (
// 		// 	<TouchableHighlight onPress={console.log('a')}>
//         //     <Image style={styles.imageSize} source={require('./images/star.png') } />
//         //   </TouchableHighlight> 
// 		//   )
// 		});
// 	  });
// 	// state = {
// 	// 	text: ''
// 	// }

// 	// onChangeText = event => {
// 	// 	this.setState({ task: event.nativeEvent.text })
// 	// }

// 	// onAddTask = () => {
// 	// 	console.log('Save Contact');
// 	// 			// this.props.navigation.state.params.saveItem(this.state.task)
// 	// 	// this.props.navigation.goBack()
// 	// }
// 	inputs = {};

//   registerInput = id => ref => {
//     this.inputs[id] = ref;
//   };

//   focusInput = id => () => {
//     this.inputs[id].focus();
//   };

// 	const {
// 		firstName,
// 		lastName,
// 		setFirstName,
// 		setLastName,
// 		pickPicture,
// 		picture,
// 		isPictureSet
// 	  } = this.props;


	  
  
// 	  const avatarProps = isPictureSet ? { source: { uri: picture } } : {};
	
// 	return (
		
// 		<View style={styles.container}>
// 		  <TouchableOpacity onPress={pickPicture} style={styles.avatarContainer}>
// 			<Avatar
// 			  rounded
// 			  size="xlarge"
// 			  icon={{ name: "person" }}
// 			  {...avatarProps}
// 			/>
// 		  </TouchableOpacity>
// 		  <View style={styles.formContainer}>
// 			<Input
// 			  autoFocus
// 			  enablesReturnKeyAutomatically
// 			  returnKeyType="next"
// 			  autoCapitalize="words"
// 			  value={firstName}
// 			  onChangeText={setFirstName}
// 			  placeholder="First name"
// 			  ref={this.registerInput("firstName")}
// 			  onSubmitEditing={this.focusInput("lastName")}
// 			  blurOnSubmit={false}
// 			/>
// 			<Input
// 			  enablesReturnKeyAutomatically
// 			  autoCapitalize="words"
// 			  returnKeyType="done"
// 			  value={lastName}
// 			  onChangeText={setLastName}
// 			  placeholder="Last name"
// 			  ref={this.registerInput("lastName")}
// 			/>
// 		  </View>
// 		</View>
// 	  );
	  
	  
	  
// }

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
