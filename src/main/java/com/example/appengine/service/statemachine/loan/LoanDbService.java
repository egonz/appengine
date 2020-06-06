package com.example.appengine.service.statemachine.loan;

import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

//persists state of the data
//here we are using HashMap for illustration purposes
@Service
public class LoanDbService {

    private final ConcurrentHashMap<UUID, LoanData> loanData;

    public LoanDbService() {
        this.loanData = new ConcurrentHashMap<UUID, LoanData>();
    }
    public ConcurrentHashMap<UUID, LoanData> getLoanData() {
        return loanData;
    }

}
