package com.vadrin.rtcbusticketwatch.services;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.vadrin.rtcbusticketwatch.models.ExceptionWhileFetchingFromCorporation;
import com.vadrin.rtcbusticketwatch.models.Request;

@Service
public class TsrtcBusService implements BusService {

  @Autowired
  RestTemplateBuilder restTemplateBuilder;

  @Override
  public int getNumberOfAvailabeSeats(Request request) throws ExceptionWhileFetchingFromCorporation {
    RestTemplate restTemplate = restTemplateBuilder.build();
    //Use Below user-agent
    //Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36
    HttpHeaders headers = new HttpHeaders();
    headers.set("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36");      
    HttpEntity hpptEntity = new HttpEntity<>(null, headers);
    String response = restTemplate
        .postForObject("https://www.tsrtconline.in/oprs-web/forward/booking/avail/services.do?txtJourneyDate="
            + request.getJourneyDate() + "&startPlaceId=" + request.getStartPlaceId() + "&endPlaceId="
            + request.getEndPlaceId(), hpptEntity, String.class);
    Pattern pattern = Pattern.compile("fwTotalSeats\" value=\"(.*?)\"");
    Matcher matcher = pattern.matcher(response);
    if (matcher.find()) {
      return Integer.valueOf(matcher.group(1));
    }
    throw new ExceptionWhileFetchingFromCorporation();
  }

}
