import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { rotulo_input_meta, rotulo_lista_metas, rotulo_btn_cadastro } from './mensagens';

export default function App() {
  return (
    <View style={styles.mainContainer}>
     <TextInput placeholder={rotulo_input_meta}/>
     <Button title={rotulo_btn_cadastro}/>
     <Text>{rotulo_lista_metas}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    padding: 30
  }
});
