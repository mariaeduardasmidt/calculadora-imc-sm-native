import React from 'react';
import { Text, SafeAreaView, ScrollView, View, TouchableOpacity, Image } from 'react-native';
import { Provider as PaperProvider, TextInput } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

import {styles} from "./styles";
import InfoCard from "./components/InfoCard";

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {height: 0, weight: 0, result: 0, resultLabel: ""}
    this.Calculate = this.Calculate.bind(this)
  }

  Calculate(){
    let imc = this.state.weight / (this.state.height * this.state.height)
    let s = this.state
    s.result = imc
  
    if (s.result <= 18.5) {
      s.resultLabel = 'Abaixo do peso'
    }
    else if (s.result >= 18.5 && s.result <= 24.9) {
      s.resultLabel = 'Normal'
    }
    else if (s.result >= 25 && s.result <= 29.9) {
      s.resultLabel = 'Sobrepeso'
    }
    else if (s.result >= 30 && s.result <= 34.9) {
      s.resultLabel = 'Obesidade grau I'
    }
    else if (s.result >= 35 && s.result <= 39.9) {
      s.resultLabel = 'Obesidade grau II'
    }
    else if (s.result >= 40) {
      s.resultLabel = 'Obesidade grau III'
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
                    onChangeText={(height)=>{this.setState({height})}}
                  />
                  <TextInput
                    autoCapitalize="none"
                    placeholder="Informe o peso"
                    placeholderTextColor= "#1F1E25"
                    keyboardType="numeric"
                    mode="outlined"
                    style={{ ...styles.input, marginTop: 6 }}
                    theme={{ colors: {primary: "#26A69A", underlineColor: 'transparent'} }}
                    onChangeText={(weight)=>{this.setState({weight})}}
                  />
                </View>
                <TouchableOpacity 
                  style={styles.button} 
                  onPress={this.Calculate}>
                    <Text style={styles.buttonText}>
                      Calcular
                    </Text>
                </TouchableOpacity>
                </InfoCard>
                <InfoCard
                  style={{ backgroundColor: "#f2f2f2", borderRadius: 10, marginTop: 16 }}
                >
                <Text style={styles.result}>
                  {this.state.result.toFixed(2)}
                </Text>
                <Text style={{ ...styles.result, fontSize: 20 }}>
                  IMC {this.state.resultLabel}
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