<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../config/Database.php';
    include_once '../../models/Order.php';

    //Instantiate Database object and connect
    
    $database = new Database();
    $db = $database->connect();

    //Instantiate Order object

    $order = new Order($db);

    $order->id = isset($_GET['id'])? $_GET['id'] : NULL;
    if(isset($order->id)){
    
    $result = $order->getOrderInfoById();
    
    //Number of rows returned
    $num = $result->rowCount();

    if($num > 0) {
        //Array of products
        $orders_arr = array();
        $orders_arr['data'] = array();
        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $order_item = array(
               'id'     => $id,
               'total'  => $total,
               'datetime'  => $datetime,
               'comment' => $comment,
               'id_user' => $id_user,
               'name' => $name,
               'email'   => $email,
               'phone'   => $phone,
               'city'   => $city,
               'street'   => $street,
               'building'   => $building,
               'flat'   => $flat,
               'id_shipping'   => $id_shipping,
               'shipping'   => $shipping,
               'id_status'  => $id_status,
               'status'  => $status,
               'status_color'  => $status_color,  
            );
            // Push extracted to ['data']
            array_push($orders_arr['data'], $order_item);
        }
        //Convert to JSON and putput
        echo json_encode($orders_arr);
        } else {
            //No products
            echo json_encode(
                array('message' => 'No orders returned from database')
            );
        }
    }
    