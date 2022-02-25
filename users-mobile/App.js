import React, { useEffect,useState } from 'react';
import { StyleSheet,ActivityIndicator,FlatList,Text,Image,View } from 'react-native';
/**
 * Problems with this App:
 * 1 => I could not write an `onClick` event properly.
 *
 * 2 => Following the prev. point, I didn't
 *      other screen. I was reading:
 *      https://reactnative.dev/docs/navigation.
 *
 * 3 => I used the example for use Images.
 *      https://reactnative.dev/docs/images
 * 
 * 4 => And this doc. for use style:
 *      https://reactnative.dev/docs/stylesheet 
 * */

const styles = StyleSheet.create({
  // General
  container: {
    padding: 20,
  },
  // HTML elements
  p: {
    marginBottom: 5,
    padding: 5,
  },
  // User container:
  userAvatar: {
    width: 100,
    height: 100,
    flexDirection: 'column-reverse',
  },
  userRow: {
    height: 150,
    borderTopColor: "gray",
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    /* I know: maybe using a Button is better insted of: */
    cursor: "pointer",
  },
  userColumn: {
  },
});

/**
 * Trying to show the info. user
 **/
const showInfo = user => {
   return ( 
         <View style={styles.userColumn}>
               <Text style={styles.p}>She/He is the user {item.id}.</Text>
               <Text style={styles.p}>{item.email}</Text>
	 </View>
     )
}
/*
 * Using the example of Networks concepts, fetch to API.
 * from https://reactnative.dev/docs/network
 */
export default function App () {
  const [isLoading, setLoading] = useState(true);
  const [showUser, showInfo] = useState({});
  const [data, setData] = useState([]);
   const getUsers = async () => {
     try {
      const response = await fetch('https://reqres.in/api/users/');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
	  getUsers();
	  }, []);
  /**
   * This will be the 1st Screen >> HomePage
   *
   * Using <Table> html concept to order 
   *               the containers:
   * */
  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data.data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
	  <View style={styles.userRow}  onClick={() => setInfo(showInfo => 
	                                                      ({showInfo,[item.id]:1}))}> 
	    <View style={styles.userColumn}>
	       <Image source={{uri:item.avatar}}
	           style={styles.userAvatar}
	           />
            </View>
	    { /*showInfo(item)*/  } 
            <View style={styles.userColumn}>
               <Text style={styles.p}>She/He is the user {item.id}</Text>
               <Text style={styles.p}>{item.email}.</Text>
	    </View>
          </View>
          )}
        />
      )}
    </View>
  );
};


