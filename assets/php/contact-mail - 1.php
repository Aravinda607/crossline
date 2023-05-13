<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $errors = [];

    // Validate inputs
    if (empty($_POST['country'])) {
        $errors[] = "Country is required";
    }

    if (empty($_POST['contact_number'])) {
        $errors[] = "Contact number is required";
    } elseif (!preg_match('/^[0-9]+$/', $_POST['contact_number'])) {
        $errors[] = "Contact number should only contain digits";
    }

    if (empty($_POST['date'])) {
        $errors[] = "Date is required";
    }

    if (empty($_POST['time'])) {
        $errors[] = "Time is required";
    }

    if (empty($_POST['message'])) {
        $errors[] = "Message is required";
    }

    // If there are no errors, send the email
    if (empty($errors)) {
        $to = 'kingslayerdota9@gmail.com';
        $subject = 'Reservation Request';

        $message = "Country: {$_POST['country']}\n";
        $message .= "Contact Number: {$_POST['contact_number']}\n";
        $message .= "Date: {$_POST['date']}\n";
        $message .= "Time: {$_POST['time']}\n";
        $message .= "Message: {$_POST['message']}\n";

        $headers = "From: {$_POST['email']}\r\nReply-To: {$_POST['email']}";

        if (mail($to, $subject, $message, $headers)) {
            echo "<p class='success-message'>Reservation request sent successfully.</p>";
        } else {
            echo "<p class='error-message'>Unable to send reservation request. Please try again later.</p>";
        }
    } else {
        echo "<ul class='error-list'>";
        foreach ($errors as $error) {
            echo "<li>$error</li>";
        }
        echo "</ul>";
    }
}
?>