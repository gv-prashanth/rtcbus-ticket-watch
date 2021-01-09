package com.vadrin.rtcbusticketwatch.services;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
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
    String response = restTemplate
        .postForObject("https://www.apsrtconline.in/oprs-web/forward/booking/avail/services.do?txtJourneyDate="
            + request.getJourneyDate() + "&startPlaceId=" + request.getStartPlaceId() + "&endPlaceId="
            + request.getEndPlaceId(), null, String.class);
    Pattern pattern = Pattern.compile("fwTotalSeats\" value=\"(.*?)\"");
    Matcher matcher = pattern.matcher(response);
    if (matcher.find()) {
      return Integer.valueOf(matcher.group(1));
    }
    throw new ExceptionWhileFetchingFromCorporation();
  }

}
