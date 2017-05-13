import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image
} from 'react-native';

const apiKey = '57bb3d115200197085a58518294d49c2'
const url = 'http://api.openweathermap.org/data/2.5/weather?'
const backgroundImage = require('./icons/giphy.gif')

export default class WeatherIndex extends Component {
  constructor(props){
    super(props)
    optionGeo={
      enableHighAccuracy:true,
      timeout:10000,
      maximumAge:1000
    }
    this.state={
      location:null
    }
  }

  componentWillMount(){
    navigator.geolocation.getCurrentPosition(this._getLocation.bind(this), (error)=>console.log(error.message), optionGeo)
  }

  _getLocation(dataLocation){
    this.setState({location:dataLocation.coords})

    if(this.state.location !== null){
      let urlLocation = url + 'lat='+this.state.location.latitude+'&lon='+this.state.location.latitude+'&appid='+apiKey+'&units=metric'

      fetch(urlLocation).
      then((data)=>data.json())
      .then((data)=>console.log(data))
      .done()
    }
  }

  render() {
    return (
      <Image style={styles.container} source={backgroundImage} resizeMode={'cover'}>
        <StatusBar hidden={true} />

        <View style={styles.body}>
          <View style={styles.containerBody}>

          </View>
        </View>

        <View style={styles.footer}>

        </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    width:null,
    height:null
  },
  body:{
    flex:3
  },
  footer:{
    flex:1,
    flexDirection:'row',
  },
  containerBody:{
    flex:1,
    margin:30,
    borderRadius:10,
    backgroundColor:'rgba(0,0,0,0.5)'
  }
})
