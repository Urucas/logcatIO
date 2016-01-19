package com.urucas.logcatio;

import android.content.Context;
import android.os.Build;
import android.util.Log;

import com.urucas.logcatio.exceptions.EmptyNamespaceException;
import com.urucas.logcatio.exceptions.NullContextException;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Timer;

/**
 * Created by vruno on 1/12/16.
 */
public class LogcatIO {

    private static Timer TICTAC;
    private static String TAG_NAME = "LOGCAT.IO";
    private String NAMESPACE;
    private int SDK;
    private String BRAND, MODEL, SERIAL, MANUFACTURER;
    private OnTimerTask TASK;
    private static LogcatIO instance;
    private boolean VERBOSE = false;
    private SocketConnection SOCKET;

    private long START = 100, EVERY = 200;

    private LogcatIO() {
        instance = this;
    }

    private static LogcatIO getInstance() {
        if(instance == null) {
            instance = new LogcatIO();
        }
        return instance;
    }

    public static LogcatIO Initialize(Context context, String namespace, boolean verbose)
            throws EmptyNamespaceException, NullContextException {

        if(context == null)
            throw new NullContextException();

        if(namespace == null)
            throw  new EmptyNamespaceException(context);

        namespace = namespace.trim();
        if(namespace.equalsIgnoreCase(""))
            throw new EmptyNamespaceException(context);

        LogcatIO logcatIO = getInstance();
        logcatIO.VERBOSE = verbose;
        logcatIO.NAMESPACE = namespace;
        logcatIO.log("Logcat.io instance created");
        logcatIO.createSocketConnection();
        logcatIO.createTimerTask();
        return getInstance();
    }

    private void createSocketConnection() {
        try {
            SOCKET = new SocketConnection(NAMESPACE, baseJSON());
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    public static LogcatIO Initialize(Context context, String namespace)
            throws EmptyNamespaceException, NullContextException{
        Log.i(TAG_NAME, "initialize");
        return Initialize(context, namespace, false);
    }

    private void log(String msg) {
        LogcatIO instance = getInstance();
        if(instance.VERBOSE)
            Log.i(TAG_NAME, msg);
    }

    public static JSONObject baseJSON() throws JSONException {
        JSONObject json = new JSONObject();
        json.put("brand", Build.BRAND);
        json.put("model", android.os.Build.MODEL);
        json.put("manufacturer", android.os.Build.MANUFACTURER);
        json.put("sdk", Build.VERSION.SDK_INT);
        json.put("serial", android.os.Build.SERIAL);
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
        if(TICTAC == null) {
            TICTAC = getTimer();
            TICTAC.schedule(task, START, EVERY);
        }
    }

    private Timer getTimer() {
        if(TICTAC == null) {
            TICTAC = new Timer(TAG_NAME, true);
        }
        return TICTAC;
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

    @Override
    protected void finalize() throws Throwable {
        super.finalize();
        if(TASK != null) TASK.cancel();
        if(SOCKET != null) SOCKET.disconnect();
    }
}
