<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../config/Database.php';
    include_once '../../models/User.php';

    //Instantiate Database object and connect
    
    $database = new Database();
    $db = $database->connect();

    //Instantiate Product object

    $user = new User($db);

    $user->id = isset($_GET['id'])? $_GET['id'] : NULL;
    //Get user info
    
    $result = $user->getUserInfoById();
    
    //Number of rows returned
    $num = $result->rowCount();

    if($num > 0) {
        //Array of products
        $users_arr = array();
        $users_arr['data'] = array();
        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $user_item = array(
               'user_id'     => $user_id,
               'user_name'   => $user_name,
               'user_email'  => $user_email,
               'user_phone'  => $user_phone,
               'user_city'   => $user_city,
               'user_street' => $user_street,
               'user_building'=>$user_building,
               'user_flat'   =>$user_flat
            );
            // Push extracted to ['data']
            array_push($users_arr['data'], $user_item);
        }
        //Convert to JSON and putput
        echo json_encode($users_arr);
    } else {
        //No products
        echo json_encode(
            array('message' => 'No users returned from database')
        );
    }