package com.vadrin.rtcbusticketwatch.controllers;

import java.util.Iterator;
import java.util.Set;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vadrin.rtcbusticketwatch.models.Request;
import com.vadrin.rtcbusticketwatch.models.Website;
import com.vadrin.rtcbusticketwatch.services.NotificationService;
import com.vadrin.rtcbusticketwatch.services.RequestsRepository;

@RestController
public class RequestsController {

  @Autowired
  NotificationService notificationService;

  @PostMapping(path = "/request")
  public void createRequest(@RequestBody Request request) {
    RequestsRepository.addRequest(request);
    notificationService.subscribed(request);
  }

  @GetMapping(path = "/request")
  public Set<Request> getRequests(HttpServletRequest request) {
    Website.url = request.getRequestURL().toString();
    System.out.println(Website.url);
    return RequestsRepository.getRequests();
  }

  @DeleteMapping(path = "/request")
  public void deleteRequest(@RequestBody Request request) {
    Iterator<Request> repositoryIterator = RequestsRepository.getRequests().iterator();
    Request reqToDelete = null;
    ObjectMapper mapper = new ObjectMapper();
    while (repositoryIterator.hasNext()) {
      Request thisReq = repositoryIterator.next();
      try {
        if (mapper.writeValueAsString(request)
            .equalsIgnoreCase(mapper.writeValueAsString(thisReq))) {
          reqToDelete = thisReq;
          break;
        }
      } catch (JsonProcessingException e) {
        // TODO Auto-generated catch block
        e.printStackTrace();
      }
    }
    if (reqToDelete != null) {
      notificationService.deleted(reqToDelete);
      RequestsRepository.deleteRequest(reqToDelete);
    }
  }

}
