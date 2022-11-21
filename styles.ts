import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 24
  },
  result: {
    alignSelf: "center",
    color: "#1F1E25",
    fontSize: 30,
    fontWeight: 'bold',
    padding: 6
  },
  resultAsync:{
    color: "#1F1E25",
    fontSize: 18,
    padding: 6
  },
  listTitle: {
    color: '#26A69A',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 6
  },
  listSubtitle: {
    color: '#1F1E25',
    fontSize: 16
  },
  input: {
    fontSize: 18,
    backgroundColor: "#f0f0f0"
  },
  button: {
    marginTop: 16,
    backgroundColor: "#26A69A",
    borderRadius: 10
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    padding: 10,
    color: "#ffffff"
  }
})