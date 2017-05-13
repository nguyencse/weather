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

const scatteredclouds = require("./icons/white_cloud.png");
const clearsky = require("./icons/sunny.png");
const fewclouds = require("./icons/sunny_intervals.png");
const brokenclouds = require("./icons/thundery_showers.png");
const showerrain = require("./icons/heavy_rain_showers.png");
const rain = require("./icons/cloudy_with_light_rain.png");
const thunderstorm = require("./icons/thunderstorms.png");
const snow = require("./icons/cloudy_with_light_snow.png");
const mist = require("./icons/mist.png");
const temperature = require("./icons/temperature.png");

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
    let imageSouce = null;
    switch(decription){
      case 'clear sky' :
        imageSouce = clearsky
        break;

      case 'few clouds':
        imageSouce = fewclouds;
        break;

      case 'scattered clouds':
        imageSouce = scatteredclouds;
        break;

      case 'broken clouds':
        imageSouce = brokenclouds;
        break;

      case 'shower rain':
        imageSouce = showerrain;
        break;

      case 'rain':
        imageSouce = rain;
        break;

      case 'thunderstorm':
        imageSouce = thunderstorm;
        break;

      case 'snow':
        imageSouce = snow;
        break;

      case 'mist':
        imageSouce = mist
        break;
    }

    return (
        <View  key={decription} style={{flexDirection:'row',marginLeft:35}}>
          <Image style={{width:50,height:50}} source={imageSouce}/>
          <Text style={{fontSize:15,color:'white',marginTop:10}}>{decription}</Text>
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
            <Text style={styles.tempMax}>{this.state.coords && this.state.coords.main.temp_max}</Text>
            <Text style={styles.tempO}>o</Text>
            <Text style={styles.tempC}>C</Text>
          </View>

          <View style={styles.footerRight}>
            <Text style={styles.placeText}>Ho Chi Minh City</Text>
            <View style={styles.footer}>
              {this.state.coords && this.state.coords.weather.map((data)=>this._renderIconWeather(data.description))}
              <Image style={{width:50,height:50}} source={temperature}/>
              <Text style={{fontSize:15,color:'white',marginTop:10}}>{this.state.coords && this.state.coords.main.temp_min}</Text>
          </View>
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
    flexDirection:'row',
  },
  containerBody:{
    flex:1,
    margin:30,
    borderRadius:10,
    backgroundColor:'rgba(0,0,0,0.5)'
  },
  footerLeft:{
    flex:2,
    flexDirection:'row',
    marginLeft:30,
    marginTop:20
  },
  footerRight:{
    flex:3,
    marginRight:30,
    alignItems:'flex-end'
  },
  tempMax:{
    fontSize:35,
    color:'white',
    marginBottom:30
  },
  tempO:{
    fontSize:20,
    color:'white'
  },
  tempC:{
    fontSize:35,
    color:'white',
    marginBottom:30,
  },
  placeText:{
    fontSize:20,
    color:'white'
  }
})
