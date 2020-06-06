package com.example.appengine.service.statemachine;

public interface ProcessData {

    ProcessEvent getProcessEvent();
    ProcessState getProcessState();

}
