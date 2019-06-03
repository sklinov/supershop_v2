<?php
    class Category {
        //Database
        private $conn;
        private $table = "category";

        //Category properties
        public $id;
        public $name;
        public $title;
        public $description;

        //Constructor with DB
        public function __construct($db) {
            $this->conn = $db;
        }
        //Get Categories list with props
        public function getAllCategories() {
            //Create query
            $query = "SELECT * FROM ".$this->table;
           //Prepared statement
           $stmt = $this->conn->prepare($query);
           //Execute query
           $stmt->execute();
           return $stmt;
        }
    }