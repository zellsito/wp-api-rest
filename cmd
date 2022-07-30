docker run -d --rm --name mysql -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -v mariadb_data:/var/lib/mysql mariadb
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

mysql -h 127.0.0.1 -p -u username laguia

docker container run \
        --name sql-maria \
        -e MYSQL_ROOT_PASSWORD=12345 \
        -e MYSQL_USER=username \
        -e MYSQL_PASSWORD=12345 \
        -e MYSQL_DATABASE=laguia \
        -p 3306:3306 \
        -d mariadb:10

docker container run --name sql-maria -e MYSQL_ROOT_PASSWORD=12345 -e MYSQL_USER=username -e MYSQL_PASSWORD=12345 -e MYSQL_DATABASE=laguia -p 3306:3306 -d mariadb:10
// mysql -u username -p laguia < init.sql
mysql -h 127.0.0.1 -p -u username laguia
source init.sql;


rm -rf build
cp -rf src/ build
npm run build
docker build -t la-guia .
docker run --name la-guia -d -p 5000:5000 la-guia

docker run --name la-guia -d -p 5000:5000 -e DB_HOST=172.17.0.2 -e DB_PASS=12345 la-guia