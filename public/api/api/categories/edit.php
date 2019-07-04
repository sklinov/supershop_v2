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

    $category->id = isset($_POST['id'])? $_POST['id']: NULL;
    $category->name = isset($_POST['name'])? $_POST['name']: NULL;
    $category->description = isset($_POST['description'])? $_POST['description']: NULL;
    $category->title = isset($_POST['title'])? $_POST['title']: NULL;

    //var_dump($_POST);

    if($category->id && 
        $category->name)
    {
        $result = $category->categoryEdit();
        echo json_encode("category edited",true);
    } else {
        echo json_encode("category NOT edited",true);
    }
    