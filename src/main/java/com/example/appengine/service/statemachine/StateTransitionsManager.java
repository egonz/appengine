package com.example.appengine.service.statemachine;

public interface StateTransitionsManager {

    ProcessData processEvent(ProcessData data) throws ProcessException;

}
