package com.vadrin.rtcbusticketwatch.models;

public class Request {

  private String startPlaceId;
  private String endPlaceId;
  private String journeyDate;
  private Corporation corporation;
  private String email;

  public String getStartPlaceId() {
    return startPlaceId;
  }

  public String getEndPlaceId() {
    return endPlaceId;
  }

  public String getJourneyDate() {
    return journeyDate;
  }

  public Corporation getCorporation() {
    return corporation;
  }

  public String getEmail() {
    return email;
  }

  public Request(String startPlaceId, String endPlaceId, String journeyDate,
      Corporation corporation, String email) {
    super();
    this.startPlaceId = startPlaceId;
    this.endPlaceId = endPlaceId;
    this.journeyDate = journeyDate;
    this.corporation = corporation;
    this.email = email;
  }

  public Request() {
    super();
    // TODO Auto-generated constructor stub
  }

}
