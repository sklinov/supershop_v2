<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../config/Database.php';
    include_once '../../models/Order.php';

    //Instantiate Database object and connect
    
    $database = new Database();
    $db = $database->connect();

    //Instantiate Product object

    $order = new Order($db);

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: X-Requested-With');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

    //$_POST = json_decode(file_get_contents('php://input'), true);

    $order->id = isset($_POST['id_order'])? $_POST['id_order']: NULL;
    $order->id_status = isset($_POST['id_status'])? $_POST['id_status']: NULL;

    //Get product images

    if($order->id_status && $order->id)
    {
        $result = $order->changeStatusByOrderId();
        echo json_encode("status edited",true);
    } else {
        echo json_encode($_POST,true);
    }