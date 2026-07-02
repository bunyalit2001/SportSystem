# Application Testing Flow

เอกสารนี้สรุป flow สำหรับทดสอบระบบ Sport Center Management System แบบคร่าว ๆ หลังจากรัน backend และ frontend ตามขั้นตอนใน `README.md`

## Test URLs

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8080`

## Roles

| Role | Purpose | Access |
| --- | --- | --- |
| Guest | ผู้ใช้ทั่วไปที่ยังไม่ได้เข้าสู่ระบบ | หน้าแรก, สมัครสมาชิก, เข้าสู่ระบบ, แจ้งปัญหา |
| Member | สมาชิกศูนย์กีฬา | จองสนาม, ยืมอุปกรณ์, ชำระเงิน |
| Staff | เจ้าหน้าที่ | จัดการอุปกรณ์กีฬา, ตรวจสอบข้อมูลอุปกรณ์, เช็คอิน/เช็คเอาท์การจอง |

หลัง login ระบบจะเก็บ `token`, `uid` และ `role` ใน `localStorage` โดย role ที่ใช้คือ `member` และ `staff`

## Demo Staff Accounts

ระบบมี seed data สำหรับบัญชีเจ้าหน้าที่ ใช้สำหรับทดสอบหน้า Staff Login หลังจากลบ database เดิมและรัน backend ใหม่

| Role | Email | Password |
| --- | --- | --- |
| Admin Staff | `staff.admin@sportcenter.test` | `Demo@123456` |
| Operations Staff | `staff.operations@sportcenter.test` | `Demo@123456` |
| Service Staff | `staff.service@sportcenter.test` | `Demo@123456` |

สำหรับ Member ให้สมัครบัญชีใหม่ผ่านหน้า `/CreateMember` แล้วใช้บัญชีนั้นเข้าสู่ระบบที่ `/Login`

## Frontend Paths

| Path | Role | Description |
| --- | --- | --- |
| `/` | Guest | หน้าแรกของระบบ |
| `/CreateMember` | Guest | สมัครสมาชิกใหม่ |
| `/Login` | Member | เข้าสู่ระบบสมาชิก |
| `/StaffLogin` | Staff | เข้าสู่ระบบเจ้าหน้าที่ |
| `/HomeMember` | Member | หน้าเมนูหลักสำหรับสมาชิก |
| `/HomeStaff` | Staff | หน้าเมนูหลักสำหรับเจ้าหน้าที่ |
| `/CreateReport` | Guest | แจ้งปัญหาสถานที่หรืออุปกรณ์ |
| `/CreateLocationReservation` | Member | จองสนามกีฬา |
| `/CreateBorrow_Sport_Equipment` | Member | ยืมอุปกรณ์กีฬา |
| `/CreatePayment` | Member | ชำระเงินค่าสมาชิกหรือแพ็กเกจ |
| `/sport_equipment_data` | Staff | ดูรายการอุปกรณ์กีฬา |
| `/create_sport_equipment` | Staff | เพิ่มข้อมูลอุปกรณ์กีฬา |
| `/CreateCheckInOut` | Staff | เช็คอิน/เช็คเอาท์การจองสนาม |

## Suggested Testing Flow

1. เริ่มจากลบ database เดิม แล้วรัน backend เพื่อให้ระบบสร้าง schema และ seed data ใหม่
2. รัน frontend และเปิด `http://localhost:3000`
3. สมัครสมาชิกใหม่ที่ `/CreateMember`
4. เข้าสู่ระบบสมาชิกที่ `/Login`
5. ทดสอบ flow ของ Member:
   - จองสนามที่ `/CreateLocationReservation`
   - ยืมอุปกรณ์ที่ `/CreateBorrow_Sport_Equipment`
   - ชำระเงินที่ `/CreatePayment`
6. ออกจากระบบ แล้วเข้าสู่ระบบเจ้าหน้าที่ที่ `/StaffLogin` ด้วย demo staff account
7. ทดสอบ flow ของ Staff:
   - เพิ่มอุปกรณ์กีฬาที่ `/create_sport_equipment`
   - ตรวจสอบรายการอุปกรณ์ที่ `/sport_equipment_data`
   - เช็คอิน/เช็คเอาท์การจองที่ `/CreateCheckInOut`
8. ทดสอบแจ้งปัญหาที่ `/CreateReport`

## Backend API Overview

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/createmember` | สมัครสมาชิก |
| `POST` | `/Login` | เข้าสู่ระบบสมาชิก |
| `POST` | `/StaffLogin` | เข้าสู่ระบบเจ้าหน้าที่ |
| `GET` | `/gender` | ดึงข้อมูลเพศสำหรับฟอร์ม |
| `GET` | `/package` | ดึงข้อมูลแพ็กเกจ |
| `GET` | `/province` | ดึงข้อมูลจังหวัด |
| `GET` | `/location` | ดึงข้อมูลสนาม/สถานที่ |
| `GET` | `/sport_type` | ดึงข้อมูลชนิดกีฬา |
| `POST` | `/Location_Reservation` | สร้างรายการจองสนาม |
| `GET` | `/locationReservation/` | ดึงรายการจองสนาม |
| `POST` | `/borrow-sport-eqiupment` | สร้างรายการยืมอุปกรณ์ |
| `GET` | `/sport_equipment_type` | ดึงประเภทอุปกรณ์กีฬา |
| `GET` | `/sport_equipment_data` | ดึงรายการอุปกรณ์กีฬา |
| `POST` | `/Create_Sports_Equipment` | เพิ่มอุปกรณ์กีฬา |
| `POST` | `/payment` | บันทึกการชำระเงิน |
| `GET` | `/payment_type` | ดึงประเภทการชำระเงิน |
| `GET` | `/bank` | ดึงข้อมูลธนาคาร |
| `POST` | `/report` | บันทึกรายงานปัญหา |
| `POST` | `/createcio` | บันทึก check-in/check-out |

## Notes

- หากเปลี่ยน seed account หรือข้อมูลเริ่มต้น ต้องลบ `backend/sport-center-management.db` แล้วรัน backend ใหม่
- Backend รองรับ Neon PostgreSQL ผ่าน `DATABASE_URL` หรือไฟล์ local `neon.md`
- ถ้าใช้ Neon แล้ว restart backend ซ้ำ seed data จะใช้ `ON CONFLICT DO NOTHING` เพื่อลดปัญหาข้อมูล lookup ซ้ำ
