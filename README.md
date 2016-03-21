# EatMash App
## Install Ionic
```bash
$ sudo npm install -g cordova ionic
```
### Install plugins
- cordova-plugin-geolocation  
https://github.com/apache/cordova-plugin-geolocation
```bash
$ cordova plugin add cordova-plugin-geolocation
```
- cordova-plugin-googlemaps  
https://github.com/mapsplugin/cordova-plugin-googlemaps  
(How to obtain API key: https://github.com/mapsplugin/cordova-plugin-googlemaps/wiki/Tutorial-for-Mac)
```bash
$ cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="YOUR_ANDROID_API_KEY_IS_HERE" --variable API_KEY_FOR_IOS="YOUR_IOS_API_KEY_IS_HERE"
```
## Setup
Install npm packages
```bash
$ npm install
```
Install bower packages
```bash
$ bower install
```
Install Android build set
```bash
$ ionic platform add android
```
## Run
Run on web for development
```bash
$ ionic serve --lab
```
Run on android emulator (Need to install AVD beforehand)
```bash
$ ionic run android
```
