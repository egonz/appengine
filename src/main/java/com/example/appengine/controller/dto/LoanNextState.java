package com.example.appengine.controller.dto;

import com.example.appengine.service.statemachine.loan.LoanState;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class LoanNextState {
    private LoanState nextLoanState;
}
