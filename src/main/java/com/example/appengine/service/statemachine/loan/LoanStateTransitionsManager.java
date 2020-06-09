package com.example.appengine.service.statemachine.loan;

import com.example.appengine.service.statemachine.AbstractStateTransitionsManager;
import com.example.appengine.service.statemachine.ProcessData;
import com.example.appengine.service.statemachine.ProcessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;


@RequiredArgsConstructor
@Slf4j
@Service
public class LoanStateTransitionsManager extends AbstractStateTransitionsManager {
    private final ApplicationContext context;
    private final LoanDbService dbService;

    @Override
    protected ProcessData initializeState(ProcessData sdata) throws ProcessException {
        LoanData data = (LoanData) sdata;

        if (data.getLoanId() != null) {
            return checkStateForReturningUser(data);
        }

        UUID loanId = UUID.randomUUID();
        data.setLoanId(loanId);
        data.setNextLoanState(LoanState.DEFAULT);
        getLoanData().put(loanId, data);
        log.info("Initial state: " + getLoanData().get(loanId).getNextLoanState().name());

        return data;
    }

    @Override
    protected ProcessData processStateTransition(ProcessData sdata) throws ProcessException {
        LoanData data = (LoanData)sdata;

        try {
            log.info("Pre-event: " + data.getEvent().toString());
            LoanData loanData = (LoanData) this.context.getBean(data.getEvent().nextStepProcessor(data.getEvent())).process(data);
            log.info("Post-event: " + loanData.getEvent().toString());

            loanData.setNextLoanState((LoanState)loanData.getEvent().nextState(loanData.getEvent()));
            getLoanData().put(loanData.getLoanId(), loanData);

            log.info("Final state: " + getLoanData().get(loanData.getLoanId()).getNextLoanState().name());
            log.info("??*************************************");
        } catch (LoanException e) {
            throw new LoanException(((LoanEvent) data.getEvent()).name(), e);
        }

        return data;
    }

    @Override
    public LoanData getUserLoan(UUID loanId) throws LoanException {
        if (loanId != null) {
            if (getLoanData().get(loanId) == null) {
                throw new LoanException("No state exists for loanId=" + loanId);
            } else if (getLoanData().get(loanId).getNextLoanState() != null &&
                    getLoanData().get(loanId).getNextLoanState() == LoanState.COMPLETED) {
                throw new LoanException("Loan is completed for loanId=" + loanId);
            } else {
                return getLoanData().get(loanId);
            }
        }

        return null;
    }

    @Override
    public LoanData getUserLoanData(UUID loanId) throws LoanException {
        if (loanId != null) {
            return getLoanData().get(loanId);
        }

        return null;
    }

    private LoanData checkStateForReturningUser(LoanData data) throws LoanException {
        if (data != null) {
            LoanData loanData = getUserLoan(data.getLoanId());
            // returning customers must have a state
            if (loanData != null) {
                data.cloneLoanData(loanData);;
                log.info("Initial state: " + loanData.getNextLoanState().name());
            }
        }

        return data;
    }

    private ConcurrentHashMap<UUID, LoanData> getLoanData() {
        return dbService.getLoanData();
    }
}
