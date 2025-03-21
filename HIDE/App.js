import React, { useState } from "react";
 import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
 
 export default function App() {
 const [enteredGoalText, setEnteredGoalText] = useState("");
 const [courseGoals, setCourseGoals] = useState([]);
 const [editingIndex, setEditingIndex] = useState(null);
 
 const goalInputHandler = (enteredText) => {
 setEnteredGoalText(enteredText);
 };
 
 const addGoalHandler = () => {
 if (enteredGoalText.trim() === "") return;
 
 if (editingIndex !== null) {
 const updatedGoals = [...courseGoals];
 updatedGoals[editingIndex] = {
 ...updatedGoals[editingIndex],
 text: enteredGoalText,
 };
 setCourseGoals(updatedGoals);
 setEditingIndex(null);
 } else {
 setCourseGoals((currentGoals) => [
 ...currentGoals,
 { text: enteredGoalText, id: Math.random().toString(), hidden: false },
 ]);
 }
 setEnteredGoalText("");
 };
 
 const deleteGoalHandler = (index) => {
 const updatedGoals = [...courseGoals];
 updatedGoals.splice(index, 1);
 setCourseGoals(updatedGoals);
 if (editingIndex === index) setEditingIndex(null);
 };
 
 const toggleHideGoal = (index) => {
 const updatedGoals = [...courseGoals];
 updatedGoals[index] = {
 ...updatedGoals[index],
 hidden: !updatedGoals[index].hidden,
 };
 setCourseGoals(updatedGoals);
 };
 
 const startEditingHandler = (index) => {
 setEnteredGoalText(courseGoals[index].text);
 setEditingIndex(index);
 };
 
 return (
 <View style={styles.container}>
 <View style={styles.inputContainer}>
 <TextInput
 value={enteredGoalText}
 placeholder="My Goal"
 style={styles.input}
 onChangeText={goalInputHandler}
 />
 <Button
 title={editingIndex !== null ? "Edit Goal" : "Add Goal"}
 onPress={addGoalHandler}
 />
 </View>
 
 <FlatList
 data={courseGoals}
 renderItem={({ item, index }) => (
 <View style={styles.goalItem}>
 {!item.hidden && <Text style={styles.goalText}>{item.text}</Text>}
 
 <TouchableOpacity onPress={() => deleteGoalHandler(index)} style={styles.deleteButton}>
 <Text style={styles.buttonText}>X</Text>
 </TouchableOpacity>
 
 <TouchableOpacity onPress={() => startEditingHandler(index)} style={styles.editButton}>
 <Text style={styles.buttonText}>EDIT</Text>
 </TouchableOpacity>
 
 <TouchableOpacity onPress={() => toggleHideGoal(index)} style={styles.editButton}>
 <Text style={styles.buttonText}>{item.hidden ? "SHOW" : "HIDE"}</Text>
 </TouchableOpacity>
 </View>
 )}
 keyExtractor={(item) => item.id}
 />
 </View>
 );
 }
 
 const styles = StyleSheet.create({
 container: {
 flex: 1,
 padding: 25,
 backgroundColor: "#e3e991",
 },
 inputContainer: {
 flexDirection: "row",
 justifyContent: "space-between",
 alignItems: "center",
 marginBottom: 20,
 },
 input: {
 flex: 1,
 borderBottomWidth: 1,
 borderColor: "#ccc",
 marginRight: 10,
 padding: 10,
 },
 goalItem: {
 flexDirection: "row",
 justifyContent: "space-between",
 alignItems: "center",
 backgroundColor: "#00BFFF",
 padding: 10,
 marginVertical: 5,
 borderRadius: 5,
 },
 goalText: {
 flex: 1,
 color: "#333",
 },
 deleteButton: {
 backgroundColor: "#ff5252",
 padding: 8,
 borderRadius: 5,
 marginRight: 5,
 },
 editButton: {
 backgroundColor: "#00BFFF",
 padding: 8,
 borderRadius: 5,
 },
 buttonText: {
 color: "#fff",
 fontWeight: "bold",
 },
 });