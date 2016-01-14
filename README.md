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

Add the client library to your android app,
```gradle
repositories {
// ...
 maven { url 'http://urucas.github.io/logcatIO/'}
// ...
}

dependencies {
    // ...
    compile 'com.urucas:logcatio:1.0.1@aar'
}
```
and initialize it,
```java
LogcatIO.Initialize()
```

Check the logcat in your browser!
