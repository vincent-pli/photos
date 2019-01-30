本项目是一个网站，分为三个模块：
- UI： 这部分使用[react-admin](https://github.com/marmelab/react-admin)构建。 相应的目录为/web。 这部分的打包功能并未完成，暂时使用**webpack**内置的**dev-server**进行发布。
```
    cd /web
    npm install
    npm start
```
你可以访问**http://localhost:3000** 并以Admin/Admin进行登录

- Service： 这部分使用**Spring boot**构建，使用Spring boot内置的**tomcat**进行发布。
```
    cd service 
    mvn spring-boot:run -Dspring-boot.run.arguments=--Dmaven.test.skip=true
```
端口为7000
- DB： 使用mysql作为DB， 提供了dockerfile
```
    cd mysql
    docker build -t db:v1
    ./init.sh
```

-- Scan: 改部分负责扫描照片目录并将所有的照片信息存入mysql然后使用建立软连接的方式把照片发布在web container中
```
    cd util
    ./init.sh
```


