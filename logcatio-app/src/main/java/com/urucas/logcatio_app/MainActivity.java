package com.urucas.logcatio_app;

import android.app.Activity;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;

/**
 * Created by vruno on 1/15/16.
 */
public class MainActivity extends Activity {

    private static final String TAG_NAME = "Logcat.io app";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button logBtt = (Button) findViewById(R.id.logBtt);
        logBtt.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Log.i(TAG_NAME, "button pressed");
            }
        });
    }
}
