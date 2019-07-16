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

    $status = new Order($db);

    //Get product images
    $result = $status->getStatuses();
    
    //Number of rows returned
    $num = $result->rowCount();

    if($num > 0) {
        //Array of products
        $statuses_arr = array();
        $statuses_arr['data'] = array();
        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $status_item = array(
               'id_status'     => $id_status,
               'status'        => $status,
               'status_color'  => $status_color
            );
            // Push extracted to ['data']
            array_push($statuses_arr['data'], $status_item);
        }
        //Convert to JSON and putput
        echo json_encode($statuses_arr);
    } else {
        //No products
        echo json_encode(
            array('message' => 'No statuses returned from database')
        );
    }