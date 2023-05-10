package com.backend.sagev.emailsender;

public interface EmailSenderService {
    void sendEmail(String to, String subject, String message);
}