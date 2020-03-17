import React, {useState} from "react";
import { View, FlatList, Text, StyleSheet,AsyncStorage,TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

import  Contact  from "./Contact";
import { DIVIDER } from "./colors";
import ActionButton from 'react-native-action-button';

const styles = StyleSheet.create({
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  emptyListTitle: {
    color: DIVIDER
  }
});

const getKey = item => item.mobile;
const renderContact =(navigation) => ({ item }) => (<TouchableOpacity onPress={() => onPressItem(item,navigation)}>
< Contact {...item} />
</TouchableOpacity>);
const renderEmptyList = (navigation) => (
  <View style={styles.emptyListContainer}>
    <Icon size={64} name="mood-bad" color={DIVIDER} />
    <Text style={styles.emptyListTitle}>A little lonely in here...</Text>
    <ActionButton
              buttonColor="rgba(231,76,60,1)"
              onPress={() => { navigation.push('Add Contact')}}
        />
  </View>
);


function ShowFavContactList({navigation}) {

  var initialVal = [];

  const [contacts, setContacts] = useState([]);
  async function fetchData(){
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (error, stores) => {
        stores.map((result, i, store) => {
  
          initialVal.push(JSON.parse(store[i][1]));
        
          return true;
        });
        initialVal = initialVal.filter(function( obj ) {
          return obj.fav == true;
        });
        initialVal.sort((a, b) => (a.name > b.name) ? 1 : -1)
        setContacts(initialVal);
      
  
      });
    });
  }
  
React.useEffect(()=>{
 fetchData();
},[]);

onSelect = () => {
  fetchData();
};

onPressItem = (item,navigation) =>{
  console.log(item);
    { navigation.push('Add Contact', { Name : item.name, Mobile : item.mobile,
   Landline : item.landline,Fav : item.fav,URI : item.uri, onSelect: this.onSelect }) }
    }


console.log('******');
    if (contacts.length  > 0) {
      return(
      <View>
        <FlatList
          data={contacts}
          keyExtractor={getKey}
          renderItem={renderContact(navigation)}
        />
      </View>
      );
    }else{
      return(
      renderEmptyList(navigation)
      );
    }
}



export default ShowFavContactList;
