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
         
           $stmt->bindParam(':table',$this->table);
           $stmt->bindParam(':email',$this->email);
           
           $stmt = $this->conn->prepare($query);
           $stmt->execute();
           return $stmt;
        }
    }