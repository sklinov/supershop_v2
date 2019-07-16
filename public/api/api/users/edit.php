<?php
    include_once '../../config/Database.php';
    include_once '../../models/User.php';

    $database = new Database();
    $db = $database->connect();

    $user = new User($db);

    $user->id = isset($_POST['id'])? $_POST['id']: NULL;
    $user->name = isset($_POST['name'])? $_POST['name']: NULL;
    $user->email = isset($_POST['email'])? $_POST['email']: NULL;
    $user->phone = isset($_POST['phone'])? $_POST['phone']: NULL;
    $user->city = isset($_POST['city'])? $_POST['city']: 0;
    $user->street = isset($_POST['street'])? $_POST['street']: 0;
    $user->building = isset($_POST['building'])? $_POST['building']: 0;
    $user->flat = isset($_POST['flat'])? $_POST['flat']: 0;

    if($user->id != 0 && $user->name)
    {
        $result = $user->userEdit();
        echo json_encode("user edited",true);
    } 