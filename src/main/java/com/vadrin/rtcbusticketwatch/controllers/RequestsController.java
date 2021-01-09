package com.vadrin.rtcbusticketwatch.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.vadrin.rtcbusticketwatch.models.Request;
import com.vadrin.rtcbusticketwatch.services.RequestProcessorService;

@RestController
public class RequestsController {

  @Autowired
  RequestProcessorService requestProcessorService;

  @PostMapping(path = "/request")
  public List<Request> process(@RequestBody List<Request> requests) {
    requestProcessorService.process(requests);
    return requests;
  }

}
