// Imports: Dependencies
import React, { Component } from 'react';
import { Button, Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

// Imports: Redux Actions
import { getInfo, addExercise, updateSessionType } from '../redux/actions/treatmentAction';

// Screen Dimensions
const { height, width } = Dimensions.get('window');

class Home extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>

        <View style={styles.buttonContainer}>
          <Button
            title="Get Info"
            onPress={() => this.props.getInfo()}
            style={styles.loginButton}
          />
          <Button
            title="Create Exercise"
            onPress={() => this.props.addExercise()}
            style={styles.loginButton}
          />
          <Button
            title="Update Schedule"
            onPress={() => this.props.updateSessionType()}
            style={styles.loginButton}
          />
        </View>

       
        <View style={styles.textContainer}>

          {JSON.parse(this.props.exercises).map((exe, i) => {     
            // console.log("Entered");                 
            // Return the element. Also pass key     
            return (<Text key={i} style={styles.counterText}>{exe}{'\n'}</Text>);
          })}

          <Text style={styles.counterText}>{this.props.exercises}</Text>
          <Text style={styles.counterText}>{this.props.sessionType}</Text>
        </View>

      </SafeAreaView>
    )
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  loginButton: {
    marginTop: 20,
    paddingTop: 20,
  },
  textContainer: {
    flex: 5,
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    margin: 20
  },
  counterText: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
  },
  buttonText: {
    fontFamily: 'System',
    fontSize: 50,
    fontWeight: '300',
    color: '#007AFF',
    marginLeft: 40,
    marginRight: 40,
  },
});

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    sessionType: state.treatmentReducer.sessionType,
    exercises: state.treatmentReducer.exercises,
    // counter: state.counterReducer.counter,
    // loggedIn: state.authReducer.loggedIn,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
    return {
      getInfo: () => dispatch(getInfo()),
      addExercise: () => dispatch(addExercise()),
      updateSessionType: () => dispatch(updateSessionType()),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Home);