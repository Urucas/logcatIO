# logcatIO
A combination of Android Logcat &amp; Socket.IO. Add the library to our app, check the logs in your browser. 

#Why?
Because sometimes you want to distribute and read the remote logs from a particular release. 

#How?
Install & run the logcatIO server,
```bash
$ npm install --g logcat.io
$ logcatio
```
<img src="https://raw.githubusercontent.com/Urucas/logcatIO/master/screen1.png" />

Add the client library to your android app,
```gradle
repositories {
// ...
 maven { url 'http://urucas.github.io/logcatIO/'}
// ...
}

dependencies {
    // ...
    compile 'io.socket:socket.io-client:0.6.2'
    compile 'com.urucas:logcatio:1.0.4@aar'
}
```
and initialize it,
```java
// use the namespace given by the logcatIO server
// or the url where you run the logcatIO server
String namespace = "http://192.168.0.13:5000";
LogcatIO.Initialize(namespace);
```

Check the logcat in your browser!

<img src="https://raw.githubusercontent.com/Urucas/logcatIO/master/screen.png"
/>
