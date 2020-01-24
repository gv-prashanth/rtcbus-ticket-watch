package com.vadrin.rtcbusticketwatch.services;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import com.vadrin.rtcbusticketwatch.models.Request;

public class RequestsRepository {

  private static Map<Request, Integer> requests = new HashMap<Request, Integer>();

  public static Set<Request> getRequests() {
    return requests.keySet();
  }

  public static void addRequest(Request request) {
    requests.put(request, -1);
  }
  
  public static int getPrevSeats(Request request) {
    return requests.get(request);
  }

  public static void setPrevSeats(Request request, int latestSeatsCount) {
    requests.put(request, latestSeatsCount);
  }

  public static void deleteRequest(Request reqToDelete) {
    requests.remove(reqToDelete);
  }


}
