package com.example.appengine.service.statemachine.loan;

import com.example.appengine.controller.dto.CoBorrower;
import com.example.appengine.controller.dto.LoanApp;
import com.example.appengine.service.statemachine.ProcessData;
import com.example.appengine.service.statemachine.ProcessEvent;
import com.example.appengine.service.statemachine.ProcessState;
import lombok.*;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Setter @Getter
@Builder
public class LoanData implements ProcessData {
    private ProcessEvent event;
    private UUID loanId;
    private String fullName;
    private Integer age;
    private LOAN_PURPOSE loanPurpose;
    private LoanState nextLoanState;
    private String streetAddress;
    private String city;
    private String state;
    private Integer zipCode;
    private CoBorrower coBorrower;

    public enum LOAN_PURPOSE {
        REFINANCE,
        PURCHASE;

        public static LOAN_PURPOSE toLoanPurpose(String loanPurpose) {
            if (loanPurpose.toLowerCase().equals("refinance")) {
                return REFINANCE;
            } else if (loanPurpose.toLowerCase().equals("purchase")) {
                return PURCHASE;
            } else {
                return null;
            }
        }
    }

    @Override
    public ProcessEvent getProcessEvent() {
        return event;
    }

    @Override
    public ProcessState getProcessState() {
        return nextLoanState;
    }

    public static LoanData toLoanData(LoanApp loanApp) {
        LoanData data = new LoanData();
        data.setFullName(loanApp.getFullName());
        data.setAge(loanApp.getAge());
        data.setLoanPurpose(loanApp.getLoanPurpose());
        data.setLoanId(loanApp.getLoanId());
        data.setStreetAddress(loanApp.getStreetAddress());
        data.setCity(loanApp.getCity());
        data.setState(loanApp.getState());
        data.setZipCode(loanApp.getZipCode());
        data.setCoBorrower(loanApp.getCoBorrower());
        return data;
    }

    public LoanApp toLoanApp() {
        LoanApp loanApp = new LoanApp();
        loanApp.setFullName(this.fullName);
        loanApp.setAge(this.age);
        loanApp.setLoanId(this.loanId);
        loanApp.setLoanPurpose(this.loanPurpose);
        loanApp.setNextLoanState(this.nextLoanState);
        loanApp.setStreetAddress(this.streetAddress);
        loanApp.setCity(this.city);
        loanApp.setState(this.state);
        loanApp.setZipCode(this.zipCode);
        loanApp.setCoBorrower(this.coBorrower);
        return loanApp;
    }

    public void cloneLoanData(LoanData loanApp) {
        if (loanApp.getLoanId() != null)
            this.loanId = loanApp.getLoanId();
        if (loanApp.getFullName() != null)
            this.fullName = loanApp.getFullName();
        if (loanApp.getAge() != null)
            this.age = loanApp.getAge();
        if (loanApp.getLoanPurpose() != null)
            this.loanPurpose = loanApp.getLoanPurpose();
        if (loanApp.getStreetAddress() != null)
            this.streetAddress = loanApp.getStreetAddress();
        if (loanApp.getCity() != null)
            this.city = loanApp.getCity();
        if (loanApp.getState() != null)
            this.state = loanApp.getState();
        if (loanApp.getZipCode() != null)
            this.zipCode = loanApp.getZipCode();
        if (loanApp.getCoBorrower() != null)
            this.coBorrower = loanApp.getCoBorrower();
    }

}
