# EatMash App
## Install Ionic
```bash
$ sudo npm install -g cordova ionic
```
You might have to install geolocation plugin for cordova if you don't have.  
https://github.com/apache/cordova-plugin-geolocation
```bash
$ cordova plugin add cordova-plugin-geolocation
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
