package com.vadrin.rtcbusticketwatch.services;

import com.vadrin.rtcbusticketwatch.models.ExceptionWhileFetchingFromCorporation;
import com.vadrin.rtcbusticketwatch.models.Request;

public interface BusService {

  public int getNumberOfAvailabeSeats(Request request) throws ExceptionWhileFetchingFromCorporation;
}
