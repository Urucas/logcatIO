package com.urucas.logcatio;

import android.test.AndroidTestCase;

import com.urucas.logcatio.exceptions.EmptyNamespaceException;
import com.urucas.logcatio.exceptions.NullContextException;

import org.json.JSONException;
import org.json.JSONObject;
import org.junit.Test;

import java.net.URISyntaxException;

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
    public void testBaseJonsHasKeys() throws EmptyNamespaceException, NullContextException, JSONException{
        JSONObject jsonObject = LogcatIO.baseJSON();
        assertNotNull(jsonObject);
        assertEquals(jsonObject.has("brand"), true);
        assertEquals(jsonObject.has("model"), true);
        assertEquals(jsonObject.has("manufacturer"), true);
        assertEquals(jsonObject.has("sdk"), true);
        assertEquals(jsonObject.has("serial"), true);
    }

    @Test
    public void testSocketConnection() throws JSONException, URISyntaxException, InterruptedException {
        JSONObject jsonObject = LogcatIO.baseJSON();
        String namespace = "http://192.168.0.11:5000";
        SocketConnection socket = new SocketConnection(namespace, jsonObject);
        Thread.sleep(2000);
        socket.log("test log");
        Thread.sleep(2000);
        socket.disconnect();
        Thread.sleep(2000);
    }
}
