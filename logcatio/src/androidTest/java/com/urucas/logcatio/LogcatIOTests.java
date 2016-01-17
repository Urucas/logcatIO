package com.urucas.logcatio;

import android.os.SystemClock;
import android.test.AndroidTestCase;
import android.util.Log;

import com.urucas.logcatio.exceptions.EmptyNamespaceException;
import com.urucas.logcatio.exceptions.NullContextException;

import org.junit.Test;

import java.net.URISyntaxException;

import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;

/**
 * Created by vruno on 1/13/16.
 */
public class LogcatIOTests extends AndroidTestCase {

    private static final String TAG_NAME = "LogcatIO test case";

    @Override
    protected void setUp() throws Exception {
        super.setUp();
    }

    @Override
    protected void tearDown() throws Exception {
        super.tearDown();
    }

    @Test
    public void testLogcatInitializeThrowsNullContextException(){
        try {
            LogcatIO.Initialize(null, null);
        }catch (Exception e) {
            assertNotNull(e);
            assertEquals(NullContextException.class, e.getClass());
        }
    }

    @Test
    public void testLogcatInitializeThrowsEmptyNamespaceExceptionOnNull(){
        try {
            LogcatIO.Initialize(getContext(), null);
        }catch (Exception e) {
            assertNotNull(e);
            assertEquals(EmptyNamespaceException.class, e.getClass());
            assertEquals(e.getMessage(), getContext().getResources().getString(R.string.empty_namespace_exception));
        }
    }

    @Test
    public void testLogcatInitializeThrowsEmptyNamespaceExceptionOnBlank(){
        try {
            LogcatIO.Initialize(getContext(), "");
        }catch (Exception e) {
            assertNotNull(e);
            assertEquals(EmptyNamespaceException.class, e.getClass());
            assertEquals(e.getMessage(), getContext().getResources().getString(R.string.empty_namespace_exception));
        }
    }

    @Test
    public void testLogIsEmittingEvents()
            throws EmptyNamespaceException, NullContextException, URISyntaxException {

        String namespace = "http://192.168.0.13:5000/";
            Socket socket = IO.socket(namespace);
            final boolean[] didCallEvents = {false, false, false};
            socket.on("greetings", new Emitter.Listener() {
                @Override
                public void call(Object... args) {
                    Log.i(TAG_NAME, "grettins");
                    didCallEvents[0] = true;
                }
            });
            socket.on("dump", new Emitter.Listener() {
                @Override
                public void call(Object... args) {
                    didCallEvents[1] = true;
                }
            });
            socket.on("disconnect", new Emitter.Listener() {
                @Override
                public void call(Object... args) {
                    didCallEvents[2] = true;
                }
            });
            socket.on(Socket.EVENT_CONNECT, new Emitter.Listener() {
                @Override
                public void call(Object... args) {
                    Log.i(TAG_NAME, "connected");
                }
            });
            socket.on(Socket.EVENT_ERROR, new Emitter.Listener() {
                @Override
                public void call(Object... args) {
                    Log.i(TAG_NAME, "error");
                }
            });
        socket.connect();
        SystemClock.sleep(1000);
        LogcatIO.Initialize(getContext(), namespace);
        Log.i(TAG_NAME, "test");
        LogcatIO.Disconnect();
        SystemClock.sleep(1000);
        assertEquals(true, didCallEvents[0]);
        assertEquals(true, didCallEvents[1]);
        assertEquals(true, didCallEvents[2]);
    }
}
