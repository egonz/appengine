package com.example.appengine.controller.dto;

import com.example.appengine.service.statemachine.ProcessEvent;
import com.example.appengine.service.statemachine.loan.LoanData;
import com.example.appengine.service.statemachine.loan.LoanState;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class LoanApp {

    private UUID loanId;
    private String fullName;
    private Integer age;
    private LoanData.LOAN_PURPOSE loanPurpose;
    private LoanState nextLoanState;
    private String streetAddress;
    private String city;
    private String state;
    private Integer zipCode;
    private CoBorrower coBorrower;

}
