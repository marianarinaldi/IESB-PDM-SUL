import { Button, StyleSheet, TextInput, View } from 'react-native';
import { rotulo_input_meta, rotulo_btn_cadastro } from '../mensagens';
import { useState } from 'react'

function MetaInput(props){

    const [inputMetaText, setInputMetaText] = useState('');
    function metaInputHandler(inputText){
        setInputMetaText(inputText)
    };

    function addMetaHandler(){
        props.onAddMeta(inputMetaText);
        setInputMetaText('')
    }

    return(
        <View style={{flexDirection:'row',
                    justifyContent:'space-between',
                    flex:1}}>
            <View style={{width:'65%'}}>
                <TextInput style={styles.inputText} 
                placeholder={rotulo_input_meta}
                onChangeText={metaInputHandler}
                value={inputMetaText}/>
            </View>
            <View style={{width:'30%'}}>
                <Button title={rotulo_btn_cadastro}
                onPress={addMetaHandler}/>
            </View>
        </View>
    )

}

export default MetaInput;

const styles = StyleSheet.create({
    inputText:{
        borderColor: '#ccccc',
        borderWidth: 1
    },
})