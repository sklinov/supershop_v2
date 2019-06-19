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
            $query = "SELECT *
                FROM ".$this->table."
                WHERE email = '".$this->email."' AND
                      password = '".$this->password."'";

           $stmt = $this->conn->prepare($query);
           $stmt->execute();
           return $stmt;
        }
    }