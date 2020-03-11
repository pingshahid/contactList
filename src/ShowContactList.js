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

// function reducer(state, action) {
//   const newState = state.slice();

//   newState.push(action.newItem);
//   console.log(action.newItem);
//   return newState;
// }

function ShowContactList({navigation}) {

  var initialVal = [];//[{'name':'shahid','mobile':'12'}];

  const [contacts, setContacts] = useState([]);
  const [isDataLoaded,setIsDataLoaded] = useState(false);

  // const [state, dispatch] = useReducer(reducer, initialVal);
  // const {contacts} = state;


  async function fetchData(){
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (error, stores) => {
        stores.map((result, i, store) => {
          //console.log({ [store[i][0]]: store[i][1] });
          //dispatch({ 'newItem' : store[i][1]})
  
          initialVal.push(JSON.parse(store[i][1]));
        
          return true;
        });
        console.log('##1');
        console.log(isDataLoaded);
        if (isDataLoaded == false){
          console.log('##');
          setIsDataLoaded(true);
          initialVal.sort((a, b) => (a.name > b.name) ? 1 : -1)
          console.log(initialVal);
          setContacts(initialVal);
        }
        
  
      });
    });
  }
  
React.useEffect(()=>{
 fetchData();
});

console.log('******');
    if (contacts.length  > 0) {
      return(
      <View>
        <View>
        <FlatList
          data={contacts}
          keyExtractor={getKey}
          renderItem={renderContact}
        />
        </View>
        <ActionButton
              buttonColor="rgba(231,76,60,1)"
              onPress={() => { navigation.push('Add Contact'); setIsDataLoaded(false);}}
        />
      </View>
      );
    }else{
      return(
      renderEmptyList(navigation)
      );
    }
}
// const ShowContactList = ({ navigation }) =>
//   contacts && contacts.length > 0 ? (
//     <View>
//     <FlatList
//       data={contacts}
//       keyExtractor={getKey}
//       renderItem={renderContact}
//     />
//     <ActionButton
//   				buttonColor="rgba(231,76,60,1)"
//   				onPress={() => { navigation.push('Add Contact')}}
// 		/>
// </View>
//   ) : (
//     renderEmptyList()
//   );


export default ShowContactList;
