<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../config/Database.php';
    include_once '../../models/Product.php';

    //Instantiate Database object and connect
    
    $database = new Database();
    $db = $database->connect();

    //Instantiate Product object

    $product = new Product($db);

    $product->id = isset($_GET['id'])? $_GET['id'] : NULL;

    //Get product images
    $result = $product->getBadges();
    
    //Number of rows returned
    $num = $result->rowCount();

    if($num > 0) {
        //Array of products
        $badges_arr = array();
        $badges_arr['data'] = array();
        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $badge_item = array(
               'badge_id'     => $badge_id,
               'badge_name'   => $badge_name,
               'badge_color'  => $badge_color
            );
            // Push extracted to ['data']
            array_push($badges_arr['data'], $badge_item);
        }
        //Convert to JSON and putput
        echo json_encode($badges_arr);
    } else {
        //No products
        echo json_encode(
            array('message' => 'No badges returned from database')
        );
    }