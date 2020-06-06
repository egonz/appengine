package com.example.appengine.service.statemachine.loan;

import com.example.appengine.service.statemachine.ProcessData;
import com.example.appengine.service.statemachine.ProcessException;
import com.example.appengine.service.statemachine.Processor;
import org.springframework.stereotype.Service;

@Service
public class LoanPurposeProcessor implements Processor {
    @Override
    public ProcessData process(ProcessData data) throws ProcessException {
        LoanData loan = (LoanData)data;
        LoanData.LOAN_PURPOSE loanPurpose = loan.getLoanPurpose();

        if (loanPurpose == LoanData.LOAN_PURPOSE.PURCHASE) {
            loan.setEvent(LoanEvent.purchase);
        } else if (loanPurpose == LoanData.LOAN_PURPOSE.REFINANCE) {
            loan.setEvent(LoanEvent.refinance);
        }

        return loan;
    }
}
