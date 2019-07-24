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
    $product->price = isset($_POST['price'])? $_POST['price']: 0;
    $product->old_price = isset($_POST['old_price'])? $_POST['old_price']: 0;
    $product->quantity = isset($_POST['quantity'])? $_POST['quantity']: 0;
    $product->badge_id = isset($_POST['badge_id'])? $_POST['badge_id']: 7;
    $product->id_category = isset($_POST['id_category'])? $_POST['id_category']: NULL;

    //var_dump($_POST);
    $status;
    $message = "";

    if($product->id != 0 && $product->name)
    {
        $result = $product->productEdit();
        
        if($product->id_category)
        {
            $category_result = $product->updateProductCategory();
        }
        $status = 'Успех';
        $message .= 'Товар '.$product->name.' отредактирован.';
    } 
    else if($product->id == 0 && $product->name) {
        $product->productAdd();
        $product->addProductToCategory();
        $status = 'Успех';
        $message .= 'Товар '.$product->name.' добавлен';
    }
    else {
        $status = 'Ошибка';
        $message .= 'Товар '.$product->name.' НЕ был отредактирован.';
    }

    $uploaddir = dirname(dirname(dirname(dirname(__FILE__)))).'/img/product/';
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
                        $message .= "Файл ". $_FILES['files']['name'] ." был успешно загружен.\n";
                    } 
                    else {
                        $message .= "Ошибка загрузки файла:".$_FILES['files']['error'][$i];
                    }
                }
                else {
                    $message .= "Тип файла не подходит для загрузки.\n";
                }
            }
            else {
                $message .= "Размер файла больше 3Мб и он не будет загружен \n";
            }
        }
        
    }

    echo json_encode(array('status' => $status, 'message' => $message));