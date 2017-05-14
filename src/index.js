import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  ListView
} from 'react-native'
import styles from './styles'

const apiKey = '57bb3d115200197085a58518294d49c2'
const url = 'http://api.openweathermap.org/data/2.5/weather?'
const urlForecast = 'http://api.openweathermap.org/data/2.5/forecast/daily?'

const arrayDayOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

const backgroundImage = require('./icons/giphy.gif')

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

    this.state={
      location:null,
      coords:null,
      dataForecase:ds.cloneWithRows(arrayForecast)
    }
  }

  componentWillMount(){
    navigator.geolocation.getCurrentPosition(this._getLocation.bind(this), (error)=>alert(error.message))
  }

  _getLocation(dataLocation){
    this.setState({location:dataLocation.coords})

    if(this.state.location !== null){
      let urlLocation = url + 'lat='+this.state.location.latitude+'&lon='+this.state.location.longitude+'&appid='+apiKey+'&units=metric'

      fetch(urlLocation).
      then((data)=>data.json())
      .then((dataJSON)=>{
        console.log(urlLocation)
        this.setState({coords:dataJSON})
      })
      .done()

      let urlLocationForecast = urlForecast + 'lat='+this.state.location.latitude+'&lon='+this.state.location.longitude+'&appid='+apiKey+'&units=metric&cnt=7'

      fetch(urlLocationForecast)
      .then((data)=>data.json())
      .then((dataJSON)=>{
        arrayForecast = dataJSON.list
        this.setState({
          dataForecase:ds.cloneWithRows(arrayForecast)
        })
      })
      .done()
    }
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
      case '03n':
        imageSource = icon_03n
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
        <Image key={icon} source={imageSource} style={{width:50, height:50, resizeMode:'contain', justifyContent:'center',alignItems:'center'}}/>
    )
  }

  _renderRow(data){
    let date = new Date(data.dt * 1000)

    return(
      <View style={{flex:1, flexDirection:'row',justifyContent:'center',alignItems:'center',paddingLeft:10,paddingRight:10}}>
        <View style={{flex:1, justifyContent:'center',alignItems:'flex-end',paddingRight:10}}>
          <Text style={{color:'white'}} key={data.dt}>{arrayDayOfWeek[date.getDay()]}</Text>
        </View>

        {data.weather.map((item)=>this._renderIconWeatherForecast(item.icon))}

        <View style={{flex:1, flexDirection:'row',alignItems:'center',paddingLeft:10}}>
          <Text style={{color:'white'}}>{data.temp.day}</Text>
          <Text style={{color:'white',fontSize:8,alignSelf:'flex-start'}}>o</Text>
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
            <Text style={{color:'white',fontSize:20, alignSelf:'center',marginBottom:20}}>WEATHER FORECAST</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <View style={styles.temp}>
              <Text style={styles.tempMax}>{this.state.coords && this.state.coords.main.temp}</Text>
              <Text style={styles.tempOMax}>o</Text>
              <Text style={styles.tempCMax}>C</Text>
            </View>

            <View style={styles.temp}>
              <Text style={styles.tempMin}>{this.state.coords && this.state.coords.main.humidity}</Text>
              <Text style={styles.tempMinPercent}>%</Text>
            </View>
          </View>

          <View style={styles.footerRight}>
            <Text style={styles.placeText}>{this.state.coords && this.state.coords.name}</Text>
            <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',marginBottom:30}}>
              {this.state.coords && this.state.coords.weather.map((item)=>this._renderIconWeatherForecast(item.icon))}
              <Text style={{fontSize:15,color:'white',marginLeft:10}}>{this.state.coords && this.state.coords.weather.map((item)=>item.description)}</Text>
            </View>
          </View>
        </View>
      </Image>
    );
  }
}
