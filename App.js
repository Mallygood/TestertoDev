import { View, FlatList, Text } from "react-native";
import { myStyles } from "./styles/myStyle";
import Person from "./components/Person";
import { useState } from "react";
import AddForm from "./components/AddForm";

export default function App() {
  const [data, setData] = useState([
    { id: 1, name: "Waeadil", age: 21 },
    { id: 2, name: "Mally", age: 25 },
    { id: 3, name: "Potter", age: 30 },
    { id: 4, name: "Jame", age: 26 },
    { id: 5, name: "Lina", age: 22 },
  ]);

  const deleteData=(id)=>{
    setData((prevData)=>{
      const newData= prevData.filter(item=>item.id!==id);
      
      return newData.map((item,index) => ({
        ...item,
        id:index+1
      }))
    })
  }

  const insertData=(name,age)=>{
    if(name){
      setData((prevData)=>{
        const newData = [
        ...prevData,
          {id:prevData.length+1,name,age}
      ];
        return newData;
    });
    }
    else{
      Alert.alert("Name is required");
    }
  }

  return (
    <View style={myStyles.Container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Person item={item} deleteData={deleteData}/>}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <Text
            style={{ alignSelf: "center", fontSize: 20, fontWeight: "bold", margin:10 }}
          >
            Demographic information
          </Text>
        }
        ListEmptyComponent={
          <Text style={{ alignSelf: "center", fontSize: 15 }}>
            No data
          </Text>
        }
      />

      <AddForm insertData={insertData}/>
    </View>
  );
}
