<?php

    class User {
        private $conn;
        private $table = "user";
        
        public $id;
        public $name;
        public $email;
        public $password;
        public $city;
        public $street;
        public $building;
        public $flat;
        
        
        
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
                             street as steret, 
                             building as building,
                             flat as flat
                FROM :table
                WHERE email = :email" ;
            $stmt = $this->conn->prepare($query);
           
           $stmt->bindParam(':table',$this->table);
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
    }