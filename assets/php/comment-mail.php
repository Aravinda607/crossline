<?php
if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $to = 'navijaye@gmail.com';
    $subject = 'New message from your website';
    $body = "From: $name\nEmail: $email\n\nMessage:\n$message";

    if (mail($to, $subject, $body)) {
        echo 'Thank you for your message. We will be in touch soon.';
    } else {
        echo 'There was a problem sending the email. Please try again later.';
    }
}
?>