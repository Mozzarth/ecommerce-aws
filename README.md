## Preparación de ambiente local

1. Instalación de serverles

Para esto debemos instalar el paquete de serverles de manera global con el siguiente comando.

> npm i -g serverless@latest

2. Instalación de dependencias 

Para instalar las dependencias del proyecto debe ejecutar el comando: 

> npm i 


3. Conexión a base de datos. 

Los repositorios de este proyecto utiliza el ORM prisma.io el cual esta configurado para trabajar con una conexión mysql por defecto, para configurarla debemos dirigirnos al archivo .env y configurar la DATABASE_URL enviroment con nuestra cadena de conexion a base de datos.

 ``` mysql://<userdb>:<password>@<serverdb>:<port>/<namedb> ```

 PD: Dado que no tengamos una base de datos local y tengamos Docker podemos crear nuestro contenedor con las instrucciones del apartado DockerDb y seguir cada una de sus instrucciones. Si opta por esta opción, la cadena de conexión por defecto en el archivo .env no requerirá ser modificada a menos que en los pasos de la creación del contenedor se alteren parámetros de construcción como lo son las credenciales las cuales puede encontrar en el archivo Dockerfile, si se modifican estas deben ser modificadas en el archivo ./scripts/permisos.sql.

4. Construcción de la base de datos. 

Ejecutamos el siguiente comando para que prisma.io cree los objetos de base de datos necesarios para el proyecto. 

>  npx prisma db push

5. Correr proyecto.

Para ejecutar el proyecto en local debemos ejecutar el siguiente comando:

> npm run dev:aws

El comando anterior hará build del servicio, posteriormente lo montara sobre serverlees utilizando el plugin – offline con el fin de trabajar en local sin hacer un deploy a AWS




## Docker Db

1. Construcción de imagen

```docker build -t muncher-db:v1.0.0 .```

2. Creación de volumen 

```docker volume create muncher-db-volume```

3. Creación de contenedor

```docker run -d --name muncher-db -p 3306:3306  --mount src=muncher-db-volume,dst=/var/lib/mysql muncher-db:v1.0.0```

4. Correr container

 ```docker start muncher-db```
