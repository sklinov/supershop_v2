<?php
    include_once '../../config/Database.php';
    include_once '../../models/Order.php';
    include_once '../../models/User.php';

    $database = new Database();
    $db = $database->connect();

    $order = new Order($db);
    $user = new User($db);

    var_dump($_POST);

    $order->id = isset($_POST['id'])? $_POST['id']: NULL;
    $order->status = isset($_POST['status'])? json_decode($_POST['status'], true): NULL;
    $order->products = isset($_POST['products'])? json_decode($_POST['products'], true): NULL;
    $order->total = isset($_POST['total'])? $_POST['total']: NULL;
    $order->comment = isset($_POST['comment'])? $_POST['comment']: NULL;
    $order->shipping = isset($_POST['shipping'])? json_decode($_POST['shipping'], true): NULL;
   
    $user_data = isset($_POST['user'])? json_decode($_POST['user'], true): NULL; 
    
    $user->id = isset($user_data['id'])? $user_data['id']: NULL;
    $user->name = isset($user_data['name'])? $user_data['name']: NULL;
    $user->email = isset($user_data['email'])? $user_data['email']: NULL;
    $user->phone = isset($user_data['phone'])? $user_data['phone']: NULL;
    $user->city = isset($user_data['city'])? $user_data['city']: 0;
    $user->street = isset($user_data['street'])? $user_data['street']: 0;
    $user->building = isset($user_data['building'])? $user_data['building']: 0;
    $user->flat = isset($user_data['flat'])? $user_data['flat']: 0;

    if($user->id != 0 && $user->name)
    {
        $result = $user->userEdit();
        echo json_encode("user edited",true);
    } 

    if($order->id != 0)
    {
        $result = $order->orderEdit();
        if($result)
        {
            echo json_encode("order edited",true);
        }
        else {
            echo json_encode("order NOT edited",true);
        }
    } 