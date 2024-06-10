# Hola, Soy Cristian! 👋

## Proyecto E-Commerce BackEnd

Este proyecto fue creado con el fin de aplicar los conocimientos adquiridos a lo largo del curso de BackEnd.


## Sobre el proyecto

- Esta aplicación fue creada con NodeJs para el BackEnd y ReactJs para el FrontEnd
- Clonar: https://github.com/CristianDF23/Ecommerce_CFernandez.git
- Luego de clonar, se debe instalar las dependencias por medio de npm i.
- La APP por medio de un metodo Factory permite elegir con que tipo de persistencia trabajar (mongoDB o FileSystem)

### Ambientes de trabajo

#### Desarrollo

Este ambiente de trabajo puede almacenar los datos en una base de datos en mongoDB o por medio de FileSystem.

Para iniciar como desarrollador utilizando mongo:

- npm run start:dev -- --persist mongoDB

Para iniciar como desarrollador utilizando FileSystem:

- npm run start:dev -- --persist fileSystem

#### Testing

Este ambiente de trabajo almacena momentaneamente los datos en una base de datos en mongoDB, los cuales persisten unicamente mientras se ejecuta el test, luego son eliminados.

Para iniciar en el ambiente de test:

- npm run start:test

#### Produccion

Este ambiente de trabajo almacena los datos en una base de datos en mongoDB.

Para iniciar como produccion:

- npm run start:prod

### Almacenamiento de datos

#### MongoDb

La aplicación cuenta con una base de datos en MongoDb. En donde se crearon las siguientes colecciones:

- products: colección donde se almacenan todos los datos relacionados a los productos.

- carts: en esta colección se guardan los datos cargados por el usuario al momento de comprar.

- users: contiene todos los usuario que se registran en la aplicación.

- sessions: almacena datos relacionados a la sesion de los usuarios.

- tickets: contiene la información de la compra de cada usuario.

#### FileSystem

Almacena las mismas colecciones que mongoDB pero lo hace en archivos JSON creados en el servidor.

### Documentación

La app cuenta con directorio denominado doc, el cual tiene documentado cada endpoint de las diferentes api, permitiendo ver la funcion de cada uno.

### Información de productos e imágenes

Las muestras de imágenes, como así también de datos (precios, modelos, marcas, descripción), fueron obtenidos de las siguientes paginas oficiales:

- www.nike.com.ar
- www.adidas.com.ar




