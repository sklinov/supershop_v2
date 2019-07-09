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
    $result = $product->getProductImagesById();
    
    //Number of rows returned
    $num = $result->rowCount();

    if($num > 0) {
        //Array of products
        $images_arr = array();
        $images_arr['data'] = array();
        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $image_item = array(
               'image_id'          => $image_id,
               'image_main'        => $image_main,
               'image_url'         => $image_url,
               'product_id'        => $product_id,
            );
            // Push extracted to ['data']
            array_push($images_arr['data'], $image_item);
        }
        //Convert to JSON and putput
        echo json_encode($images_arr);
    } else {
        //No products
        echo json_encode(
            array('message' => 'No products returned from database')
        );
    }