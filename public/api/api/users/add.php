<?php
    include_once '../../config/Database.php';
    include_once '../../models/User.php';

    $database = new Database();
    $db = $database->connect();

    $user = new User($db);

    $user->id = isset($_POST['id'])? $_POST['id']: NULL;
    $user->name = isset($_POST['name'])? $_POST['name']: NULL;
    $user->password = isset($_POST['password'])? $_POST['password']: NULL;
    $user->email = isset($_POST['email'])? $_POST['email']: NULL;
    $user->phone = isset($_POST['phone'])? $_POST['phone']: '000';
    $user->city = isset($_POST['city'])? $_POST['city']: "Введите город";
    $user->street = isset($_POST['street'])? $_POST['street']: "Введите улицу";
    $user->building = isset($_POST['building'])? $_POST['building']: 0;
    $user->flat = isset($_POST['flat'])? $_POST['flat']: 0;

    if($user->id == NULL && $user->name && $user->email && $user->password)
    {
        $result = $user->userSignUp();
        if($user->message == "exists") {
            echo json_encode(array('status' => $user->message),true);    
        }
        else {
            echo json_encode(array('id' => $user->id),true);
        }
        
    } 