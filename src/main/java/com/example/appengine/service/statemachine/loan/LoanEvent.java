package com.example.appengine.service.statemachine.loan;

import com.example.appengine.service.statemachine.ProcessEvent;
import com.example.appengine.service.statemachine.ProcessState;
import com.example.appengine.service.statemachine.Processor;


public enum LoanEvent implements ProcessEvent {
    newLoanApp {
        @Override
        public Class<? extends Processor> nextStepProcessor(ProcessEvent event) {
            return LoanPurposeProcessor.class;
        }
        /**
         * This event has no effect on state so return current state
         */
        @Override
        public ProcessState nextState(ProcessEvent event) {
            return LoanState.DEFAULT;
        }
    },purchase {
        @Override
        public Class<? extends Processor> nextStepProcessor(ProcessEvent event) {
            return LoanPurchaseProcessor.class;
        }
        @Override
        public ProcessState nextState(ProcessEvent event) {
            return LoanState.CO_BORROWER;
        }
    },
    refinance {
        //Not used
        @Override
        public Class<? extends Processor> nextStepProcessor(ProcessEvent event) {
            return null;
        }
        @Override
        public ProcessState nextState(ProcessEvent event) {
            return LoanState.REFINANCE;
        }
    },
    refinanceSubmit {
        @Override
        public Class<? extends Processor> nextStepProcessor(ProcessEvent event) {
            return LoanRefinanceProcessor.class;
        }
        @Override
        public ProcessState nextState(ProcessEvent event) {
            return LoanState.CO_BORROWER;
        }
    },
    coBorrower {
        @Override
        public Class<? extends Processor> nextStepProcessor(ProcessEvent event) {
            return CoBorrowerProcessor.class;
        }
        @Override
        public ProcessState nextState(ProcessEvent event) {
            return LoanState.LOAN_SUBMIT;
        }
    },
    loanSubmit {
        @Override
        public Class<? extends Processor> nextStepProcessor(ProcessEvent event) {
            return LoanSubmitProcessor.class;
        }
        @Override
        public ProcessState nextState(ProcessEvent event) {
            return LoanState.COMPLETED;
        }
    }
}
