package com.vadrin.rtcbusticketwatch.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import com.vadrin.rtcbusticketwatch.models.Request;

@Service
public class NotificationService {

  @Autowired
  private JavaMailSender javaMailSender;

  public void notify(Request request, int prev, int current) {
    try {
      String notification = "New " + request.getCorporation() + " seats available. Prev: " + prev
          + ", Current: " + current;
      System.out.println(notification);
      SimpleMailMessage msg = new SimpleMailMessage();
      msg.setTo(request.getEmail());
      msg.setSubject("RTC Bus Alert");
      msg.setText(notification);
      javaMailSender.send(msg);
      System.out.println("Email Sent!");
    } catch (Exception e) {
      e.printStackTrace();
      System.out.println("Failed to send Email!");
    }
  }

  public void subscribed(Request request) {
    try {
      String notification =
          "You have now subscribed to alerts from RTC Bus Ticket watch. You will be notified as soon as new seats / bus becomes available. Remember that you can always delete your subscription by visiting back our website.";
      System.out.println(notification);
      SimpleMailMessage msg = new SimpleMailMessage();
      msg.setTo(request.getEmail());
      msg.setSubject("RTC Bus Alert");
      msg.setText(notification);
      javaMailSender.send(msg);
      System.out.println("Email Sent!");
    } catch (Exception e) {
      e.printStackTrace();
      System.out.println("Failed to send Email!");
    }
  }

  public void deleted(Request request) {
    try {
      String notification = "You have succesfully unsubscribed from RTC Bus Ticket alert.";
      System.out.println(notification);
      SimpleMailMessage msg = new SimpleMailMessage();
      msg.setTo(request.getEmail());
      msg.setSubject("RTC Bus Alert");
      msg.setText(notification);
      javaMailSender.send(msg);
      System.out.println("Email Sent!");
    } catch (Exception e) {
      e.printStackTrace();
      System.out.println("Failed to send Email!");
    }
  }

}
