package com.example.appengine.controller;

import com.example.appengine.controller.dto.CoBorrower;
import com.example.appengine.controller.dto.LoanApp;
import com.example.appengine.controller.dto.LoanNextState;
import com.example.appengine.service.statemachine.ProcessException;
import com.example.appengine.service.statemachine.loan.LoanData;
import com.example.appengine.service.statemachine.loan.LoanEvent;
import com.example.appengine.service.statemachine.loan.LoanException;
import com.example.appengine.service.statemachine.loan.LoanStateTransitionsManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequiredArgsConstructor
@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/api/appengine/v1/loan")
public class LoanController {

    private final LoanStateTransitionsManager stateTrasitionsManager;

    @GetMapping(value = "/state/{loanId}")
    public LoanNextState getState(@PathVariable("loanId") UUID loanId) throws LoanException {
        return new LoanNextState(stateTrasitionsManager.getUserLoan(loanId).getNextLoanState());
    }

    @GetMapping(value = "/{loanId}")
    public LoanApp getLoanApp(@PathVariable("loanId") UUID loanId) throws LoanException {
        return stateTrasitionsManager.getUserLoanData(loanId).toLoanApp();
    }

    @GetMapping(value = "/debug")
    public LoanApp getLoanId() {
        LoanApp loanApp = new LoanApp();
        loanApp.setFullName("Eddie Gonzales");
        loanApp.setAge(21);
        loanApp.setLoanPurpose(LoanData.LOAN_PURPOSE.PURCHASE);
        loanApp.setLoanId(UUID.randomUUID());
        return loanApp;
    }

    @PostMapping
    public LoanApp newLoanApp(@RequestBody LoanApp loanApp) throws ProcessException {
        LoanData data = new LoanData();
        data.setEvent(LoanEvent.newLoanApp);
        data.setLoanPurpose(loanApp.getLoanPurpose());
        data.setFullName(loanApp.getFullName());
        data.setAge(loanApp.getAge());
        data = (LoanData)stateTrasitionsManager.processEvent(data);
        log.info(((LoanEvent)data.getEvent()).name() + ", loanId = " + data.getLoanId());
        return data.toLoanApp();
    }

    @PostMapping(value = "/refinance")
    public LoanApp refinance(@RequestBody LoanApp loanApp) throws ProcessException {
        LoanData data = new LoanData();
        data.setLoanId(loanApp.getLoanId());
        data.setStreetAddress(loanApp.getStreetAddress());
        data.setCity(loanApp.getCity());
        data.setState(loanApp.getState());
        data.setZipCode(loanApp.getZipCode());
        data.setEvent(LoanEvent.refinanceSubmit);
        data = (LoanData)stateTrasitionsManager.processEvent(data);
        log.info(((LoanEvent)data.getEvent()).name() + ", loanId = " + data.getLoanId());
        return data.toLoanApp();
    }

    @PostMapping(value = "/co-borrower")
    public LoanApp coBorrower(@RequestBody LoanApp loanApp) throws ProcessException {
        LoanData data = new LoanData();
        data.setLoanId(loanApp.getLoanId());
        data.setEvent(LoanEvent.coBorrower);
        data.setCoBorrower(loanApp.getCoBorrower());
        data = (LoanData)stateTrasitionsManager.processEvent(data);
        log.info(((LoanEvent)data.getEvent()).name() + ", loanId = " + data.getLoanId());
        return data.toLoanApp();
    }

    @PostMapping(value = "/completed")
    public LoanApp completed(@RequestBody LoanApp loanApp) throws ProcessException {
        LoanData data = new LoanData();
        data.setLoanId(loanApp.getLoanId());
        data.setEvent(LoanEvent.loanSubmit);
        data = (LoanData)stateTrasitionsManager.processEvent(data);
        log.info(((LoanEvent)data.getEvent()).name() + ", loanId = " + data.getLoanId());
        return data.toLoanApp();
    }

}

