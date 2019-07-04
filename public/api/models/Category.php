<?php
    class Category {
        //Database
        private $conn;
        private $table = "category";

        //Category properties
        public $id;
        public $name;
        public $title;
        public $quantity;
        public $description;

        //Constructor with DB
        public function __construct($db) {
            $this->conn = $db;
        }
        //Get Categories list with props
        // public function getAllCategories() {
        //     //Create query
        //     $query = "SELECT * FROM ".$this->table;
        //    //Prepared statement
        //    $stmt = $this->conn->prepare($query);
        //    //Execute query
        //    $stmt->execute();
        //    return $stmt;
        // }
        private function doQuery($query) {
            
            $stmt->execute();
            return $stmt;
        } 

        public function getAllCategories() {
            //Create query
           $query = "SELECT
                        product_category.id_category AS pr_cat_cat_id,
                        id_product AS pr_cat_pr_id,
                        product.name AS productname,
                        categories.id,
                        categories.name,
                        categories.title,
                        categories.description,
                        COUNT(product_category.id_category) AS quantity
                    FROM
                        product
                    LEFT JOIN
                        product_category
                    ON
                        product_category.id_product = product.id
                    RIGHT JOIN
                        (
                    SELECT
                        *
                    FROM
                        category
                    ) AS categories
                    ON
                        categories.id = product_category.id_category
                    GROUP BY name
                    ORDER BY id ASC";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt;
           
        }
        
        public function categoryAdd() {
            $query = "INSERT INTO ".$this->table." VALUES (DEFAULT, :name, DEFAULT, DEFAULT)";
            $stmt = $this->conn->prepare($query);

            $stmt->bindParam(':name',$this->name);

            $stmt->execute();
            return $stmt;
        }

        public function categoryDelete() {
            $query = "DELETE FROM ".$this->table." WHERE id = :id";
            $stmt = $this->conn->prepare($query);

            $stmt->bindParam(':id',$this->id);

            $stmt->execute();
            return $stmt;
        }

        public function categoryEdit() {
            $query = "UPDATE ".$this->table." 
                        SET `name`=:name, 
                            `title`=:title,
                            `description`=:description 
                        WHERE id=:id";
            
            $stmt = $this->conn->prepare($query);

            $stmt->bindParam(':id',$this->id, PDO::PARAM_INT);
            $stmt->bindParam(':name',$this->name, PDO::PARAM_STR);
            $stmt->bindParam(':title',$this->title, PDO::PARAM_STR);
            $stmt->bindParam(':description',$this->description, PDO::PARAM_STR);
            

            // var_dump($stmt);
            // var_dump($this->table,$this->id, $this->name, $this->title, $this->description);

            $stmt->execute();
            
            return $stmt;
        }
    }