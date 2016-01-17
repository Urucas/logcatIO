package com.urucas.logcatio;

import android.content.Context;
import android.os.Build;
import android.util.Log;

import com.urucas.logcatio.exceptions.EmptyNamespaceException;
import com.urucas.logcatio.exceptions.NullContextException;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Timer;

/**
 * Created by vruno on 1/12/16.
 */
public class LogcatIO {

    private static String TAG_NAME = "LOGCAT.IO";
    private String NAMESPACE;
    private int SDK;
    private String BRAND, MODEL, SERIAL, MANUFACTURER;
    private OnTimerTask TASK;
    private static LogcatIO instance;
    private boolean VERBOSE = false;
    private SocketConnection SOCKET;

    private long START = 200, EVERY = 5000;

    private LogcatIO() {
        instance = this;
    }

    private static LogcatIO getInstance() {
        if(instance == null) {
            instance = new LogcatIO();
        }
        return instance;
    }

    public boolean isVerbose() {
        return VERBOSE;
    }

    public static void Initialize(Context context, String namespace, boolean verbose)
            throws EmptyNamespaceException, NullContextException {

        if(context == null)
            throw new NullContextException();

        if(namespace == null)
            throw  new EmptyNamespaceException(context);

        namespace = namespace.trim();
        if(namespace.equalsIgnoreCase(""))
            throw new EmptyNamespaceException(context);

        LogcatIO logcatIO = getInstance();
        logcatIO.log("Logcat.io instance created");
        logcatIO.VERBOSE = verbose;
        logcatIO.NAMESPACE = namespace;
        logcatIO.SDK = Build.VERSION.SDK_INT;
        logcatIO.BRAND = Build.BRAND;
        logcatIO.MANUFACTURER = android.os.Build.MANUFACTURER;
        logcatIO.MODEL = android.os.Build.MODEL;
        logcatIO.SERIAL = android.os.Build.SERIAL;
        logcatIO.createSocketConnection();
        logcatIO.createTimerTask();
    }

    private void createSocketConnection() {
        try {
            SOCKET = new SocketConnection(NAMESPACE, baseJSON());
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    public static void Initialize(Context context, String namespace)
            throws EmptyNamespaceException, NullContextException{
        Initialize(context, namespace, false);
    }

    private void log(String msg) {
        LogcatIO instance = getInstance();
        if(instance.VERBOSE)
            Log.i(TAG_NAME, msg);
    }

    private JSONObject baseJSON() throws Exception{
        LogcatIO instance = getInstance();
        JSONObject json = new JSONObject();
        json.put("brand", instance.BRAND);
        json.put("model", instance.MODEL);
        json.put("manufacturer", instance.MANUFACTURER);
        json.put("sdk", instance.SDK);
        json.put("serial", instance.SERIAL);
        return json;
    }

    private OnTimerTask getTimerTask() {
        if(TASK == null) {
            TASK = new OnTimerTask();
        }
        return TASK;
    }

    private void createTimerTask() {
        OnTimerTask task = getTimerTask();
        new Timer(TAG_NAME, true).schedule(task, START, EVERY);
    }

    private class OnTimerTask extends java.util.TimerTask {
        @Override
        public void run() {
            LogcatIO logcatIO = getInstance();
            try {
                logcatIO.dumpLogs();
            }catch(Exception e){
                e.printStackTrace();
            }
        }
    }

    private void dumpLogs() {
        String[] command = new String[] {"logcat", "-v", "threadtime"};
        try {
            Process process = Runtime.getRuntime().exec(command);
            BufferedReader bufferedReader = new BufferedReader(
                    new InputStreamReader(process.getInputStream()));

            String line;
            while ((line = bufferedReader.readLine()) != null) {
               SOCKET.log(line);
            }

        }catch(Exception e){
            e.printStackTrace();
        }
    }

    private static SocketConnection GetSocket() {
        return LogcatIO.getInstance().SOCKET;
    }

    public static void Disconnect() {
        try {
            GetSocket().disconnect();
        }catch (Exception e) {
            e.printStackTrace();
        }
    }
}
