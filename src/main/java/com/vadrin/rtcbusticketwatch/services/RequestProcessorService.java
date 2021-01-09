package com.vadrin.rtcbusticketwatch.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vadrin.rtcbusticketwatch.models.Corporation;
import com.vadrin.rtcbusticketwatch.models.Request;

@Service
public class RequestProcessorService {

  @Autowired
  ApsrtcBusService apsrtcBusService;

  @Autowired
  TsrtcBusService tsrtcBusService;

  public void process(List<Request> requests) {
    requests.forEach(request -> {
      try {
        BusService service;
        if (request.getCorporation() == Corporation.APSRTC)
          service = apsrtcBusService;
        else
          service = tsrtcBusService;
        int latestSeatsCount = service.getNumberOfAvailabeSeats(request);
        if (latestSeatsCount > request.getPrevSeatCount()) {
          if (request.getPrevSeatCount() != -1) {
            request.setNotified(true);
            request.setNotificationMessage("New " + request.getCorporation() + " seats / bus available.<br>Prev: "
                + request.getPrevSeatCount() + "<br>Current: " + latestSeatsCount);
          }
          request.setPrevSeatCount(latestSeatsCount);
        }
      } catch (Exception e) {
        e.printStackTrace();
      }
    });
  }

}
