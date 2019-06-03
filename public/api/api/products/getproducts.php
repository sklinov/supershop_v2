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

    //Get all products information
    $result = $product->getAllProducts();
    //Number of rows returned
    $num = $result->rowCount();

    if($num > 0) {
        //Array of products
        $products_arr = array();
        $products_arr['data'] = array();
        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $product_item = array(
               'id'          => $id,
               'name'        => $name,
               'description' => html_entity_decode($description),
               'sku'         => $sku,
               'price'       => $price,
               'old_price'   => $old_price,
               'quantity'    => $quantity,
               'image_id'    => $image_id,
               'badge_name'  => $badge_name,
               'badge_color' => $badge_color
            );
            // Push extracted to ['data']
            array_push($products_arr['data'], $product_item);


        }
        //Convert to JSON and putput
        echo json_encode($products_arr);
    } else {
        //No products
        echo json_encode(
            array('message' => 'No products returned from database')
        );
    }

