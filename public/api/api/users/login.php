<?php
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

    // if($user->email && $user->password)
    // {
    //     $result = $user->userLogin();
    //     $temp = $result->fetchAll();
    //     //$user->user_logged_in = $temp[0][0];
    //     $_SESSION['user_id'] = $user->id;
    // }

    if($user->email && $user->password)
    {   
        $result = $user->userLogin();
        $num = $result->rowCount();

        if($num > 0) {
            $user_add = array();
            $user_arr['data'] = array();
            while($row = $result->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $user_item = array (
                    'id' => $id,
                    'name' => $name,
                    'hash' => $hash,
                    'phone' => $phone,
                    'email' => $email,
                    'city' => $city,
                    'street' => $street,
                    'building' => $building,
                    'flat' => $flat
                );
                //Проверка пароля
                if(password_verify($user->password, $user_item['hash'])) {
                    //$_SESSION['user_id'] = $user_item['user_id'];
                    //$_SESSION['timeshift'] = $user_item['timeshift'];
                    unset($user_item['hash']);
                    array_push($user_arr['data'],$user_item);
                }
            }
            if(isset($user_arr['data'])) {
                $user_arr['status'] = 'success';
                echo json_encode($user_arr['data'][0],true);
            }
            else {
                echo json_encode(
                    array('message' => 'Wrong password',
                          'status' => 'fail')
                );
            }
        } else {
            //Пользователь не найден
            echo json_encode(
                array('message' => 'No users found with username entered',
                      'status' => 'fail')
            );
        }   
    }

    

    //header('Content-type: application/json');
    

    //echo $user->email, $user->password;
    