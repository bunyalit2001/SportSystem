# Sport Center Management System

เว็บแอพสำหรับจัดการระบบศูนย์กีฬา ประกอบด้วยระบบสมาชิก ระบบเจ้าหน้าที่ การจองสนาม การยืมอุปกรณ์กีฬา การชำระเงิน การแจ้งปัญหา และการเช็คอิน/เช็คเอาท์การใช้งานสนาม

โปรเจกต์นี้พัฒนาขึ้นเป็นส่วนหนึ่งของรายวิชา SA (System Analysis) และถูกจัดเรียบเรียงเป็น repository สำหรับแสดงผลงานบน GitHub

## Tech Stack

- Backend: Go, Gin, GORM
- Frontend: React, TypeScript, Material UI
- Database: Neon PostgreSQL หรือ SQLite local fallback (`backend/sport-center-management.db`)

## โครงสร้างโปรเจกต์

```text
sport-center-management-system/
├── backend/   # REST API, database schema, seed data
└── frontend/  # React web application
```

## สิ่งที่ต้องติดตั้งก่อนรัน

- Go 1.19 หรือใหม่กว่า
- Node.js และ npm

## วิธี clone และรันทดสอบ

```bash
git clone <repository-url>
cd sport-center-management-system
```

### 1. ลบฐานข้อมูลเดิม

ถ้ารันแบบ SQLite local ให้ลบไฟล์ SQLite เดิมก่อนรัน backend เพื่อให้ระบบสร้างฐานข้อมูลและ seed data ใหม่

```bash
rm -f backend/sport-center-management.db
```

ถ้ารันด้วย Neon PostgreSQL ให้ตั้งค่า `DATABASE_URL` หรือวาง connection string ไว้ในไฟล์ `neon.md` ที่ root ของโปรเจกต์

```bash
export DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
```

ไฟล์ `neon.md` ถูก ignore ไม่ให้ติด GitHub เพราะมี database credential

### 2. รัน Backend

```bash
cd backend
go mod tidy
go run main.go
```

Backend จะรันที่:

```text
http://localhost:8080
```

Health check:

```text
GET /healthz  # ตรวจว่า backend process ยังตอบได้
GET /readyz   # ตรวจว่า backend ติดต่อ database ได้หรือไม่
```

### 3. รัน Frontend

เปิด terminal อีกหน้าต่าง แล้วรันคำสั่ง:

```bash
cd frontend
npm install
npm start
```

ถ้า backend ไม่ได้รันที่ `http://localhost:8080` ให้ตั้งค่า API URL ก่อนรัน frontend:

```bash
REACT_APP_API_URL=https://your-backend-url npm start
```

Frontend จะรันที่:

```text
http://localhost:3000
```

## Docker Backend

สามารถ build backend เป็น Docker image ได้จากโฟลเดอร์ `backend`

```bash
cd backend
docker build -t sport-center-api .
docker run --rm -p 8080:8080 -e DATABASE_URL="postgresql://user:password@host/database?sslmode=require" sport-center-api
```

สำหรับ Fly.io ให้สร้าง `fly.toml` ภายหลังด้วย `fly launch` จากโฟลเดอร์ `backend` แล้วตั้งค่า `DATABASE_URL` เป็น secret:

```bash
fly secrets set DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
```

ถ้าต้องการให้ GitHub Actions deploy backend อัตโนมัติ ให้สร้าง Fly API token แล้วเพิ่มเป็น GitHub repository secret ชื่อ `FLY_API_TOKEN`

```bash
fly tokens create deploy -x 999999h
```

## บัญชีเจ้าหน้าที่สำหรับทดสอบ

ระบบมี seed data สำหรับบัญชีเจ้าหน้าที่ และมี flow การทดสอบแยกไว้ใน [FLOW.md](./FLOW.md)

ระบบ login จะคืนค่า `role` เป็น `member` หรือ `staff` และ frontend/backend ใช้ role นี้เพื่อจำกัดการเข้าถึงหน้าหรือ API ที่เกี่ยวข้อง

## การใช้งานเบื้องต้น

1. เข้าเว็บที่ `http://localhost:3000`
2. สมัครสมาชิกที่หน้า Create Member หรือเข้าสู่ระบบสมาชิกที่หน้า Login
3. เข้าสู่ระบบเจ้าหน้าที่ได้ที่หน้า Staff Login
4. ใช้งานเมนูหลัก เช่น จองสนาม ยืมอุปกรณ์ ชำระเงิน แจ้งปัญหา และเช็คอิน/เช็คเอาท์

ดูรายละเอียด path, role, demo account และลำดับการทดสอบได้ที่ [FLOW.md](./FLOW.md)

## หมายเหตุ

- Frontend เรียก API จาก `REACT_APP_API_URL` หรือ fallback ไปที่ `http://localhost:8080`
- Backend จะใช้ `DATABASE_URL` ก่อน หากไม่มีจะลองอ่าน `neon.md` และถ้าไม่มีทั้งคู่จะ fallback เป็น SQLite local
- หากรัน SQLite จาก path อื่น ฐานข้อมูล SQLite อาจถูกสร้างผิดตำแหน่ง ควรรันคำสั่งจากโฟลเดอร์ `backend`
- สำหรับ Fly.io สามารถ setup ภายหลังได้ โดย backend ต้องตั้ง `DATABASE_URL` เป็น secret และ frontend ต้องตั้ง `REACT_APP_API_URL` ให้ชี้ไปยัง backend ที่ deploy แล้ว
