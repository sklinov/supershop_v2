<?php
    class Database {
        //Database Parameters
        private $host = "94.154.12.56";
        private $db_name = "superstore";
        private $username = "superstore";
        private $password = "wewrDMijWFA0yxZH";
        private $conn;

        //Database connect 
        public function connect() {
            $this->conn = null;

            try {
                $this->conn = new PDO('mysql:host='.$this->host.';
                                       dbname='.$this->db_name,
                                       $this->username, 
                                       $this->password);
                $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch(PDOException $e) {
                echo 'Connection error:'. $e->getMessage();
            }
            return $this->conn;
        }
        
    }
