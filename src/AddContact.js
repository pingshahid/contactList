import React , {useReducer} from 'react';
import { View,StyleSheet,TouchableHighlight,Image,TouchableOpacity,AsyncStorage } from 'react-native';
import { Form, Item, Input, Button, Text as NBText } from 'native-base'
import {Avatar} from 'react-native-elements';
import ImagePicker from "react-native-image-picker";



const reducer = (state,action) =>{
    switch(action.fieldToChange){
        case 'name':{
            return action.value.length == 0 ? state :
            {...state, name : action.value};
        }
        case 'mobile':{
            return action.value.length == 0 ? state :
            {...state, mobile : action.value};
        }
        case 'landline':{
            return action.value.length == 0 ? state :
            {...state, landline : action.value};
        }case 'fav':{
            return {...state, fav : action.value};
        }case 'uri':{
            return {...state, uri : action.value};
        }

        default:
            return state;
    }
}


function AddContact({route,navigation}) {


    const editedData = route.params;


    const {Name} = editedData != null ? editedData : '';
    const {Mobile} = editedData != null ? editedData : '';
    const {Landline} = editedData != null ? editedData : '';
    const {Fav} = editedData != null ? editedData : '';
    const {URI} = editedData != null ? editedData : '';
    const {onSelect} = editedData != null ? editedData : '';

    const [state, dispatch] = useReducer(reducer, {name:Name,mobile:Mobile,landline:Landline,fav:Fav,uri:URI});
    const {name, mobile, landline,fav,uri} = state;
    

    //console.log(name);
    pickPicture = () => {
        console.log('picture');

        const options = {
            title: 'Select Avatar',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
          
        ImagePicker.showImagePicker(options, (response) => {
          if (response.didCancel) {
            return;
          }
      
          if (response.error) {
            // TODO: handle error
          }
      
          dispatch({fieldToChange: 'uri', value :response.uri})
        });
      }

    getPicture = () => {
        pickPicture();
         //console.log('getPicture');
    }

		React.useLayoutEffect(() => {
            AsyncStorage.getAllKeys((err, keys) => {
                AsyncStorage.multiGet(keys, (error, stores) => {
                  stores.map((result, i, store) => {
                    //console.log({ [store[i][0]]: store[i][1] });
                    return true;
                  });
                });
              });

		navigation.setOptions({
		  headerLeft: () => (
			<TouchableHighlight onPress={() => navigation.goBack()	}>
            <Image style={styles.imageSize} source={require('../images/backbtn.png') } />
          </TouchableHighlight> 
		  ),
		  headerRight: () => (
			<Button
                        style={{ backgroundColor: '#5067FF', margin: 5, justifyContent: 'center' }}
                        onPress={this.onFavTapped}
                    >
                        <NBText style={{ fontWeight: 'bold' }}>Fav</NBText>
                    </Button>
		  )
		//   headerRight: () => (
		// 	<TouchableOpacity onPress={console.log('a')}>
        //     <Image style={styles.imageSize} source={require('./images/star.png') } />
        //   </TouchableOpacity> 
		//   )
		});
	  });




    onChangeText = event => {
       // this.setState({ task: event.nativeEvent.text });
        console.log(event.nativeEvent.text);
    }

    onAddTask = () => {
        
        if (name.length == 0){
            alert('Please enter Name')
        }else if(mobile.length < 10){
            alert('Please enter a valid Mobile Number')
        }else if(landline.length < 10){
            alert('Please enter a valid Landline Number')
        }else{
            const objectToBeSaved = { 'name':name,'mobile':mobile,'landline':landline,'fav':fav,'uri':uri };
            console.log(objectToBeSaved);
            AsyncStorage.setItem(mobile, JSON.stringify(objectToBeSaved) )
            .then( ()=>{
                console.log('It was saved successfully');
                
                navigation.goBack();
                onSelect();
            } )
                .catch( ()=>{
                console.log('There was an error saving the product');
            } )
        }


        
        //console.log(state);
    }

    onFavTapped = () =>{
        dispatch({fieldToChange: 'fav', value : !fav})
    }

    onEndNameFieldEditingText = event =>{
        //console.log(event.nativeEvent.text);
        dispatch({fieldToChange: 'name', value : event.nativeEvent.text})
    }

    onEndMobileFieldEditingText = event =>{
        //console.log(event.nativeEvent.text);
        dispatch({fieldToChange: 'mobile', value : event.nativeEvent.text})
    }
    onEndLandLineFieldEditingText = event =>{
        //console.log(event.nativeEvent.text);
        dispatch({fieldToChange: 'landline', value : event.nativeEvent.text})
    }
  
	

	
	return (
		
		<View>
                <View style={{ marginRight: 10 }}>
		

                    <Form>
					<Item>
                           <TouchableOpacity onPress={getPicture} style={styles.avatarContainer}>
 			<Avatar
 			  rounded
 			  size="xlarge"
               icon={{ name: "person" }}
               source={{uri:uri}}
			/>
		</TouchableOpacity>
                        
                        </Item>
                        <Item>
                            <Input
                                placeholder='Name'
                                defaultValue={Name}
                                autoFocus
                                clearButtonMode='always'
                                autoCorrect={false}
                                onChange={this.onChangeText}
                                onEndEditing={this.onEndNameFieldEditingText}
                                onSubmitEditing={this.onEndNameFieldEditingText}
                                returnKeyType={'done'}
                            />
                        
                        </Item>
                        <Item>
                            <Input
                                placeholder='Mobile'
                                clearButtonMode='always'
                                defaultValue={Mobile}
                                autoCorrect={false}
                                onChange={this.onChangeText}
                                onEndEditing={this.onEndMobileFieldEditingText}
                                onSubmitEditing={this.onEndMobileFieldEditingText}
                                keyboardType={'number-pad'}
                                returnKeyType={'done'}
                            />
                        
                        </Item>
                        <Item>
                            <Input
                                placeholder='Landline'
                                clearButtonMode='always'
                                defaultValue={Landline}
                                autoCorrect={false}
                                onChange={this.onChangeText}
                                onEndEditing={this.onEndLandLineFieldEditingText}
                                onSubmitEditing={this.onEndLandLineFieldEditingText}
                                keyboardType={'number-pad'}
                                returnKeyType={'done'}
                            />
                        
                        </Item>
                    </Form>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Button
                        style={{ backgroundColor: '#5067FF', margin: 25, justifyContent: 'center' }}
                        onPress={this.onAddTask}
                    >
                        <NBText style={{ fontWeight: 'bold' }}>Save contact</NBText>
                    </Button>
                </View>
            </View>
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

export default AddContact;