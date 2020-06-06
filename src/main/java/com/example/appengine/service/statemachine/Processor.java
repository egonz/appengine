package com.example.appengine.service.statemachine;

public interface Processor {

    ProcessData process(ProcessData data) throws ProcessException;

}
