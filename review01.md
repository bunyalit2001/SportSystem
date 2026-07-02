# Review 01 - Frontend State Fixes

เอกสารนี้สรุปการแก้ไข frontend state/form handling รอบแรก หลังตรวจพบจุดที่อาจทำให้ข้อมูลแสดงผลผิดหรือ submit payload ผิดพลาด

## Summary

แก้ไขปัญหาหลัก 5 รายการ:

1. แก้ชื่อ field ตอนสมัครสมาชิกจาก `Member_NAME` เป็น `Member_Name`
2. เลิก mutate React state object ตรง ๆ สำหรับ `MemberID`, `StaffID` และ `Price`
3. แก้ `Select` value ที่เคยได้ค่า `"undefined"` ตอน initial render
4. แก้ response key ผิดจาก `result.Data` เป็น `result.data`
5. เพิ่ม fallback ให้ form value เพื่อลด controlled/uncontrolled state warning

## Details

### 1. Member Name Payload

ไฟล์: `frontend/src/component/CreateMember.tsx`

เดิมส่ง payload เป็น `Member_NAME` ทำให้ backend ที่รับ field `Member_Name` อาจไม่ได้บันทึกชื่อสมาชิกตามที่ผู้ใช้กรอก

แก้เป็น:

```ts
Member_Name: CreateMember.Member_Name
```

### 2. Direct State Mutation

แก้ pattern ที่ mutate state object ตรง ๆ เช่น:

```ts
CreatePayment.MemberID = res.ID;
```

เปลี่ยนเป็นใช้ state setter:

```ts
setCreatePayment((prev) => ({
  ...prev,
  MemberID: res.ID,
}));
```

ไฟล์ที่แก้:

- `frontend/src/component/CreatePayment.tsx`
- `frontend/src/component/CreateBorrow_Sport_Equipment.tsx`
- `frontend/src/component/CreateLocationReservation.tsx`
- `frontend/src/component/CreateSportEquipment.tsx`
- `frontend/src/component/CreateCheckInOut.tsx`

### 3. Select Initial Value

เดิมหลายจุดใช้:

```tsx
value={someState.SomeID + ""}
```

ถ้า `SomeID` ยังไม่มีค่า จะกลายเป็น `"undefined"` ทำให้ placeholder option ไม่ถูกเลือก

แก้เป็น:

```tsx
value={String(someState.SomeID ?? "")}
```

ไฟล์ที่แก้:

- `frontend/src/component/CreateMember.tsx`
- `frontend/src/component/CreatePayment.tsx`
- `frontend/src/component/CreateBorrow_Sport_Equipment.tsx`
- `frontend/src/component/CreateLocationReservation.tsx`
- `frontend/src/component/CreateSportEquipment.tsx`
- `frontend/src/component/CreateReport.tsx`

### 4. Borrow List Response Key

ไฟล์: `frontend/src/component/CreateBorrow_Sport_Equipment.tsx`

เดิมใช้:

```ts
setCreateBorrow_Sport_Equipments(result.Data);
```

แต่ backend ส่ง response เป็น `data` ตัวเล็ก จึงแก้เป็น:

```ts
setCreateBorrow_Sport_Equipments(result.data);
```

### 5. Form Value Fallback

เพิ่ม fallback ให้ text field / disabled field ที่อาจเริ่มต้นเป็น `undefined` เช่น:

```tsx
value={CreateMember.Email ?? ""}
```

ช่วยให้ React form เป็น controlled component ตั้งแต่ render แรก และลดโอกาสเกิด warning หรือการแสดงผลไม่สม่ำเสมอ

## Verification

รันคำสั่ง:

```bash
cd frontend
npm run build
```

ผลลัพธ์:

- Build ผ่าน
- ยังมี ESLint warnings เดิมของโปรเจกต์ เช่น unused imports, unused state และ hook dependency warnings
- ไม่มี TypeScript compile error จากการแก้ state/form handling รอบนี้

## Remaining Notes

ยังมีประเด็นที่ควรพิจารณาในรอบถัดไป:

- route guard ถูกปรับในรอบถัดมาให้เช็ก `role` ระหว่าง member/staff แล้ว
- มี unused state/import หลายจุดที่ควร clean ก่อน deploy จริง
- มี dependency warning ของ Browserslist/caniuse-lite จาก Create React App
