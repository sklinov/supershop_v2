<?php
    //Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../config/Database.php';
    include_once '../../models/Category.php';

    //Instantiate Database object and connect
    $database = new Database();
    $db = $database->connect();

    //Instantiate Category object

    $category = new Category($db);

    //Get all categories information
    $result = $category->getAllCategories();
    //Number of rows returned
    $num = $result->rowCount();

    if($num > 0) {
        //Create array for categories
        $cats_arr = array();
        $cats_arr['data'] = array();
        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $category_item = array(
               'id'          => $id,
               'name'        => $name,
               'title'       => $title,
               'description' => html_entity_decode($description)
            );
            //Push extracted to ['data']
            array_push($cats_arr['data'], $category_item);
        }
        //Convert to JSON and output
        echo json_encode($cats_arr);
    } else {
        // The case when nothing returned
        echo json_encode(
            array('message' => 'No categories returned from database')
        ); 
    }