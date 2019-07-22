<?php

    class User {
        private $conn;
        private $table = "user";
        
        public $id;
        public $name;
        public $email;
        public $password;
        public $hash;
        public $city;
        public $street;
        public $building;
        public $flat;
        public $message;
        
        
        
        public function __construct($db) {
            $this->conn = $db;
        }

        public function userLogin() {
            $query = "SELECT id as id,
                             name as name,
                             password as hash,
                             phone as phone, 
                             email as email,
                             city as city,
                             street as street, 
                             building as building,
                             flat as flat
                FROM `user`
                WHERE email = :email" ;
            $stmt = $this->conn->prepare($query);
           
           $stmt->bindParam(':email',$this->email);
           
          
           $stmt->execute();
           return $stmt;
        }

        public function getAllUsers() {
            $query = "SELECT 
                        id AS user_id,
                        name AS user_name,
                        email AS user_email,
                        phone AS user_phone
                    FROM user";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt;
        }

        public function getUserInfoById() {
            $query = "SELECT 
                        id AS user_id,
                        name AS user_name,
                        email AS user_email,
                        phone AS user_phone,
                        city AS user_city,
                        street AS user_street,
                        building AS user_building,
                        flat AS user_flat
                    FROM user
                    WHERE id=:id";
            $stmt = $this->conn->prepare($query);

            $stmt->bindParam(':id',$this->id);
            $stmt->execute();
            return $stmt;
        }

        public function userEdit() {
            $query = "UPDATE user
                        SET 
                        name =:name,
                        email =:email,
                        phone =:phone,
                        city =:city,
                        street =:street,
                        building =:building,
                        flat =:flat
                    WHERE id=:id";
            
            $stmt = $this->conn->prepare($query);

            $stmt->bindParam(':id',$this->id);
            $stmt->bindParam(':name',$this->name);
            $stmt->bindParam(':email',$this->email);
            $stmt->bindParam(':phone',$this->phone);
            $stmt->bindParam(':city',$this->city);
            $stmt->bindParam(':street',$this->street);
            $stmt->bindParam(':building',$this->building);
            $stmt->bindParam(':flat',$this->flat);

            $stmt->execute();
            return $stmt;
        }

        public function editPassword() {
            $this->hash = password_hash($this->password, PASSWORD_DEFAULT);
            $query = "UPDATE user
                        SET password =:hash
                        WHERE id=:id";
            $stmt = $this->conn->prepare($query); 
            $stmt->bindParam(':id',$this->id);
            $stmt->bindParam(':hash',$this->hash);
            $stmt->execute();
            return $stmt;
        }

        public function userAdd() {
            if($this->userExists()) {
                $this->userEdit();
            } else {    
                if(!isset($this->password))
                {
                    $this->password = bin2hex(openssl_random_pseudo_bytes(1));    
                }
                $this->hash = password_hash($this->password, PASSWORD_DEFAULT);

                $query = "INSERT INTO user
                            SET 
                            password =:hash,
                            name =:name,
                            email =:email,
                            phone =:phone,
                            city =:city,
                            street =:street,
                            building =:building,
                            flat =:flat
                    ";
                $stmt = $this->conn->prepare($query);

                $stmt->bindParam(':hash',$this->hash);
                $stmt->bindParam(':name',$this->name);
                $stmt->bindParam(':email',$this->email);
                $stmt->bindParam(':phone',$this->phone);
                $stmt->bindParam(':city',$this->city);
                $stmt->bindParam(':street',$this->street);
                $stmt->bindParam(':building',$this->building);
                $stmt->bindParam(':flat',$this->flat);

                $stmt->execute();

                $this->id = $this->conn->lastInsertID();
                return $stmt;
                }     
        }

        public function userSignUp() {
            $exists = $this->userExists();
            //var_dump($exists);
            if($exists)
            {
                $this->message = 'exists';
                return;
            } else {
                $this->userAdd();
            }
        }

        public function userExists() {
            $query = "SELECT CASE WHEN EXISTS (
                SELECT *
                FROM `user`
                WHERE email=:email
            )
            THEN CAST(1 AS BINARY)
            ELSE CAST(0 AS BINARY) END";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':email',$this->email);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_NUM);
            //var_dump($result);
            if(intval($result[0])==1) {
                return true;
            }
            else if (intval($result[0])==0)
            {
                return false;
            }
        }
    }