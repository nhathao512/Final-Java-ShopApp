# 🛒ONLINE STORE

<p>This is an Angular (Frontend) and Java Spring Boot (Backend) application using Docker and MySQL.</p>

## Prerequisites

<li>Java JDK 8 or higher</li>
<li>MySQL Server</li>
<li>IntelliJ IDEA</li>
<li>Docker</li>
<li>Visual Studio Code</li>

## Running the Application

> First clone the project: 
<pre>
    <code id="code">git clone https://github.com/nhathao512/Final-Java-ShopApp.git</code><button class="copy-btn" onclick="copyCode()"></button>
</pre>

> For the Frontend

* Go to the shopapp-angular folder: cd shopapp-angular
* Download yarn: 
<pre>
    <code id="code">npm install -g yarn</code><button class="copy-btn" onclick="copyCode()"></button>
</pre>
* Download the package: 
<pre>
    <code id="code">yarn install</code><button class="copy-btn" onclick="copyCode()"></button>
</pre>
* Run code:
<pre>
    <code id="code">yarn start:dev</code><button class="copy-btn" onclick="copyCode()"></button>
</pre>

> For the Backend

* Open `"cmd"` and navigate to `"cd"` the Final-Java-ShopApp folder
* Paste the commands in the following order:
* Step 1: 
<pre>
    <code id="code">docker-compose -f ./deployment.yaml up -d mysql8-container</code><button class="copy-btn" onclick="copyCode()"></button>
</pre>
* Step 2: 
<pre>
    <code id="code">docker-compose -f ./deployment.yaml up -d phpmyadmin8-container</code><button class="copy-btn" onclick="copyCode()"></button>
</pre>
* Step 3: 
<pre>
    <code id="code">docker-compose -f ./deployment.yaml up -d redis-container</code><button class="copy-btn" onclick="copyCode()"></button>
</pre>
* Step 4: `docker-compose -f ./kafka-deployment.yaml up -d zookeeper-01`
* Step 5: `docker-compose -f ./kafka-deployment.yaml up -d zookeeper-02`
* Step 6: `docker-compose -f ./kafka-deployment.yaml up -d zookeeper-03`
* Step 7: `docker-compose -f ./kafka-deployment.yaml up -d kafka-broker-01`

> Open browser
* Go to [localhost:8100](https://localhost:8100)
* username: `root`
* password: `Abc123456789@`
* Finally import the ShopApp.sql file

## Author
* [Võ Nhật Hào](https://github.com/nhathao512)

* [Đặng Thành Nhân](https://github.com/nhandang02)

* [Nguyễn Thành Nhân](https://github.com/thanhnhanzxc)

### Thanks for visting our project! 
