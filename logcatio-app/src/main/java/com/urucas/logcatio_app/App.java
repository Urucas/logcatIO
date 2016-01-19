package com.urucas.logcatio_app;

import android.app.Application;
import android.util.Log;

import com.urucas.logcatio.LogcatIO;
import com.urucas.logcatio.exceptions.EmptyNamespaceException;
import com.urucas.logcatio.exceptions.NullContextException;

/**
 * Created by vruno on 1/15/16.
 */
public class App extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        try {
            LogcatIO.Initialize(getApplicationContext(), "http://192.168.0.11:5000");
        } catch (EmptyNamespaceException e) {
            e.printStackTrace();
        } catch (NullContextException e) {
            e.printStackTrace();
        }
    }
}
