package com.urucas.logcatio;

import android.test.AndroidTestCase;
import org.junit.Test;

/**
 * Created by vruno on 1/13/16.
 */
public class LogcatIOTests extends AndroidTestCase {

    @Override
    protected void setUp() throws Exception {
        super.setUp();
    }

    @Override
    protected void tearDown() throws Exception {
        super.tearDown();
    }

    @Test
    public void testLogcatInitialize(){
        LogcatIO.Initialize("");
    }
}
