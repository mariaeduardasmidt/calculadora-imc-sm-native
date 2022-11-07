import React from 'react';
import { Text, SafeAreaView, ScrollView, View, TouchableOpacity, Image } from 'react-native';
import { Provider as PaperProvider, TextInput } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

import {styles} from "./styles";
import InfoCard from "./components/InfoCard";

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {altura: 0, massa: 0, resultado: 0, resultadoText: ""}
    this.calcular = this.calcular.bind(this)
  }

  calcular(){
    let imc = this.state.massa / (this.state.altura * this.state.altura)
    let s = this.state
    s.resultado = imc
  
    if (s.resultado <= 18.5) {
      s.resultadoText = 'Abaixo do peso'
    }
    else if (s.resultado >= 18.5 && s.resultado <= 24.9) {
      s.resultadoText = 'Normal'
    }
    else if (s.resultado >= 25 && s.resultado <= 29.9) {
      s.resultadoText = 'Sobrepeso'
    }
    else if (s.resultado >= 30 && s.resultado <= 34.9) {
      s.resultadoText = 'Obesidade grau I'
    }
    else if (s.resultado >= 35 && s.resultado <= 39.9) {
      s.resultadoText = 'Obesidade grau II'
    }
    else if (s.resultado >= 40) {
      s.resultadoText = 'Obesidade grau III'
    }
    this.setState(s)
  }

  render() {
    return (
      <PaperProvider>
        <View style={styles.container}>
        <View style={{ paddingHorizontal: 10, paddingBottom: 12 }}>
          <Text style={styles.listTitle}>
            Calculadora IMC
          </Text>
          <Text style={styles.listSubtitle}>
            Verifique seu nível de massa corporal, baseado em seu peso e altura.
          </Text>
        </View>
        
        <StatusBar style="auto" translucent={false} />
          <SafeAreaView style={{ padding: 10 }}>
            <ScrollView>
              <InfoCard
                style={{ backgroundColor: "#f2f2f2", borderRadius: 10 }}
              >
                <View style={{ flexDirection:'column' }}>
                  <TextInput
                    autoCapitalize="none"
                    placeholder="Informe a altura"
                    placeholderTextColor="#1F1E25"
                    keyboardType="numeric"
                    mode="outlined"
                    style={styles.input}
                    theme={{ colors: {primary: "#26A69A", underlineColor: 'transparent'} }}   
                    onChangeText={(altura)=>{this.setState({altura})}}
                  />
                  <TextInput
                    autoCapitalize="none"
                    placeholder="Informe o peso"
                    placeholderTextColor= "#1F1E25"
                    keyboardType="numeric"
                    mode="outlined"
                    style={{ ...styles.input, marginTop: 6 }}
                    theme={{ colors: {primary: "#26A69A", underlineColor: 'transparent'} }}
                    onChangeText={(massa)=>{this.setState({massa})}}
                  />
                </View>
                <TouchableOpacity 
                  style={styles.button} 
                  onPress={this.calcular}>
                    <Text style={styles.buttonText}>
                      Calcular
                    </Text>
                </TouchableOpacity>
                </InfoCard>
                <InfoCard
                  style={{ backgroundColor: "#f2f2f2", borderRadius: 10, marginTop: 16 }}
                >
                <Text style={styles.resultado}>
                  {this.state.resultado.toFixed(2)}
                </Text>
                <Text style={{ ...styles.resultado, fontSize: 20 }}>
                  IMC {this.state.resultadoText}
                </Text>
              </InfoCard>
              <InfoCard
                style={{ backgroundColor: "#f2f2f2", borderRadius: 10, marginTop: 20 }}>
                <Text> A classificação do índice de massa corporal (IMC) pode ajudar a identificar
                  problemas de obesidade ou desnutrição.
                </Text>
              </InfoCard>
              <Image
                style={{ alignSelf: "center", marginTop: 36 }}
                source={require('./assets/image.png')}
              />
            </ScrollView>
          </SafeAreaView>
        </View>
      </PaperProvider>
    );
  }
}