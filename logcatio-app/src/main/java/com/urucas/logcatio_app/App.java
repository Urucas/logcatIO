package com.urucas.logcatio_app;

import android.app.Application;

import com.urucas.logcatio.LogcatIO;

/**
 * Created by vruno on 1/15/16.
 */
public class App extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        LogcatIO.Initialize("http://192.168.0.13:5000/");
    }
}
