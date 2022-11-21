import React from 'react';
import { Text, SafeAreaView, ScrollView, View, TouchableOpacity, Image } from 'react-native';
import { Provider as PaperProvider, TextInput } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from "./styles";
import InfoCard from "./components/InfoCard";

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = { height: 0, weight: 0, result: 0, resultLabel: "" }
    this.Calculate = this.Calculate.bind(this)
  }

  async Calculate() {
    let imc = this.state.weight / (this.state.height * this.state.height)
    let result = imc
    let resultLabel = ''

    if (result <= 18.5) {
      resultLabel = 'Abaixo do peso'
    }
    else if (result >= 18.5 && result <= 24.9) {
      resultLabel = 'Normal'
    }
    else if (result >= 25 && result <= 29.9) {
      resultLabel = 'Sobrepeso'
    }
    else if (result >= 30 && result <= 34.9) {
      resultLabel = 'Obesidade grau I'
    }
    else if (result >= 35 && result <= 39.9) {
      resultLabel = 'Obesidade grau II'
    }
    else if (result >= 40) {
      resultLabel = 'Obesidade grau III'
    }
    this.setState({
      ...this.state,
      result,
      resultLabel,
    })
    await this.SaveToAsyncStorage({ result, resultLabel, weight: this.state.weight, height: this.state.height })
  }

  async SaveToAsyncStorage({ result, resultLabel, weight, height }) {
    await AsyncStorage.setItem('@async', JSON.stringify({ result: result.toFixed(2), resultLabel, weight, height }))
    this.setState({
      cache: {
        result: result.toFixed(2), resultLabel, weight, height
      }
    })
  }

  async GetFromAsyncStorage() {
    const data = await AsyncStorage.getItem('@async')
    if (data) this.setState({ cache: JSON.parse(data) })
  }

  componentDidMount(){
    this.GetFromAsyncStorage()
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
                <View style={{ flexDirection: 'column' }}>
                  <TextInput
                    autoCapitalize="none"
                    placeholder="Informe a altura"
                    placeholderTextColor="#1F1E25"
                    keyboardType="numeric"
                    mode="outlined"
                    style={styles.input}
                    theme={{ colors: { primary: "#26A69A", underlineColor: 'transparent' } }}
                    onChangeText={(height) => { this.setState({ height }) }}
                  />
                  <TextInput
                    autoCapitalize="none"
                    placeholder="Informe o peso"
                    placeholderTextColor="#1F1E25"
                    keyboardType="numeric"
                    mode="outlined"
                    style={{ ...styles.input, marginTop: 6 }}
                    theme={{ colors: { primary: "#26A69A", underlineColor: 'transparent' } }}
                    onChangeText={(weight) => { this.setState({ weight }) }}
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
              <InfoCard style={{ backgroundColor: "#f2f2f2", borderRadius: 10, marginTop: 20 }}>
                <Text style={styles.result}>
                  {this.state.result.toFixed(2)}
                </Text>
                <Text style={{ ...styles.result, fontSize: 16 }}>
                  IMC {this.state.resultLabel}
                </Text>
              </InfoCard>
              {this.state.cache &&
                <InfoCard style={{ backgroundColor: "#f2f2f2", borderRadius: 10, marginTop: 20 }}>
                  <Text>Confira seu último resultado IMC, de acordo com o último registro de peso e altura.</Text>
                </InfoCard>
              }
              {this.state.cache && 
                <InfoCard style={{ backgroundColor: "#f2f2f2", borderRadius: 10, marginTop: 20 }}>
                  <Text style={styles.resultAsync}>
                    IMC: {this.state.cache.result}
                  </Text>
                  <Text style={styles.resultAsync}>
                    Altura: {this.state.cache.height}  Peso: {this.state.cache.weight}
                  </Text>
                  <Text style={styles.resultAsync}>
                    Tipo de IMC: {this.state.cache.resultLabel}
                  </Text>
                </InfoCard>
              }
            </ScrollView>
          </SafeAreaView>
        </View>
      </PaperProvider>
    );
  }
}