<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../config/Database.php';
    include_once '../../models/Order.php';

    //Instantiate Database object and connect
    
    $database = new Database();
    $db = $database->connect();

    //Instantiate product object

    $product = new Order($db);

    $product->id = isset($_GET['id'])? $_GET['id'] : NULL;
    if(isset($product->id)){
    
    $result = $product->getProductsByOrderId();
    
    //Number of rows returned
    $num = $result->rowCount();

    if($num > 0) {
        //Array of products
        $products_arr = array();
        $products_arr['data'] = array();
        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $product_item = array(
               'id_order'     => $id_order,
               'id_product'   => $id_product,
               'name'         => $name,
               'price'        => $price,
               'quantity'     => $quantity,  
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
    }
    