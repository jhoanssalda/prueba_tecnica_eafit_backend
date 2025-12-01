DROP TABLE IF EXISTS descuentos;
DROP TABLE IF EXISTS envios_terrestres;
DROP TABLE IF EXISTS envios_maritimos;
DROP TABLE IF EXISTS tipo_envios;
DROP TABLE IF EXISTS clientes;
DROP TABLE IF EXISTS productos;

CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_identificacion CHAR(2) NOT NULL,
    numero_identificacion VARCHAR(12) NOT NULL, 
    nombres VARCHAR(20) NOT NULL,
    apellidos VARCHAR(30) NOT NULL,
    direccion VARCHAR(50) NOT NULL,
    correo_electronico VARCHAR(30) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,   
    descripcion VARCHAR(250) NOT NULL,
    unidades_disponibles INT(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tipo_envios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_tipo_envio VARCHAR(20) NOT NULL
);

CREATE TABLE envios_terrestres (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    tipo_producto INT NOT NULL,
    cantidad_producto INT(6) NOT NULL, 
    fecha_registro DATE NOT NULL,
    fecha_entrega DATE NOT NULL,
    bodega_entrega VARCHAR(50) NOT NULL,
    precio_envio INT(12) NOT NULL,
    descuento INT(6) NOT NULL,
    placa_vehiculo VARCHAR(6) NOT NULL,
    numero_guia VARCHAR(10) NOT NULL,
    CONSTRAINT FK1_ET FOREIGN KEY (id_cliente) REFERENCES clientes(id),
    CONSTRAINT FK2_ET FOREIGN KEY (tipo_producto) REFERENCES productos(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE envios_maritimos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    tipo_producto INT NOT NULL,
    cantidad_producto INT(6) NOT NULL, 
    fecha_registro DATE NOT NULL,
    fecha_entrega DATE NOT NULL,
    puerto_entrega VARCHAR(50) NOT NULL,
    precio_envio INT(12) NOT NULL,
    descuento INT(6) NOT NULL,
    numero_flota VARCHAR(7) NOT NULL,
    numero_guia VARCHAR(10) NOT NULL,
    CONSTRAINT FK1_EM FOREIGN KEY (id_cliente) REFERENCES clientes(id),
    CONSTRAINT FK2_EM FOREIGN KEY (tipo_producto) REFERENCES productos(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE descuentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_producto INT NOT NULL,
    id_tipo_envio INT NOT NULL,
    id_envio INT NOT NULL,
    CONSTRAINT FK1_D FOREIGN KEY (id_cliente) REFERENCES clientes(id),
    CONSTRAINT FK2_D FOREIGN KEY (id_producto) REFERENCES productos(id),
    CONSTRAINT FK3_D FOREIGN KEY (id_tipo_envio) REFERENCES tipo_envios(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO clientes (tipo_identificacion, numero_identificacion, nombres, apellidos, direccion, correo_electronico)
VALUES
('CC', '1002003001', 'Juan', 'Pérez Gómez', 'Calle 10 #20-30', 'juan.perez@example.com'),
('CC', '1002003002', 'María', 'López Ramírez', 'Carrera 15 #45-60', 'maria.lopez@example.com'),
('TI', '1002003003', 'Carlos', 'Martínez Torres', 'Av. Oriental #12-34', 'carlos.mtz@example.com'),
('CC', '1002003004', 'Ana', 'García Mejía', 'Calle 50 #70-80', 'ana.garcia@example.com'),
('CE', '1002003005', 'Luis', 'Rodríguez Salazar', 'Carrera 25 #100-20', 'luis.rodriguez@example.com');

INSERT INTO productos (nombre, descripcion, unidades_disponibles)
VALUES
('Laptop Lenovo ThinkPad', 'Portátil empresarial con procesador Intel i5 y 8GB RAM', 200),
('Mouse Inalámbrico Logitech', 'Mouse ergonómico con conexión Bluetooth', 200),
('Monitor Samsung 24"', 'Monitor LED Full HD de 24 pulgadas', 200),
('Teclado Mecánico Redragon', 'Teclado gamer con retroiluminación RGB', 200),
('Disco Duro Externo Seagate 1TB', 'Almacenamiento portátil USB 3.0', 200);

INSERT INTO tipo_envios (nombre_tipo_envio) 
VALUES
('Envio Terrestre'),
('Envio Maritimo');