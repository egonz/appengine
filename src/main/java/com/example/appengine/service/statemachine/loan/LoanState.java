package com.example.appengine.service.statemachine.loan;

import com.example.appengine.service.statemachine.ProcessState;

public enum LoanState implements ProcessState {
    DEFAULT,
    REFINANCE,
    CO_BORROWER,
    LOAN_SUBMIT,
    COMPLETED
}