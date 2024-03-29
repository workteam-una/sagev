package com.backend.sagev.emailsender;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = {"http://localhost:4200",
                        "http://10.10.11.29:4200",
                        "http://localhost:8055",
                        "http://10.10.11.29:8055"}, 
                        allowedHeaders = "*",maxAge = 3600)
@RestController
@RequestMapping({"/mail"})
public class EmailController {
    // Esta clase es la que recibe las peteiciones de enviar corres
    private final EmailSenderService emailSenderService;

    public EmailController(EmailSenderService emailSenderService) {
        this.emailSenderService = emailSenderService;        
    }

    //Toma el objeto correo que llego por parametro y manda el correo
    @PostMapping("/sendemail")
    public ResponseEntity<?> sendEmail(@RequestBody EmailMessage emailMessage){
        this.emailSenderService.sendEmail(emailMessage.getTo(), emailMessage.getSubject(), emailMessage.getMessage());
        return ResponseEntity.ok("");
    }

}