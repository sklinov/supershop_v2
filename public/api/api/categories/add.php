<?php
    include_once '../../config/Database.php';
    include_once '../../models/Category.php';

    $database = new Database();
    $db = $database->connect();

    $category = new Category($db);
    
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: X-Requested-With');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

    $_POST = json_decode(file_get_contents('php://input'), true);

    $category->name = isset($_POST['name'])? $_POST['name']: 'default';

    //var_dump($_POST);

    if($category->name)
    {
        $result = $category->categoryAdd();
    }
    echo json_encode("category added",true);