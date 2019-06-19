<?php
    session_start();

    include_once '../../config/Database.php';
    include_once '../../models/User.php';

    $database = new Database();
    $db = $database->connect();

    $user = new User($db);
    
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: X-Requested-With');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

    $_POST = json_decode(file_get_contents('php://input'), true);

    $user->email = isset($_POST['email'])? $_POST['email']: 'default';
    $user->password = isset($_POST['password'])? $_POST['password']: 'default';

    //var_dump($_POST);

    if($user->email && $user->password)
    {
        $result = $user->userLogin();
        $temp = $result->fetchAll();
        //$user->user_logged_in = $temp[0][0];
        $_SESSION['user_id'] = $user->id;
    }
    echo json_encode($temp[0],true);

    //header('Content-type: application/json');
    

    //echo $user->email, $user->password;
    