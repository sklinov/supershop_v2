<?php
    include_once '../../config/Database.php';
    include_once '../../models/Product.php';

    $database = new Database();
    $db = $database->connect();

    $product = new Product($db);
    
    // header('Access-Control-Allow-Origin: *');
    // header('Access-Control-Allow-Headers: X-Requested-With');
    // header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

    // $_POST = json_decode(file_get_contents('php://input'), true);

    $product->id = isset($_POST['id'])? $_POST['id']: NULL;
    $product->name = isset($_POST['name'])? $_POST['name']: NULL;
    $product->description = isset($_POST['description'])? $_POST['description']: NULL;
    $product->sku = isset($_POST['sku'])? $_POST['sku']: NULL;
    $product->price = isset($_POST['price'])? $_POST['price']: NULL;
    $product->quantity = isset($_POST['quantity'])? $_POST['quantity']: NULL;
    $product->badge_id = isset($_POST['badge_id'])? $_POST['badge_id']: NULL;
    $product->id = isset($_POST['id'])? $_POST['id']: NULL;


    // var_dump($_POST);
    var_dump($_FILES);

    $uploaddir = dirname(dirname(dirname(dirname(__FILE__)))).'/img/product';
    
    if(isset($_FILES['files']))
    {   
        $num_of_files = count($_FILES['files']['name']);
        for($i=0;$i<$num_of_files;$i++)
        {
            if($_FILES['files']['size'][$i]<=3145728) {
                if($_FILES['files']['type'][$i]=='image/jpeg' || 
                $_FILES['files']['type'][$i]=='image/png'  || 
                $_FILES['files']['type'][$i]=='image/svg'  ||
                $_FILES['files']['type'][$i]=='image/gif') 
                {
                    $uploadfile = $uploaddir.$product->id."_".time()."__".basename($_FILES['files']['name'][$i]);
                    if (move_uploaded_file($_FILES['files']['tmp_name'][$i], $uploadfile)) {
                        $product->image_url = $product->id."_".time()."__".basename($_FILES['files']['name'][$i]);
                        $product->addImageByProductId();
                        //echo "Файл ". $_FILES['files']['name'] ." был успешно загружен.\n";
                    } 
                    else {
                        echo "Ошибка загрузки файла:".$_FILES['files']['error'][$i];
                    }
                }
                else {
                    echo "Тип файла не подходит для загрузки.\n";
                }
            }
            else {
                echo "Размер файла больше 3Мб и он не будет загружен \n";
            }
        }
        
    }

    if($product->id && 
        $product->name)
    {
        $result = $product->productEdit();
        echo json_encode("product edited",true);
    } else {
        echo json_encode("product NOT edited",true);
    }