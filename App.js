import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  const [taskList, setTaskList] = useState([]);

  const addTask = () => {
    setTaskList((curretTaskList) =>
      [...curretTaskList,
      {
        id: Date.now(),
        nome: nome,
        email: email,
        telefone: telefone,
        done: false,
      }
      ]
    );

    clearTask();
  };

  const clearTask = () => {
    setNome("");
    setEmail("");
    setTelefone("");
  };



  const finishTask = (id) => {
    setTaskList((currentTaskList) => {
      const index = currentTaskList.findIndex((nome) => nome.id === id);
      currentTaskList[index].done = !currentTaskList[index].done;
      return [...currentTaskList];
    });
  }



  return (
    <>
      <View style={styles.heder}>
        <Text style={styles.textHeader}>Gerenciamento de Contatos</Text>
      </View>
      <View style={styles.container}>

        <View style={styles.taskInput}>
          <TextInput
            placeholder='Informe seu nome'
            style={styles.taskTextInput}
            value={nome}
            onChangeText={(text) => setNome(text)} />
          <TextInput
            placeholder='Informe seu email'
            style={styles.taskTextInput}
            value={email}
            onChangeText={(email) => setEmail(email)} />
          <TextInput
            placeholder='Informe seu telefone'
            style={styles.taskTextInput}
            value={telefone}
            keyboardType={'numeric'}
            onChangeText={(telefone) => setTelefone(telefone)} />
        </View>

        <Button
          onPress={addTask}
          title='Adicionar Contato'
          color='green'
          accessibilityLabel='Clique aqui para adicionar contatos' />
        <Button
          onPress={clearTask}
          title='Cancelar Contato'
          color='red'
          accessibilityLabel='Botão para limpar os valores' />


        <View style={styles.taskList}>
          <ScrollView>
            {taskList.map(({ id, nome, email, telefone, done }) => {
              return (
                <Pressable key={id} onPress={() => finishTask(id)}>
                  <View style={styles.taskListItem}>
                    <Text>{nome}</Text>
                    <Text style={styles.taskListItemTask(done)}>{email}</Text>
                    <Text style={styles.taskListItemTask(done)}>{telefone}</Text>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>



        <StatusBar style="light" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  heder: {
    backgroundColor: 'green',
    paddingHorizontal: 10,
    paddingVertical: 24,
  },
  textHeader: {
    marginTop: 10,
    fontSize: 24,
    color: 'floralwhite'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  taskInput: {
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextInput: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 16,
    fontSize: 16,
    padding: 5,
    margin: 5,
    width: "90%",

  },
  button: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 16,
    fontSize: 16,
    padding: 5,
    margin: 5,
    width: "90%",

  },

  taskList: {
    flex: 2,
    paddingTop: 2
  },
  taskListItem: {
    padding: 16,
    border: 1,
    backgroundColor: "yellowgreen",
    borderRadius: 16,
    borderWidth: 2,
    margin: 8,
  },
  taskListItemTask: (done) => {
    return {
      fontSize: 12,
      textDecorationLine: done ? "line-through" : "none"
    };
  }
});
