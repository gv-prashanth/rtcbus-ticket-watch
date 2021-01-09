package com.vadrin.rtcbusticketwatch.models;

public class Request {

  private String startPlaceId;
  private String endPlaceId;
  private String journeyDate;
  private Corporation corporation;
  private boolean isNotified;
  private int prevSeatCount;
  private String notificationMessage;

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

  public boolean isNotified() {
    return isNotified;
  }

  public void setNotified(boolean isNotified) {
    this.isNotified = isNotified;
  }

  public int getPrevSeatCount() {
    return prevSeatCount;
  }

  public void setPrevSeatCount(int prevSeatCount) {
    this.prevSeatCount = prevSeatCount;
  }

  public String getNotificationMessage() {
    return notificationMessage;
  }

  public void setNotificationMessage(String notificationMessage) {
    this.notificationMessage = notificationMessage;
  }

  public Request() {
    super();
    // TODO Auto-generated constructor stub
  }

}
