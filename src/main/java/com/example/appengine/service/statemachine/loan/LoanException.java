package com.example.appengine.service.statemachine.loan;

import com.example.appengine.service.statemachine.ProcessException;

public class LoanException extends ProcessException {
    public LoanException(String message) {
        super(message);
    }

    public LoanException(String message, Exception e) {
        super(message, e);
    }

}
