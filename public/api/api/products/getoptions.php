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
    $result = $product->getOptionsByProductId();
    
    //Number of rows returned
    $num = $result->rowCount();

    if($num > 0) {
        //Array of products
        $options_arr = array();
        $options_arr['data'] = array();
        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $option_item = array(
               'product_id'          => $product_id,
               'option_id'           => $option_id,
               'option_name'         => $option_name
            );
            // Push extracted to ['data']
            array_push($options_arr['data'], $option_item);
        }
        //Convert to JSON and putput
        echo json_encode($options_arr);
    } else {
        //No products
        echo json_encode(
            array('message' => 'No products returned from database')
        );
    }