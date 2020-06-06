package com.example.appengine.service.statemachine.loan;

import com.example.appengine.service.statemachine.ProcessData;
import com.example.appengine.service.statemachine.ProcessException;
import com.example.appengine.service.statemachine.Processor;
import org.springframework.stereotype.Service;

@Service
public class CoBorrowerProcessor  implements Processor {
    @Override
    public ProcessData process(ProcessData data) throws ProcessException {
        ((LoanData)data).setEvent(LoanEvent.coBorrower);
        return data;
    }
}
