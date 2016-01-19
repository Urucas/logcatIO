package com.urucas.logcatio;

import android.net.Uri;
import android.util.Log;

import org.json.JSONObject;

import java.net.URISyntaxException;

import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;

/**
 * Created by vruno on 1/12/16.
 */
public class SocketConnection {

    private static final String TAG_NAME = "SOCKET_CONNECTION";
    private Socket socket;
    private JSONObject jsonObject;

    public SocketConnection(String namespace, JSONObject jsonObject) throws URISyntaxException {
        this.jsonObject = jsonObject;
        socket = IO.socket(namespace);
        socket.on(Socket.EVENT_CONNECT, new OnSocketConnected());
        socket.on(Socket.EVENT_DISCONNECT, new OnSocketDisconnected());
        socket.on(Socket.EVENT_ERROR, new OnSocketError());
        socket.connect();
    }

    private class OnSocketConnected implements Emitter.Listener{
        @Override
        public void call(Object... args) {
            Log.i(TAG_NAME, "Socket connected");
            introduceYourself();
        }
    }

    private class OnSocketDisconnected implements Emitter.Listener{
        @Override
        public void call(Object... args) {
            Log.i(TAG_NAME, "Socket disconnected");
        }
    }

    private class OnSocketError implements Emitter.Listener{
        @Override
        public void call(Object... args) {
            Log.i(TAG_NAME, "Socket error");
        }
    }

    public void log(String log) {
        try {
            jsonObject.put("log", log);
            socket.emit("dump", jsonObject);
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    public void introduceYourself() {
        try {
            socket.emit("greetings", jsonObject);
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    public void disconnect() {
        try {
            socket.disconnect();
        }catch(Exception e){
            e.printStackTrace();
        }
    }
}
