package com.vadrin.rtcbusticketwatch.services;

import java.util.Arrays;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.vadrin.rtcbusticketwatch.models.ExceptionWhileFetchingFromCorporation;
import com.vadrin.rtcbusticketwatch.models.Request;

@Service
public class ApsrtcBusService implements BusService {

  @Autowired
  RestTemplateBuilder restTemplateBuilder;

  @Override
  public int getNumberOfAvailabeSeats(Request request) throws ExceptionWhileFetchingFromCorporation {
    RestTemplate restTemplate = restTemplateBuilder.build();
    HttpHeaders headers = new HttpHeaders();
    headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
    headers.setContentType(MediaType.APPLICATION_JSON);
    headers.add("user-agent", "Mozilla/5.0 Firefox/26.0");
    HttpEntity<String> entity = new HttpEntity<>(headers);
    ResponseEntity<String> response = restTemplate
        .exchange("https://www.apsrtconline.in/oprs-web/forward/booking/avail/services.do?txtJourneyDate="
            + request.getJourneyDate() + "&startPlaceId=" + request.getStartPlaceId() + "&endPlaceId="
            + request.getEndPlaceId(), HttpMethod.POST, entity, String.class);
    Pattern pattern = Pattern.compile("fwTotalSeats\" value=\"(.*?)\"");
    Matcher matcher = pattern.matcher(response.getBody());
    if (matcher.find()) {
      return Integer.valueOf(matcher.group(1));
    }
    throw new ExceptionWhileFetchingFromCorporation();
  }

}
