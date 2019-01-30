# 照片随便

本项目是一个网站， 可以将家庭照片发布在一个web端，以供浏览或者填写一些基本信息，如照片的时间，地点，人物，描述等。有了这些属性信息就可以生成一些统计信息，图表等。初衷是培养小学低龄儿童的键盘输入能力和写话能力。

## 主要模块
本项目分为四个个模块:

1. ### UI: 
    这部分使用[react-admin](https://github.com/marmelab/react-admin)构建。 相应的目录为/web。 这部分的打包功能并未完成，暂时使用**webpack**内置的**dev-server**进行发布。你可以访问**http://localhost:3000**并使用Admin/Admin进行登录
    ```sh
    cd /web
    npm install
    npm start
    ```


2. ### Service: 
    这部分使用**Spring boot**构建，使用Spring boot内置的**tomcat**进行发布, 端口为7000.

    ```sh
    cd service 
    mvn spring-boot:run -Dspring-boot.run.arguments=--Dmaven.test.skip=true
    ```

3. ### DB:
    使用mysql作为DB， 提供了dockerfile
    ```
    cd mysql
    docker build -t db:v1
    ./init.sh
    ```

4. ### Scan: 
    改部分负责扫描照片目录并将所有的照片信息存入mysql然后使用建立软连接的方式把照片发布在web container中
    ```
    cd util
    ./init.sh
    ```


