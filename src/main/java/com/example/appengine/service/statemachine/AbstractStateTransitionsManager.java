package com.example.appengine.service.statemachine;

import com.example.appengine.service.statemachine.loan.LoanData;
import com.example.appengine.service.statemachine.loan.LoanException;

import java.util.UUID;

public abstract class AbstractStateTransitionsManager implements StateTransitionsManager {

    protected abstract ProcessData initializeState(ProcessData data) throws ProcessException;
    protected abstract ProcessData processStateTransition(ProcessData data) throws ProcessException;

    @Override
    public ProcessData processEvent(ProcessData data) throws ProcessException {
        data = initializeState(data);
        return processStateTransition(data);
    }

    public abstract LoanData getUserLoan(UUID loanId) throws LoanException;

}
