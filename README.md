# MVC Exit Exam Project

Frontend + Backend Web Server Project for MVC Exit Exam

## Structures

Project นี้แบ่งออกเป็น 2 directories หลักๆ คือ

#### client

* Frontend server สำหรับให้ user ใช้งานเป็นหลัก 
* ใช้ Vue 3 + NodeJS Framework

#### server

* Backend server สำหรับให้ Frontend server ติดต่อเพื่อรับ, ส่ง, และประมวลผลข้อมูล
* ใช้ ExpressJS + NodeJS Framework

## Requirement

* NodeJS

## Initialization

ก่อนที่จะสามารถใช้งาน Server ทั้ง 2 ตัว จะต้องมีการ Initialize ก่อน โดยการใช้คำสั่ง `cd` เข้าไปที่ Directory ทั้ง 2 และใช้คำสั่งดังนี้

```
npm install 
```

หรือ Run Script `init.bat` เพื่อ Initialize ทั้งหมดก็ได้

## Running the servers

หลังจากที่ Initialize ไปแล้ว จะสามารถสั่งเริ่มต้น server locally ทั้งคู่ได้ด้วยคำสั่งข้างต้นในทั้ง 2 server (อย่าลืมที่จะ `cd` ไปที่ server directory ก่อน)

Note: หาก run server ผ่าน console จะต้องแยก console ไปของแต่ละ server

```
npm start 
```

หรือ Run Script `start_frontend.bat` กับ `start_backend.bat` เพื่อเริ่ม server ทั้ง 2 ตามลำดับก็ได้

เมื่อ run server ทั้งคู่แล้วจะสามารถเข้า Website เพื่อทดสอบการใช้งานผ่าน Browser ได้ที่ http://localhost:8081/

## Author

Sahachai Plangrit 63050197