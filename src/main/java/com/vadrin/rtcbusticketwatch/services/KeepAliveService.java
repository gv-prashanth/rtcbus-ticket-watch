package com.vadrin.rtcbusticketwatch.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.vadrin.rtcbusticketwatch.models.Website;

@Service
public class KeepAliveService {

  @Autowired
  RestTemplateBuilder restTemplateBuilder;
  
  public void keepAlive() {
    if(!Website.url.isEmpty()) {
      RestTemplate restTemplate = restTemplateBuilder.build();
      ResponseEntity<String> response = restTemplate.getForEntity(Website.url, String.class);
      System.out.println("Kept alive response code is "+response.getStatusCode());
    }else {
      System.out.println("Failed to acquire website url to keep alive");
    }
  }
  
}
