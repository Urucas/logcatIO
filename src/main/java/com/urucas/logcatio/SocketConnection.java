package com.urucas.logcatio;

import org.json.JSONObject;

import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;

/**
 * Created by vruno on 1/12/16.
 */
public class SocketConnection {

    private Socket socket;
    private JSONObject jsonObject;

    public SocketConnection(String namespace, JSONObject jsonObject) {
        this.jsonObject = jsonObject;
        try {
            socket = IO.socket(namespace);
            socket.on(Socket.EVENT_CONNECT, new OnSocketConnected());
            socket.on(Socket.EVENT_DISCONNECT, new OnSocketDisconnected());
            socket.on(Socket.EVENT_ERROR, new OnSocketError());
            socket.connect();
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    private class OnSocketConnected implements Emitter.Listener{
        @Override
        public void call(Object... args) {
            introduceYourself();
        }
    }

    private class OnSocketDisconnected implements Emitter.Listener{
        @Override
        public void call(Object... args) {

        }
    }

    private class OnSocketError implements Emitter.Listener{
        @Override
        public void call(Object... args) {
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
}
