import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  ListView,
  TouchableOpacity
} from 'react-native'
import styles from '../styles'
import {MessageBar,MessageBarManager} from 'react-native-message-bar'
import PopupDialog,{DialogTitle,SlideAnimation} from 'react-native-popup-dialog'

const apiKey = '57bb3d115200197085a58518294d49c2'
const url = 'http://api.openweathermap.org/data/2.5/weather?'
const urlForecast = 'http://api.openweathermap.org/data/2.5/forecast/daily?'
const urlAvatarFB = 'https://goo.gl/lahzKC'

const arrayDayOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

const backgroundImage = require('../icons/giphy.gif')

const icon_01d = require('../icons/01d.png')
const icon_01n = require('../icons/01n.png')
const icon_02d = require('../icons/02d.png')
const icon_02n = require('../icons/02n.png')
const icon_03d = require('../icons/03d.png')
const icon_03n = require('../icons/03n.png')
const icon_04d = require('../icons/04d.png')
const icon_04n = require('../icons/04n.png')
const icon_09d = require('../icons/09d.png')
const icon_09n = require('../icons/09n.png')
const icon_10d = require('../icons/10d.png')
const icon_10n = require('../icons/10n.png')
const icon_11d = require('../icons/11d.png')
const icon_11n = require('../icons/11n.png')
const icon_13d = require('../icons/13d.png')
const icon_13n = require('../icons/13n.png')
const icon_50d = require('../icons/50d.png')
const icon_50n = require('../icons/50n.png')

const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})

export default class WeatherIndex extends Component {
  constructor(props){
    super(props)
    arrayForecast = []

    this.state={
      location:null,
      coords:null,
      details:null,
      dataForecast:ds.cloneWithRows(arrayForecast)
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
        this.setState({coords:dataJSON})
      })
      .done()

      let urlLocationForecast = urlForecast + 'lat='+this.state.location.latitude+'&lon='+this.state.location.longitude+'&appid='+apiKey+'&units=metric&cnt=7'

      fetch(urlLocationForecast)
      .then((data)=>data.json())
      .then((dataJSON)=>{
        arrayForecast = dataJSON.list
        console.log(urlLocationForecast)
        this.setState({
          dataForecast:ds.cloneWithRows(arrayForecast)
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

  _welcome(){
    MessageBarManager.showAlert({
      avatar:urlAvatarFB,
      message: "Welcome to Weather Forecast!",
      alertType:'info',
      messageStyle:{color:'black'},
      stylesheetInfo:{backgroundColor:'rgba(255,255,255,0.8)'}
    })
  }

  _showForecastDetail(dataRow){
    this.setState({details:dataRow},()=>this.popupDialog.show())
  }

  _renderRow(dataRow){
    let date = new Date(dataRow.dt * 1000)

    return(
        <TouchableOpacity onPress={(evt)=>this._showForecastDetail(dataRow)}>
          <View style={{flex:1, flexDirection:'row',justifyContent:'center',alignItems:'center',paddingLeft:10,paddingRight:10}}>
            <View style={{flex:1, justifyContent:'center',alignItems:'flex-end',paddingRight:10}}>
              <Text style={{color:'white'}} key={dataRow.dt}>{arrayDayOfWeek[date.getDay()]}</Text>
            </View>

            {dataRow.weather.map((item)=>this._renderIconWeatherForecast(item.icon))}

            <View style={{flex:1, flexDirection:'row',alignItems:'center',paddingLeft:10}}>
              <Text style={{color:'white'}}>{dataRow.temp.day}</Text>
              <Text style={{color:'white',fontSize:8,alignSelf:'flex-start'}}>o</Text>
              <Text style={{color:'white'}}>C</Text>
            </View>
          </View>
        </TouchableOpacity>
    )
  }

  render() {
    console.ignoredYellowBox = ['Warning: BackAndroid']
    if(!this.state.details){
      return (
        <Image style={styles.container} source={backgroundImage} resizeMode={'cover'}>
          <StatusBar hidden={true} />
          {this._welcome()}

          <View style={styles.body}>
            <View style={styles.containerBody}>
              <ListView
                dataSource={this.state.dataForecast}
                renderRow={this._renderRow.bind(this)}
                enableEmptySections={true}
                renderSeparator={(sectionID,rowID)=><View style={{flex:1,height:1,backgroundColor:'rgba(0,0,0,0.2)'}}></View>}
                style={{paddingTop:10}}/>
              <Text style={{color:'white',fontSize:20, alignSelf:'center',marginBottom:20,marginTop:20}}>WEATHER FORECAST</Text>
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
              <View style={{flexDirection:'row'}}>
                {this.state.coords && this.state.coords.weather.map((item)=>this._renderIconWeatherForecast(item.icon))}
              </View>
              <View style={{alignItems:'flex-end'}}>
                <Text style={{fontSize:15,color:'white'}}>{this.state.coords && this.state.coords.weather.map((item)=>item.description)}</Text>
              </View>
            </View>
          </View>

          <PopupDialog
            ref={(popupDialog)=>{this.popupDialog=popupDialog}}
            dialogTitle={<DialogTitle title={'Weather Forecast'} titleTextStyle={{color:'white'}} haveTitleBar={true} titleStyle={{backgroundColor:'gray'}}/>}
            dialogAnimation={new SlideAnimation({slideFrom:'bottom'})}
            width={0.8}>
            <View style={{flex:1}}>
              <Text>{this.state.details&&this.state.details}</Text>
            </View>
          </PopupDialog>

          <MessageBar ref='alert'/>
        </Image>
      )
    }else{
      return (
        <Image style={styles.container} source={backgroundImage} resizeMode={'cover'}>
          <StatusBar hidden={true} />

          <View style={styles.body}>
            <View style={styles.containerBody}>
              <ListView
                dataSource={this.state.dataForecast}
                renderRow={this._renderRow.bind(this)}
                enableEmptySections={true}
                renderSeparator={(sectionID,rowID)=><View style={{flex:1,height:1,backgroundColor:'rgba(0,0,0,0.2)'}}></View>}
                style={{paddingTop:10}}/>
              <Text style={{color:'white',fontSize:20, alignSelf:'center',marginBottom:20,marginTop:20}}>WEATHER FORECAST</Text>
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
              <View style={{flexDirection:'row'}}>
                {this.state.coords && this.state.coords.weather.map((item)=>this._renderIconWeatherForecast(item.icon))}
              </View>
              <View style={{alignItems:'flex-end'}}>
                <Text style={{fontSize:15,color:'white'}}>{this.state.coords && this.state.coords.weather.map((item)=>item.description)}</Text>
              </View>
            </View>
          </View>

          <PopupDialog
            ref={(popupDialog)=>{this.popupDialog=popupDialog}}
            dialogTitle={<DialogTitle title={new Date(this.state.details.dt*1000).toDateString()} titleTextStyle={{color:'white'}} haveTitleBar={true} titleStyle={{backgroundColor:'rgba(11,60,186,0.7)'}}/>}
            dialogAnimation={new SlideAnimation({slideFrom:'bottom'})}
            width={0.83}
            height={0.6}>
            <View style={{flex:1}}>

              <View style={{flexDirection:'row',justifyContent:'center',alignItems:'flex-start'}}>
                <Text style={{fontSize:40}}>{this.state.details.temp.day}</Text>
                <Text style={{fontSize:25}}>o</Text>
                <Text style={{fontSize:40}}>C</Text>
              </View>

              <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                <View style={{flex:1,marginRight:20,alignItems:'flex-end'}}>
                  <Text style={{color:'rgba(11,60,186,0.7)'}}>Min</Text>
                  <Text>{this.state.details.temp.min}</Text>
                </View>
                <View style={{flex:1,marginLeft:20,alignItems:'flex-start'}}>
                  <Text style={{color:'rgba(11,60,186,0.7)'}}>Max</Text>
                  <Text>{this.state.details.temp.max}</Text>
                </View>
              </View>

              <View style={{flex:7,marginTop:20}}>
                <View style={{flexDirection:'row',justifyContent:'center'}}>
                  <View style={{flex:1,alignItems:'center'}}>
                    <Text style={{color:'rgba(11,60,186,0.7)'}}>Morning</Text>
                    <Text>{this.state.details.temp.morn}</Text>
                  </View>
                  <View style={{flex:1,alignItems:'center'}}>
                    <Text style={{color:'rgba(11,60,186,0.7)'}}>Evening</Text>
                    <Text>{this.state.details.temp.eve}</Text>
                  </View>
                  <View style={{flex:1,alignItems:'center'}}>
                    <Text style={{color:'rgba(11,60,186,0.7)'}}>Night</Text>
                    <Text>{this.state.details.temp.night}</Text>
                  </View>
                </View>

                <View style={{flex:3,justifyContent:'center',alignItems:'center',marginTop:10}}>
                  <Text style={{fontSize:20,color:'rgba(11,60,186,0.7)'}}>Humidity</Text>
                  <View style={{flex:1,flexDirection:'row'}}>
                    <Text style={{fontSize:40}}>{this.state.details.humidity}</Text>
                    <Text style={{fontSize:40}}>%</Text>
                  </View>
                </View>

                <View style={{flex:4,justifyContent:'center',alignItems:'center'}}>
                  <View style={{flexDirection:'row'}}>
                    {this.state.details.weather.map((item)=>this._renderIconWeatherForecast(item.icon))}
                  </View>
                  <Text style={{flex:1}}>{this.state.details.weather.map((item)=>item.description)}</Text>
                </View>
              </View>
            </View>
          </PopupDialog>
        </Image>
      )
    }
  }

  componentDidMount(){
    MessageBarManager.registerMessageBar(this.refs.alert)
  }

  componentWillUnMount(){
    MessageBarManager.unregisterMessageBar()
  }
}
