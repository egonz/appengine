package com.example.appengine.service.statemachine.loan;

import com.example.appengine.controller.dto.CoBorrower;
import com.example.appengine.controller.dto.LoanApp;
import com.example.appengine.service.statemachine.ProcessException;
import lombok.extern.slf4j.Slf4j;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.UUID;

@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest
public class LoanStateTransitionsManagerTest {

    @Autowired
    private LoanStateTransitionsManager stateTrasitionsManager;

    private static final String STREET_ADDRESS = "742 Evergreen Terrace";
    private static final String CITY = "Springfield";
    private static final String STATE = "IL";
    private static final Integer ZIP_CODE = 22617;

    @Test
    public void initializeState() {
    }

    @Test
    public void refinanceLoan() throws ProcessException {
        LoanData data = createLoanApp(LoanData.LOAN_PURPOSE.REFINANCE, LoanEvent.newLoanApp);

        LoanData refinanceData = new LoanData();
        refinanceData.setLoanId(data.getLoanId());
        refinanceData.setStreetAddress(STREET_ADDRESS);
        refinanceData.setCity(CITY);
        refinanceData.setState(STATE);
        refinanceData.setZipCode(ZIP_CODE);
        refinanceData.setEvent(LoanEvent.refinanceSubmit);
        refinanceData = (LoanData)stateTrasitionsManager.processEvent(refinanceData);

        Assert.assertNotNull(refinanceData.getLoanId());
        Assert.assertEquals(data.getFullName(), refinanceData.getFullName());
        Assert.assertEquals(data.getAge(), refinanceData.getAge());
        Assert.assertEquals(STREET_ADDRESS, refinanceData.getStreetAddress());
        Assert.assertEquals(CITY, refinanceData.getCity());
        Assert.assertEquals(STATE, refinanceData.getState());
        Assert.assertEquals(ZIP_CODE.intValue(), refinanceData.getZipCode().intValue());
        Assert.assertEquals(LoanState.CO_BORROWER, refinanceData.getNextLoanState());
    }

    @Test
    public void purchaseLoan() throws ProcessException {
        LoanData data = createLoanApp(LoanData.LOAN_PURPOSE.PURCHASE, LoanEvent.newLoanApp);
        Assert.assertNotNull(data.getLoanId());
        Assert.assertEquals(LoanState.CO_BORROWER, data.getNextLoanState());
    }

    @Test
    public void addCoBorrower() throws ProcessException {
        LoanData data = createLoanApp(LoanData.LOAN_PURPOSE.PURCHASE, LoanEvent.newLoanApp);

        LoanData coBorrowerData = new LoanData();
        coBorrowerData.setLoanId(data.getLoanId());
        coBorrowerData.setCoBorrower(new CoBorrower("Marge Simpson", 44));
        coBorrowerData.setEvent(LoanEvent.coBorrower);
        coBorrowerData = (LoanData)stateTrasitionsManager.processEvent(coBorrowerData);

        Assert.assertNotNull(coBorrowerData.getLoanId());
        Assert.assertEquals(data.getFullName(), coBorrowerData.getFullName());
        Assert.assertEquals(data.getAge(), coBorrowerData.getAge());
        Assert.assertEquals("Marge Simpson", coBorrowerData.getCoBorrower().getFullName());
        Assert.assertEquals(44, coBorrowerData.getCoBorrower().getAge().intValue());
        Assert.assertEquals(LoanState.LOAN_SUBMIT, coBorrowerData.getNextLoanState());
    }

    @Test
    public void loanSubmit() throws ProcessException {
        LoanData data = createLoanApp(LoanData.LOAN_PURPOSE.PURCHASE, LoanEvent.newLoanApp);

        LoanData loanSubmitData = new LoanData();
        loanSubmitData.setLoanId(data.getLoanId());
        loanSubmitData.setEvent(LoanEvent.loanSubmit);
        loanSubmitData = (LoanData)stateTrasitionsManager.processEvent(loanSubmitData);

        Assert.assertNotNull(loanSubmitData.getLoanId());
        Assert.assertEquals(LoanState.COMPLETED, loanSubmitData.getNextLoanState());
    }

    @Test
    public void getUserLoan() throws ProcessException {
        LoanData data = createLoanApp(LoanData.LOAN_PURPOSE.REFINANCE, LoanEvent.newLoanApp);
        LoanApp loanApp = stateTrasitionsManager.getUserLoanData(data.getLoanId()).toLoanApp();
        Assert.assertEquals(loanApp.getLoanId(), data.getLoanId());
    }

    @Test(expected=ProcessException.class)
    public void getUserLoanForUnknownUser() throws LoanException {
        stateTrasitionsManager.getUserLoan(UUID.randomUUID());
    }

    @Test
    public void getUserLoanData() throws ProcessException {
        LoanData data = createLoanApp(LoanData.LOAN_PURPOSE.REFINANCE, LoanEvent.newLoanApp);
        LoanData loanData = stateTrasitionsManager.getUserLoanData(data.getLoanId());
        Assert.assertEquals(loanData.getLoanId(), data.getLoanId());
    }

    private LoanData createLoanApp(LoanData.LOAN_PURPOSE loanPurpose, LoanEvent loanEvent) throws ProcessException {
        LoanData data = createLoanData(loanPurpose, loanEvent);
        data = (LoanData)stateTrasitionsManager.processEvent(data);
        log.info(((LoanEvent)data.getEvent()).name() + ", loanId = " + data.getLoanId());
        return data;
    }

    private LoanData createLoanData(LoanData.LOAN_PURPOSE loanPurpose, LoanEvent loanEvent) {
        LoanData data = new LoanData();
        data.setEvent(loanEvent);
        data.setLoanPurpose(loanPurpose);
        data.setFullName("Homer Simpson");
        data.setAge(45);
        return data;
    }

}