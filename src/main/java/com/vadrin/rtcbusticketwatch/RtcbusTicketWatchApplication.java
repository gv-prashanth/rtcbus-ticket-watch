package com.vadrin.rtcbusticketwatch;

import java.util.Properties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class RtcbusTicketWatchApplication {

  public static void main(String[] args) {
    SpringApplication application = new SpringApplication(RtcbusTicketWatchApplication.class);
    Properties properties = new Properties();
    properties.put("spring.mail.username", System.getenv("smtpuser"));
    properties.put("spring.mail.password", System.getenv("smtppass"));
    application.setDefaultProperties(properties);
    application.run(args);
  }

}
