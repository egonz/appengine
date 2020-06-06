package com.example.appengine.service.statemachine;

public interface ProcessEvent {

    Class<? extends Processor> nextStepProcessor(ProcessEvent event);
    ProcessState nextState(ProcessEvent event);

}
