<?php

    class Order {
        private $conn;
        private $table = "order";
        
        public $id;
        public $id_user;
        public $total;
        public $datetime;
        public $id_status;
        public $status;
        public $status_color;
        public $comment;
        public $id_shiping;
        public $shipping;
        public $products;
        public $user;

        public function __construct($db) {
            $this->conn = $db;
        }    

        public function getOrdersByUserId() {
            $query = "SELECT 
                        `orders`.id AS id,
                        `orders`.total AS total,
                        `orders`.datetime AS datetime,
                        `orders`.id_status AS id_status,
                        `status`.status AS status,
                        `status`.color AS status_color
                      FROM `orders`
                      JOIN `status` ON `status`.id = `orders`.id_status
                      WHERE id_user =:id_user";
                      
          $stmt = $this->conn->prepare($query);
          $stmt->bindParam(':id_user',$this->id_user);
           $stmt->execute();
           return $stmt;
        }

        public function getAllOrders() {
            $query = "SELECT 
                        `orders`.id AS id,
                        `user`.email AS user_email,
                        `orders`.total AS total,
                        `orders`.datetime AS datetime,
                        `orders`.id_status AS id_status,
                        `status`.status AS status,
                        `status`.color AS status_color
                      FROM `orders`
                      JOIN `status` ON `status`.id = `orders`.id_status
                      JOIN `user` ON `user`.id = `orders`.id_user";
                      
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt;
        }

        public function getOrderInfoById() {
            $query = "SELECT 
                            `orders`.id AS id,
                            `orders`.total AS total,
                            `orders`.datetime AS datetime,
                            `orders`.comment AS comment,
                            `orders`.id_user AS id_user,
                            `user`.name AS name,
                            `user`.email AS email,
                            `user`.phone AS phone,
                            `user`.city AS city,
                            `user`.street AS street,
                            `user`.building AS building,
                            `user`.flat AS flat,
                            `status`.id AS id_status,
                            `status`.status AS status,
                            `status`.color AS status_color,
                            `orders`.id_shipping AS id_shipping,
                            `shipping`.shipping AS shipping
                        FROM `orders`
                        LEFT JOIN `user` ON `user`.id=`orders`.id_user
                        LEFT JOIN `status` ON `status`.id=`orders`.id_status
                        LEFT JOIN `shipping` ON `shipping`.id=`orders`.id_shipping
                        WHERE orders.id=:id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id',$this->id);
            $stmt->execute();
            return $stmt;
        }

        public function getProductsByOrderId() {
            $query = "SELECT 
                        `order_product`.id_order AS id_order ,
                        `order_product`.id_product AS id_product,
                        `order_product`.price AS price,
                        `order_product`.quantity AS quantity,
                        `product`.name AS name
                      FROM `order_product`
                      JOIN `product` ON `product`.id=`order_product`.id_product
                      WHERE `order_product`.id_order=:id
            ";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id',$this->id);
            $stmt->execute();
            return $stmt;
        }

        public function addOrder() {

        }
        public function orderEdit() {
            if(
            $this->updateOrder() &&
            $this->updateOrderProduct())
            {
                return true;
            }
        }

        public function updateOrder() {
            $query = "UPDATE `orders`
                        SET 
                        total=:total,
                        id_status=:id_status,
                        comment=:comment,
                        id_shipping=:id_shipping
                        WHERE id=:id
            ";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id',$this->id);
            $stmt->bindParam(':id_status',$this->status['id']);
            $stmt->bindParam(':comment',$this->comment);
            $stmt->bindParam(':id_shipping',$this->shipping['id']);
            $stmt->bindParam(':total',$this->total);
            if($stmt->execute()) 
            { 
                return true;
            }
        }

        public function updateOrderProduct() {
            $success = false;

            $query = "DELETE FROM `order_product`
                      WHERE id=:id
            ";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id',$this->id);
            if($stmt->execute()) 
            { 
                $success=true;
            }

            foreach($this->products as $product)
            {
                $query = "INSERT INTO `order_product`
                      SET 
                      id_order =:id_order,
                      id_product =:id_product,
                      price =:price,
                      quantity =:quantity
                ";
                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(':id_order',$product['id_order']);
                $stmt->bindParam(':id_product',$product['id_product']);
                $stmt->bindParam(':price',$product['price']);
                $stmt->bindParam(':quantity',$product['quantity']);
            
                if($stmt->execute()) 
                { 
                    $success=true;
                }
                else {
                    $success=false;
                }
                
                }
            return $success;
        }


        public function getStatuses() {
            $query = "SELECT 
                        `status`.id AS id_status,
                        `status`.status AS status,
                        `status`.color AS status_color
                      FROM `status`
                      ";
                      
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt;
        }

        public function changeStatusByOrderId() {
            $query = "UPDATE `orders`
                      SET
                        id_status =:id_status
                      WHERE id =:id
                      ";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id_status',$this->id_status);          
            $stmt->bindParam(':id',$this->id);
            
            $stmt->execute();
            return $stmt;
        }

        public function getShippingMethods() {
            $query = "SELECT 
                        `shipping`.id AS id,
                        `shipping`.shipping AS shipping
                      FROM `shipping`
                      ";
                      
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt;
        }
}

