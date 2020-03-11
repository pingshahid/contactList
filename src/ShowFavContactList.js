import React, {useState} from "react";
import { View, FlatList, Text, StyleSheet,AsyncStorage } from "react-native";
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
const renderContact = ({ item }) => <Contact {...item} />;
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
  const [isDataLoaded,setIsDataLoaded] = useState(false);


  async function fetchData(){
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (error, stores) => {
        stores.map((result, i, store) => {
  
          initialVal.push(JSON.parse(store[i][1]));
        
          return true;
        });
        console.log(isDataLoaded);
        if (isDataLoaded === false){
          setIsDataLoaded(true);
          initialVal = initialVal.filter(function( obj ) {
            return obj.fav == true;
          });
          initialVal.sort((a, b) => (a.name > b.name) ? 1 : -1)
          console.log('fav');
          console.log(initialVal);
          setContacts(initialVal);
        }
        
  
      });
    });
  }
  
React.useEffect(()=>{
 fetchData();
},[]);

console.log('******');
    if (contacts.length  > 0) {
      return(
      <View>
        <FlatList
          data={contacts}
          keyExtractor={getKey}
          renderItem={renderContact}
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
