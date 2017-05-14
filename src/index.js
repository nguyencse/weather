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
const urlForecast = 'http://api.openweathermap.org/data/2.5/forecast/daily?'

const arrayDayOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

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

const icon_01d = require('./icons/01d.png')
const icon_01n = require('./icons/01n.png')
const icon_02d = require('./icons/02d.png')
const icon_02n = require('./icons/02n.png')
const icon_03d = require('./icons/03d.png')
const icon_03n = require('./icons/03n.png')
const icon_04d = require('./icons/04d.png')
const icon_04n = require('./icons/04n.png')
const icon_09d = require('./icons/09d.png')
const icon_09n = require('./icons/09n.png')
const icon_10d = require('./icons/10d.png')
const icon_10n = require('./icons/10n.png')
const icon_11d = require('./icons/11d.png')
const icon_11n = require('./icons/11n.png')
const icon_13d = require('./icons/13d.png')
const icon_13n = require('./icons/13n.png')
const icon_50d = require('./icons/50d.png')
const icon_50n = require('./icons/50n.png')

const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})

export default class WeatherIndex extends Component {
  constructor(props){
    super(props)
    arrayForecast = []

    optionGeo={
      enableHighAccuracy:true,
      timeout:10000,
      maximumAge:2000
    }

    this.state={
      location:null,
      coords:null,
      dataForecase:ds.cloneWithRows(arrayForecast)
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
      })
      .done()

      let urlLocationForecast = urlForecast + 'lat='+this.state.location.latitude+'&lon='+this.state.location.latitude+'&appid='+apiKey+'&units=metric&cnt=7'

      fetch(urlLocationForecast)
      .then((data)=>data.json())
      .then((dataJSON)=>{
        arrayForecast = dataJSON.list
        console.log(arrayForecast);
        this.setState({
          dataForecase:ds.cloneWithRows(arrayForecast)
        })
      })
      .done()
    }
  }

  _renderIconWeather(description){
    let imageSource = null
    switch(description){
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
        <View  key={description} style={{flexDirection:'row',alignItems:'center'}}>
        <Text style={{fontSize:15,color:'white',marginTop:10, marginLeft:10}}>{description}</Text>
          <Image style={{width:50,height:50}} source={imageSource}/>
        </View>
      )
  }

  _renderIconWeatherForecast(icon){
    let imageSource = null
    switch(icon){
      case '01d' :
        imageSource = icon_01d
        break
      case '01n':
        imageSource = icon_01n
        break
      case '02d':
        imageSource = icon_02d
        break
      case '02n':
        imageSource = icon_02n
        break
      case '03d':
        imageSource = icon_03d
        break
      case '04n':
        imageSource = icon_04n
        break
      case '04d':
        imageSource = icon_04d
        break
      case '09n':
        imageSource = icon_09n
        break
      case '09d':
        imageSource = icon_09d
        break
      case '10n':
        imageSource = icon_10n
        break
      case '10d':
        imageSource = icon_10d
        break
      case '11n':
        imageSource = icon_11n
        break
      case '11d':
        imageSource = icon_11d
        break
      case '13n':
        imageSource = icon_13n
        break
      case '13d':
        imageSource = icon_13d
        break
      case '50n':
        imageSource = icon_50n
        break
      case '50d':
        imageSource = icon_50d
        break
    }

    return (
        <Image key={icon} source={imageSource} style={{flex:1, width:50, height:50, resizeMode:'contain', justifyContent:'center',alignItems:'center'}}/>
    )
  }

  _renderRow(data){
    let date = new Date(data.dt * 1000)

    return(
      <View style={{flex:1, flexDirection:'row',justifyContent:'center',alignItems:'center',paddingLeft:10,paddingRight:10}}>
        <View style={{flex:1, justifyContent:'center',alignItems:'flex-end'}}>
          <Text style={{color:'white'}} key={data.dt}>{arrayDayOfWeek[date.getDay()]}</Text>
        </View>

        {this.state.coords && data.weather.map((item)=>this._renderIconWeatherForecast(item.icon))}

        <View style={{flex:1, flexDirection:'row',alignItems:'center'}}>
          <Text style={{color:'white'}}>25</Text>
          <Text style={{color:'white'}}>o</Text>
          <Text style={{color:'white'}}>C</Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <Image style={styles.container} source={backgroundImage} resizeMode={'cover'}>
        <StatusBar hidden={true} />

        <View style={styles.body}>
          <View style={styles.containerBody}>
            <ListView
              dataSource={this.state.dataForecase}
              renderRow={this._renderRow.bind(this)}
              enableEmptySections={true}
              renderSeparator={(sectionID,rowID)=><View style={{flex:1,height:1,backgroundColor:'rgba(0,0,0,0.2)'}}></View>}
              style={{paddingTop:10}}
            />
            <Text style={{color:'white',fontSize:20, alignSelf:'center',marginBottom:20}}>Weather Forecast</Text>
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
    backgroundColor:'rgba(0,0,0,0.5)',
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
