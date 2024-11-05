import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, FlatList } from "react-native";

export default function App() {
  const [input, setInput] = useState("");
  const [lista, setLista] = useState([]);

  useEffect(() => {
    recuperarLista();
  }, []);

  const adicionarTarefa = async () => {
    if (input.trim() === '') return;
    const novaLista = [...lista, input];
    setLista(novaLista);
    setInput('');
    await salvarLista(novaLista);
  };

const salvarLista = async (lista) => {
  try {
    const listaString = JSON.stringify(lista); 
    await AsyncStorage.setItem('@lista', listaString);
  } catch (error) {
    console.log("Erro ao salvar a lista:", error);
  }
};

const recuperarLista = async () => {
  try {
    const listaString = await AsyncStorage.getItem('@lista');
    const listaJSON =  listaString != null ? JSON.parse(listaString) : []; 
    setLista(listaJSON)
  } catch (error) {
    console.log("Erro ao recuperar a lista:", error);
    return [];
  }
};

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Tarefas</Text>

        <TextInput style={styles.textInput} value={input} onChangeText={setInput}></TextInput>

        <View style={styles.addTarefaButton} >
          <Text onPress={adicionarTarefa} style={styles.addTarefaText}>Adicionar tarefa</Text>
        </View>

        <FlatList
        style={styles.list}
        data={lista}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style= {styles.itemContainer}>
            <Text style={{ padding: 10, fontSize: 18 }}>{item}</Text>
          </View>
        )}
      />
    </View>
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'top',
    marginTop: 35
  },

  title : {
    fontWeight: 'bold',
    fontSize: 32
  },

  addTarefaText: {
    color: 'white',
  },
  addTarefaButton: {
    width: 350,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  textInput: {
    height: 40,
    width: 350,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    borderColor: 'black',
    marginBottom: 10,
    marginTop: 10
  },

  itemContainer: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    width: 350,
    height: 60
  },

  itemText: {
    fontSize: 18,
    color: '#333',
  },

  list: {
    paddingTop: 30
  }
});