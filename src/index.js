import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  ListView
} from 'react-native';

const apiKey = '57bb3d115200197085a58518294d49c2'
const url = 'http://api.openweathermap.org/data/2.5/weather?'
const backgroundImage = require('./icons/giphy.gif')

const scatteredclouds = require("./icons/white_cloud.png")
const clearsky = require("./icons/sunny.png")
const fewclouds = require("./icons/sunny_intervals.png")
const brokenclouds = require("./icons/thundery_showers.png")
const showerrain = require("./icons/heavy_rain_showers.png")
const rain = require("./icons/cloudy_with_light_rain.png")
const thunderstorm = require("./icons/thunderstorms.png")
const snow = require("./icons/cloudy_with_light_snow.png")
const mist = require("./icons/mist.png")

export default class WeatherIndex extends Component {
  constructor(props){
    super(props)
    optionGeo={
      enableHighAccuracy:true,
      timeout:10000,
      maximumAge:2000
    }
    this.state={
      location:null,
      coords:null
    }
  }

  componentWillMount(){
    navigator.geolocation.getCurrentPosition(this._getLocation.bind(this), (error)=>alert(error.message), optionGeo)
  }

  _getLocation(dataLocation){
    this.setState({location:dataLocation.coords})

    if(this.state.location !== null){
      let urlLocation = url + 'lat='+this.state.location.latitude+'&lon='+this.state.location.latitude+'&appid='+apiKey+'&units=metric'

      fetch(urlLocation).
      then((data)=>data.json())
      .then((dataJSON)=>{
        this.setState({coords:dataJSON})
        console.log(dataJSON)
      })
      .done()
    }
  }

  _renderIconWeather(decription){
    let imageSource = null
    switch(decription){
      case 'clear sky' :
        imageSource = clearsky
        break

      case 'few clouds':
        imageSource = fewclouds
        break

      case 'scattered clouds':
        imageSource = scatteredclouds
        break

      case 'broken clouds':
        imageSource = brokenclouds
        break;

      case 'shower rain':
        imageSource = showerrain
        break

      case 'rain':
        imageSource = rain
        break;

      case 'thunderstorm':
        imageSource = thunderstorm
        break

      case 'snow':
        imageSource = snow
        break

      case 'mist':
        imageSource = mist
        break
    }

    return (
        <View  key={decription} style={{flexDirection:'row',alignItems:'center'}}>
        <Text style={{fontSize:15,color:'white',marginTop:10, marginLeft:10}}>{decription}</Text>
          <Image style={{width:50,height:50}} source={imageSource}/>
        </View>
      )
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
          <View style={styles.footerLeft}>
            <View style={styles.temp}>
              <Text style={styles.tempMax}>{this.state.coords && this.state.coords.main.temp_max}</Text>
              <Text style={styles.tempOMax}>o</Text>
              <Text style={styles.tempCMax}>C</Text>
            </View>

            <View style={styles.temp}>
              <Text style={styles.tempMin}>{this.state.coords && this.state.coords.main.temp_min}</Text>
              <Text style={styles.tempOMin}>o</Text>
              <Text style={styles.tempCMin}>C</Text>
            </View>
          </View>

          <View style={styles.footerRight}>
            <Text style={styles.placeText}>{this.state.coords && this.state.coords.name}</Text>
            {this.state.coords && this.state.coords.weather.map((item)=>this._renderIconWeather(item.description))}
          </View>
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
    flexDirection:'row'
  },
  containerBody:{
    flex:1,
    marginLeft:30,
    marginRight:30,
    marginTop:30,
    marginBottom:10,
    borderRadius:10,
    backgroundColor:'rgba(0,0,0,0.5)'
  },
  footerLeft:{
    flex:2,
    marginLeft:30,
    justifyContent:'center'
  },
  footerRight:{
    flex:3,
    marginRight:30,
    alignItems:'flex-end',
    justifyContent:'center'
  },
  temp:{
    flexDirection:'row'
  },
  tempMax:{
    fontSize:40,
    color:'white'
  },
  tempOMax:{
    fontSize:25,
    color:'white'
  },
  tempCMax:{
    fontSize:40,
    color:'white'
  },
  tempMin:{
    fontSize:20,
    color:'white',
    marginBottom:30
  },
  tempOMin:{
    fontSize:10,
    color:'white'
  },
  tempCMin:{
    fontSize:20,
    color:'white',
    marginBottom:30,
  },
  placeText:{
    fontSize:20,
    color:'white'
  }
})
