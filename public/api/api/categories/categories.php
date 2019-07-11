<?php
   
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../config/Database.php';
    include_once '../../models/Category.php';

    
    $database = new Database();
    $db = $database->connect();

    $category = new Category($db);
    $result = $category->getAllCategories();
    $num = $result->rowCount();

    if($num > 0) {
        $cats_arr = array();
        $cats_arr['data'] = array();
        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $category_item = array(
               'id'          => $id,
               'name'        => $name,
               'title'       => $title,
               'quantity'    => $quantity,
               'description' => html_entity_decode($description)
            );
            array_push($cats_arr['data'], $category_item);
        }
        echo json_encode($cats_arr);
    } else {
        echo json_encode(
            array('message' => 'No categories returned from database')
        ); 
    }