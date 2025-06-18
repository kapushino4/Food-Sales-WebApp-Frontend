# Food Sales Frontend WebApp

เว็บแอปสำหรับดูเมนูอาหารและสั่งซื้อ เชื่อมต่อกับ Backend API

---

## รายละเอียดโปรเจกต์

โปรเจกต์นี้พัฒนาด้วย Angular Framework เพื่อสร้าง UI สำหรับแสดงรายการอาหารและจัดการคำสั่งซื้อ โดยเชื่อมต่อกับ Backend API เพื่อดึงและส่งข้อมูล

---

## เทคโนโลยีที่ใช้

- Angular (เวอร์ชัน 13 ขึ้นไป)  
- TypeScript  
- Bootstrap 5 (สำหรับสไตล์และเลย์เอาท์)  
- HTML / CSS

---

## โครงสร้างโปรเจกต์

food-sales-frontend/
├── src/
│ ├── app/
│ │ ├── components/ # ส่วนประกอบ UI (Component)
│ │ ├── services/ # Services สำหรับเรียก API
│ │ ├── mock-data/ # ข้อมูลจำลอง (ถ้ามี)
│ │ ├── app.module.ts # โมดูลหลักของแอป
│ │ ├── app.component.* # คอมโพเนนต์หลัก
│ ├── assets/ # รูปภาพและไฟล์สาธารณะ
├── angular.json # คอนฟิก Angular
├── package.json # รายการ dependencies และสคริปต์
├── README.md # ไฟล์นี้

yaml
Copy
Edit

---

## การติดตั้งและใช้งาน

### ความต้องการระบบ

- Node.js (แนะนำ v14 ขึ้นไป)  
- Angular CLI (ถ้ายังไม่มี ติดตั้งโดยคำสั่ง: `npm install -g @angular/cli`)  
- Git

---

### ขั้นตอนติดตั้ง

1. **โคลนโปรเจกต์**

```bash
git clone https://github.com/kapushino4/food-sales-frontend.git
cd food-sales-frontend
ติดตั้ง Dependencies

bash
Copy
Edit
npm install
ตั้งค่า API Endpoint

แก้ไขไฟล์ src/environments/environment.ts เพื่อกำหนด URL ของ Backend API ให้ตรงกับเครื่องของคุณ เช่น

typescript
Copy
Edit
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
รันโปรเจกต์

bash
Copy
Edit
ng serve --open
แอปจะเปิดที่ http://localhost:4200 ในเว็บเบราว์เซอร์อัตโนมัติ

การใช้งาน
เข้าสู่เว็บ http://localhost:4200 เพื่อดูเมนูอาหารและฟังก์ชันอื่น ๆ

ระบบจะเรียก API จาก backend ที่ตั้งไว้ใน environment

ทดสอบฟังก์ชัน CRUD (ถ้ามี) และการสั่งซื้อ

การทดสอบ (ถ้ามี)
ถ้ามีชุดทดสอบ Angular สามารถรันด้วยคำสั่ง:

bash
Copy
Edit
ng test
ปรับแต่งและพัฒนาเพิ่มเติม
เพิ่มส่วนประกอบใหม่ในโฟลเดอร์ src/app/components

แก้ไขบริการ API ใน src/app/services

ใช้ Angular CLI ในการสร้าง component, service เช่น

bash
Copy
Edit
ng generate component components/YourComponentName
ng generate service services/YourServiceName

ติดต่อ
ผู้พัฒนา: nattanon deesom
Email: nattanon.des@gmail.com
โทร: 084-983-6678
