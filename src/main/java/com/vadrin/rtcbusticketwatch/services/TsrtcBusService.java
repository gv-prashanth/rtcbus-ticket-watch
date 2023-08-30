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
public class TsrtcBusService implements BusService {

  @Autowired
  RestTemplateBuilder restTemplateBuilder;

  @Override
  public int getNumberOfAvailabeSeats(Request request) throws ExceptionWhileFetchingFromCorporation {
    RestTemplate restTemplate = restTemplateBuilder.build();
    HttpHeaders headers = new HttpHeaders();
    headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
    headers.setContentType(MediaType.APPLICATION_JSON);
    headers.set("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36");
    headers.set("host", "https://www.tsrtconline.in");
    headers.set("origin", "https://www.tsrtconline.in");
    headers.set("referer", "https://www.tsrtconline.in/oprs-web/avail/services.do");
    headers.set("x-requested-with", "XMLHttpRequest");
    HttpEntity<String> entity = new HttpEntity<>(headers);
//    String response = restTemplate
//        .postForObject("https://www.tsrtconline.in/oprs-web/forward/booking/avail/services.do?txtJourneyDate="
//            + request.getJourneyDate() + "&startPlaceId=" + request.getStartPlaceId() + "&endPlaceId="
//            + request.getEndPlaceId(), hpptEntity, String.class);
    ResponseEntity<String> response = restTemplate
        .exchange("https://www.tsrtconline.in/oprs-web/forward/booking/avail/services.do?txtJourneyDate="
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
