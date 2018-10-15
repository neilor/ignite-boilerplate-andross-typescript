/* eslint react/prop-types: 0 */
import * as React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {BottomTabBar} from 'react-navigation-tabs';
import Colors, {colorScheme, primaryColor} from '../Themes/Colors';
import {connect} from "react-redux";
import ChatsTab from './ChatsTabNavigator';
import SearchTab from '../Containers/MainTabs/SearchTab';
import ChannelsTab from '../Containers/MainTabs/ChannelsTab';
import LocationTab from '../Containers/MainTabs/LocationTab';
import SettingsTab from '../Containers/MainTabs/SettingsTab';
import Fonts from "../Themes/Fonts";
import { BottomNavigation } from 'react-native-paper';
import {Text} from "react-native";

const commonNavigationOptions = ({navigation}) => ({
  header: null,
  title: navigation.state.routeName,
});

const ChatsRouteOptions = {
  screen: ChatsTab,
  navigationOptions: commonNavigationOptions,
};
const SearchRouteOptions = {
  screen: SearchTab,
  navigationOptions: commonNavigationOptions,
};
const ChannelsRouteOptions = {
  screen: ChannelsTab,
  navigationOptions: commonNavigationOptions,
};
const LocationRouteOptions = {
  screen: LocationTab,
  navigationOptions: commonNavigationOptions,
};
const SettingsRouteOptions = {
  screen: SettingsTab,
  navigationOptions: commonNavigationOptions,
};

// different routes for all, active and completed todos
const tavNav = (props) => React.createElement(
  createMaterialBottomTabNavigator(

    {
      ['چت ها']: ChatsRouteOptions,
      ['جستجو']: SearchRouteOptions,
      ['کانال ها']: ChannelsRouteOptions,
      ['اطراف من']: LocationRouteOptions,
      ['تنظیمات']: SettingsRouteOptions

    },
    {
      navigationOptions: ({navigation,screenProps }) => ({
        tabBarIcon: ({focused}) => {
          const {routeName} = navigation.state;
          let iconName;
          switch (routeName) {
            case 'چت ها':
              iconName = 'chat';
              break;
            case 'جستجو':
              iconName = 'search';
              break;
            case 'کانال ها':
              iconName = 'volume-mute';
              break;
            case 'اطراف من':
              iconName = 'place';
              break;
            case  'تنظیمات':
              iconName = 'menu'
          }
          return (
            <MaterialIcons
              name={iconName}
              size={28}
              style={{marginBottom: 0}}
              color={focused ?
                primaryColor :
              //  props.colorScheme.fullToneText
                colorScheme(props.isDarkMode).fullToneText
              }
            />
          );
        }
      }),
      shifting: true,
      tabBarComponent: BottomNavigation,
      tabBarPosition: 'bottom',
      animationEnabled: true,
      swipeEnabled: true,
      tabBarOptions: {
        labelStyle: {
          fontSize: 10,
          fontFamily: Fonts.type.farsi,
          color:colorScheme(props.isDarkMode).fullToneText
        },
        style: {
          backgroundColor: colorScheme(props.isDarkMode).tabBarBackground
        },
      },
      labelStyle: {
        fontSize: 10,
        fontFamily: Fonts.type.farsi,
        color:colorScheme(props.isDarkMode).fullToneText
      },
      barStyle:{
        backgroundColor: colorScheme(props.isDarkMode).tabBarBackground
      },
    },
  )
);

const mapStateToProps = state => {
  return {
    isDarkMode: state.isDarkMode.isDarkMode
  };
};


export default connect(mapStateToProps)(tavNav);
