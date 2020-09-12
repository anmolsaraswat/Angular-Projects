# SURVEY SURFER(ADMIN PANEL)

Through admin panel of this survey app you can visualize the responses given by the users for a particular survey.

This is an ionic project for quiz application. You need to have Cordova and Ionic 3.20.0 installed on the 
system to run it successfully

## Using this project

You must have cordova installed prior to this.

```
    $ npm install -g cordova
```


```
    $ npm install -g ionic
```

NOTE: Don’t install the latest ionic. Latest version of Ionic is totally different from 3.20.0


## Installation of this project

* Extract the zip file you received after purchase

* Install npm dependecies

```
    $ npm install
```

* Install Resources

```
    $ ionic cordova resources
```

* Add Platform (whichever required)

```
    $ ionic cordova platform add android
    $ ionic cordova platform add ios
```
in few cases, you might need to install the latest platform
```
    $ ionic cordova platform add android@latest
    $ ionic cordova platform add ios@latest
```

* Install Plugins (whichever required)

```
    $ ionic cordova plugin add YOUR_PLUGIN_NAME
```

* Initialize the new git
    ```git init```

* Setup the new git remotes accordingly
    ```git remote add origin new remote```


## Plugins List

```
    "cordova-plugin-device",
    "cordova-plugin-splashscreen",
    "cordova-plugin-ionic-webview",
    "cordova-plugin-ionic-keyboard",
	"cordova-plugin-camera"
	"cordova-plugin-file"
	"cordova-plugin-file-transfer"
	"cordova-plugin-filepath"
```
## Module List to be downloaded
```
	ng2-charts
	chart.js
	@ultimate/ngxerrors
	angularfire2
	angularfire2/auth
	angularfire2/database
```

* Run app on device

```
    $ ionic cordova run android
    $ ionic cordova run ios --device
```

* Create signing key for android to release on Google Play

```
    $ keytool -genkey -v -keystore keystore folder address -alias app alias -keyalg RSA -keysize 2048 -validity 10000
```

* Create release build for Android Play Store

```
    $ ionic cordova build android --release
```

* Sign the ‘unsigned’ APK for upload on Play store

```
    $ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore .keystore file full path unsigned apk full path app alias
```


* Zipalign to optimize size for play store upload

```
    $ ./zipalign -v 4 signed apk full path path for final APK
``` 

