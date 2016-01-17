package com.urucas.logcatio.exceptions;

import android.content.Context;

import com.urucas.logcatio.R;

/**
 * Created by vruno on 1/17/16.
 */
public class EmptyNamespaceException extends Exception {

    private Context context;

    public EmptyNamespaceException(Context context) {
        super();
        this.context = context;
    }

    @Override
    public String getMessage() {
        return this.context.getResources().getString(R.string.empty_namespace_exception);
    }
}
