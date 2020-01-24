package com.vadrin.rtcbusticketwatch.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import com.vadrin.rtcbusticketwatch.models.Corporation;
import com.vadrin.rtcbusticketwatch.services.ApsrtcBusService;
import com.vadrin.rtcbusticketwatch.services.BusService;
import com.vadrin.rtcbusticketwatch.services.KeepAliveService;
import com.vadrin.rtcbusticketwatch.services.NotificationService;
import com.vadrin.rtcbusticketwatch.services.RequestsRepository;
import com.vadrin.rtcbusticketwatch.services.TsrtcBusService;

@Component
public class ScheduledWatcher {

  @Autowired
  ApsrtcBusService apsrtcBusService;

  @Autowired
  TsrtcBusService tsrtcBusService;

  @Autowired
  NotificationService notificationService;

  @Autowired
  KeepAliveService keepAliveService;

  @Scheduled(fixedRate = 5 * 60000)
  public void checkAndNotifyForNewSeats() {
    RequestsRepository.getRequests().forEach(request -> {
      try {
        BusService service;
        if (request.getCorporation() == Corporation.APSRTC)
          service = apsrtcBusService;
        else
          service = tsrtcBusService;
        int latestSeatsCount = service.getNumberOfAvailabeSeats(request);
        if (latestSeatsCount > RequestsRepository.getPrevSeats(request)) {
          if (RequestsRepository.getPrevSeats(request) != -1)
            notificationService.notify(request, RequestsRepository.getPrevSeats(request),
                latestSeatsCount);
          RequestsRepository.setPrevSeats(request, latestSeatsCount);
        }
      } catch (Exception e) {
        e.printStackTrace();
      }
    });
  }
  
  @Scheduled(fixedRate = 10 * 60000)
  public void keepTheSiteUp() {
    if(!RequestsRepository.getRequests().isEmpty()) {
      System.out.println("There are some requests. Will keep the site alive!");
      keepAliveService.keepAlive();
    }
  }

}
