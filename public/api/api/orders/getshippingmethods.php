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

    $shipping = new Order($db);

    //Get product images
    $result = $shipping->getShippingMethods();
    
    //Number of rows returned
    $num = $result->rowCount();

    if($num > 0) {
        //Array of products
        $shippings_arr = array();
        $shippings_arr['data'] = array();
        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $shipping_item = array(
               'id'     => $id,
               'shipping'        => $shipping,
            );
            // Push extracted to ['data']
            array_push($shippings_arr['data'], $shipping_item);
        }
        //Convert to JSON and putput
        echo json_encode($shippings_arr);
    } else {
        //No products
        echo json_encode(
            array('message' => 'No shippings returned from database')
        );
    }