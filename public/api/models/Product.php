<?php
    class Product {
        //Database
        private $conn;
        private $table = "product";
        
        //Product properties
        public $id;
        public $id_category;
        public $name;
        public $description;
        public $sku;
        public $price;
        public $old_price;
        public $quantity;
        public $image_id;
        public $available;
        public $badge_id;
        public $badge_name;
        public $badge_color;
        public $image_urls;
        public $options;

        //Constructor with DB
        public function __construct($db) {
            $this->conn = $db;
        }
        //Get Product info
        public function getProductById() {
            // Create query
            $query = "SELECT
                            product.id AS id,
                            product.name AS name,
                            product.description AS description,
                            product.sku AS sku,
                            product.price AS price,
                            product.old_price AS old_price,
                            product.quantity AS quantity,
                            product_image.id AS image_id,
                            badge.id AS badge_id,
                            badge.name AS badge_name,
                            badge.color AS badge_color
                        FROM
                            product 
                        JOIN
                            product_image
                        ON
                            product_image.product_id = product.id
                        JOIN
                            badge
                        ON
                            badge.id = product.badge_id    
                        WHERE
                            product.id = :id
                        GROUP BY
                            product.id";
            //Prepared statement
            $stmt = $this->conn->prepare($query);
            //Bind ID (1 is for the first parameter)
            
            $stmt->bindParam(':id', $this->id);
            //$stmt->bindParam(':table',$this->table);
            
            //Execute query
            $stmt->execute();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            //Set properties
            
               $this->name          = $row['name'];
               $this->description   = $row['description'];
               $this->sku           = $row['sku'];
               $this->price         = $row['price'];
               $this->old_price     = $row['old_price'];
               $this->quantity      = $row['quantity'];
               $this->image_id      = $row['image_id'];
               $this->badge_id      = $row['badge_id'];
               $this->badge_name    = $row['badge_name'];
               $this->badge_color   = $row['badge_color'];
        }

        //Get All Products info
        public function getAllProducts() {
            
            $query = "SELECT
                            product_category.id_category AS id_category,
                            product.id AS id,
                            product.name AS name,
                            product.description AS description,
                            product.sku AS sku,
                            product.price AS price,
                            product.old_price AS old_price,
                            product.quantity AS quantity,
                            product_image.image_url AS image_url,
                            badge.id AS badge_id,
                            badge.name AS badge_name,
                            badge.color AS badge_color
                        FROM 
                            product_category
                        JOIN
                            product
                        ON
                            product.id = product_category.id_product
                        JOIN
                            product_image
                        ON
                            product_image.product_id = product.id AND product_image.image_main = 1
                        JOIN
                            badge
                        ON
                            badge.id = product.badge_id 
                        GROUP BY
                            product.id";
            //Prepared statement
            
            $stmt = $this->conn->prepare($query);
            //Execute query
            $stmt->execute();
            return $stmt;
        }

        //Get All Products By Category ID
        public function getProductsByCategoryId() {
            // Create query
        
            $query = "SELECT
                            product_category.id_category AS id_category,
                            product.id AS id,
                            product.name AS name,
                            product.description AS description,
                            product.sku AS sku,
                            product.price AS price,
                            product.old_price AS old_price,
                            product.quantity AS quantity,
                            product_image.image_url AS image_url,
                            badge.id AS badge_id,
                            badge.name AS badge_name,
                            badge.color AS badge_color
                        FROM 
                            product_category
                        JOIN
                            product
                        ON
                            product.id = product_category.id_product
                        JOIN
                            product_image
                        ON
                            product_image.product_id = product.id AND product_image.image_main = 1
                        JOIN
                            badge
                        ON
                            badge.id = product.badge_id
                        WHERE
                            product_category.id_category = :category 
                        GROUP BY
                            product.id";
            //Prepared statement
            $stmt->bindParam(':category',$this->category);
            
            $stmt = $this->conn->prepare($query);
            //Execute query
            $stmt->execute();
            return $stmt;
        }

        //Add a new product
        public function createNewProduct() {
            $query = 'INSERT INTO '.$this->table.'
            SET
                name =:name,
                description =:description,
                sku =:sku,
                price =:price,
                quantity =:quantity,
                badge_id =:badge_id
            ';
            //Prepare statement
            $stmt = $this->conn->prepare($query);

            //Clean data up
            //$this->name = htmlspecialchars(strip_tags($this->title));

            //Bind data
            $stmt->bindParam(':name',$this->name);
            $stmt->bindParam(':description',$this->description);
            $stmt->bindParam(':sku',$this->sku);
            $stmt->bindParam(':price',$this->price);
            $stmt->bindParam(':quantity',$this->quantity);
            $stmt->bindParam(':badge_id',$this->badge_id);

            // Execute query
            if($stmt->execute()) {
                return true;
            }
            //print error 
            echo "Error: %s".$stmt->error;
            return false; 
        }

        //get product images
        public function getProductImagesById() {
            $query = 'SELECT 
                        id AS image_id,
                        image_main AS image_main,
                        image_url AS image_url,
                        product_id AS product_id
                        FROM product_image
                        WHERE product_id = :id';
            //Prepare statement
            $stmt = $this->conn->prepare($query);

            //Bind data
            $stmt->bindParam(':id',$this->id);
            
            $stmt->execute();
            return $stmt; 
        }
        public function productEdit() {
            $query = 'UPDATE '.$this->table.'
                        SET 
                            name=:name,
                            description=:description,
                            sku=:sku,
                            price=:price,
                            old_price=:old_price,
                            quantity=:quantity,
                            badge_id=:badge_id
                      WHERE id=:id';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':name',$this->name);
            $stmt->bindParam(':description',$this->description);
            $stmt->bindParam(':sku',$this->sku);
            $stmt->bindParam(':price',$this->price);
            $stmt->bindParam(':old_price',$this->old_price);
            $stmt->bindParam(':quantity',$this->quantity);
            $stmt->bindParam(':badge_id',$this->badge_id);
            $stmt->bindParam(':id',$this->id);
            
            $stmt->execute();
            return $stmt; 
        }
        public function productAdd() {
            $query = 'INSERT INTO '.$this->table.'
                        SET 
                            name=:name,
                            description=:description,
                            sku=:sku,
                            price=:price,
                            old_price=:old_price,
                            quantity=:quantity,
                            badge_id=:badge_id';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':name',$this->name);
            $stmt->bindParam(':description',$this->description);
            $stmt->bindParam(':sku',$this->sku);
            $stmt->bindParam(':price',$this->price);
            $stmt->bindParam(':old_price',$this->old_price);
            $stmt->bindParam(':quantity',$this->quantity);
            $stmt->bindParam(':badge_id',$this->badge_id);
            if($stmt->execute())
            {
                $this->id = $this->conn->lastInsertId();
            }
            return $stmt; 
        }

        public function updateProductCategory() {
            $query = 'UPDATE `product_category`
                        SET 
                            id_category=:id_category
                      WHERE id_product=:id';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id_category',$this->id_category);
            $stmt->bindParam(':id',$this->id);
            
            $stmt->execute();
            return $stmt; 
        }

        public function addProductToCategory() {
            $query = 'INSERT INTO `product_category`
                        SET 
                            id_category=:id_category,
                            id_product=:id';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id_category',$this->id_category);
            $stmt->bindParam(':id',$this->id);
        
            $stmt->execute();
            return $stmt; 
        }

        public function addImageByProductId() {
            $query = 'INSERT INTO `product_image`
                        SET product_id=:product_id,
                            image_url=:image_url
            ';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':product_id',$this->id);
            $stmt->bindParam(':image_url',$this->image_url);
            $stmt->execute();
            return $stmt; 
        }

        public function getOptionsByProductId() {
            $query = 'SELECT
                            `id_product` AS product_id,
                            `id_option` AS option_id,
                            `option`.`option_name` AS option_name
                        FROM
                            `product_option`
                        JOIN `option`
                        ON
                            `option`.`option_id` = `product_option`.`id_option`
                        WHERE
                            `id_product`= :id';
            //Prepare statement
            $stmt = $this->conn->prepare($query);

            //Bind data
            $stmt->bindParam(':id',$this->id);
            
            $stmt->execute();
            return $stmt; 
        }

        public function getBadges() {
            $query = 'SELECT 
                        id as badge_id,
                        name as badge_name,
                        color as badge_color
                      FROM badge';
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt;
        }
    }
