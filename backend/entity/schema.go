package entity

import (
	"time"

	"gorm.io/gorm"
)

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type GENDER struct {
	gorm.Model
	Gender_Type string   `gorm:"uniqueIndex"`
	Member      []MEMBER `gorm:"foreignKey:GenderID"`
	Staff       []STAFF  `gorm:"foreignKey:GenderID"`
}

type STAFF struct {
	gorm.Model
	Staff_name      string
	Staff_email     string `gorm:"uniqueIndex"`
	Staff_password  string
	Staff_address   string
	Staff_tel       string
	Staff_BOD       time.Time
	Sport_Equipment []SPORT_EQUIPMENT `gorm:"foreignKey:StaffID"`
	// GenderID is a fk from GENDER
	GenderID *uint
	Gender   GENDER
}

type PACKAGE struct {
	gorm.Model
	Package_Type  string `gorm:"uniqueIndex"`
	Package_Price uint
	Payment       []PAYMENT `gorm:"foreignKey:PackageID"`
	Member        []MEMBER  `gorm:"foreignKey:PackageID"`
}

type PROVINCE struct {
	gorm.Model
	Province_Type string   `gorm:"uniqueIndex"`
	Member        []MEMBER `gorm:"foreignKey:ProvinceID"`
}

type MEMBER struct {
	gorm.Model
	Member_Name string
	Email       string `gorm:"uniqueIndex"`
	Password    string
	Age         uint
	Height      uint
	Weight      uint
	Tel         string
	BirthDay    time.Time

	Loaction_Reservation   []LOCATION_RESERVATION   `gorm:"foreignKey:MemberID"`
	Borrow_Sport_Equipment []BORROW_SPORT_EQUIPMENT `gorm:"foreignKey:MemberID"`
	//id ทำหน้าที่ เป็น FK
	GenderID   *uint
	PackageID  *uint
	ProvinceID *uint
	//เป็น ข้อมูล เพื่อให้จอยง่ายขึ้น
	Gender   GENDER
	Package  PACKAGE
	Province PROVINCE
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type LOCATION struct {
	gorm.Model
	Location_Name        string                 `gorm:"uniqueIndex"`
	Loaction_Reservation []LOCATION_RESERVATION `gorm:"foreignKey:LocationID"`
	Report               []REPORT               `gorm:"foreignKey:LocationID"` // เชื่อมตาราง
}

type SPORT_TYPE struct {
	gorm.Model
	Sport_Type_Name      string                 `gorm:"uniqueIndex"`
	Loaction_Reservation []LOCATION_RESERVATION `gorm:"foreignKey:Sport_TypeID"`
	Report               []REPORT               `gorm:"foreignKey:Sport_TypeID"` // เชื่อมตาราง
	Sport_Equipment      []SPORT_EQUIPMENT      `gorm:"foreignKey:Sport_TypeID"`
}

type SPORT_EQUIPMENT_TYPE struct {
	gorm.Model
	SPORT_EQUIPMENT_TYPE_Name string            `gorm:"uniqueIndex"`
	Report                    []REPORT          `gorm:"foreignKey:Sport_Equipment_TypeID"` // เชื่อมตาราง
	Sport_Equipment           []SPORT_EQUIPMENT `gorm:"foreignKey:Sport_Equipment_TypeID"`
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type LOCATION_RESERVATION struct {
	gorm.Model
	Time_In  time.Time
	Time_Out time.Time

	//id ทำหน้าที่ เป็น FK
	MemberID     *uint
	LocationID   *uint
	Sport_TypeID *uint
	//เป็น ข้อมูล เพื่อให้จอยง่ายขึ้น
	Member     MEMBER
	Location   LOCATION
	Sport_Type SPORT_TYPE

	CheckInOut []CHECK_IN_OUT `gorm:"foreignKey:LocationReservationID"`
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type REPORT struct {
	gorm.Model
	Detail string

	LocationID *uint
	Location   LOCATION //จะได้ join ง่ายขึ้น

	Sport_Equipment_TypeID *uint
	Sport_Equipment_Type   SPORT_EQUIPMENT_TYPE //จะได้ join ง่ายขึ้น

	Sport_TypeID *uint
	Sport_Type   SPORT_TYPE
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type SPORT_EQUIPMENT struct {
	gorm.Model
	Sport_Equipment_Name   string
	Sport_Equipment_Amount uint
	// StaffID fk จาก staff
	StaffID *uint
	Staff   STAFF

	// SportTypeID fk จาก SportType
	Sport_TypeID *uint
	Sport_type   SPORT_TYPE

	// SportEquipmentTypeID จาก SportEquipmentType
	Sport_Equipment_TypeID *uint
	Sport_equipment_type   SPORT_EQUIPMENT_TYPE
	Borrow_Sport_Equipment []BORROW_SPORT_EQUIPMENT `gorm:"foreignKey:Sport_EquipmentID"`
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type BORROW_SPORT_EQUIPMENT struct {
	gorm.Model
	Time_Borrow   time.Time
	Time_Giveback time.Time

	MemberID               *uint
	Sport_Equipment_TypeID *uint
	Sport_EquipmentID      *uint

	Member               MEMBER
	Sport_Equipment_Type SPORT_EQUIPMENT_TYPE
	Sport_Equipment      SPORT_EQUIPMENT
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type PAYMENT_TYPE struct {
	gorm.Model
	Payment_Type_Name string    `gorm:"uniqueIndex"`
	Payment           []PAYMENT `gorm:"foreignKey:Payment_TypeID"`
}

type BANK struct {
	gorm.Model
	Bank_Name string    `gorm:"uniqueIndex"`
	Payment   []PAYMENT `gorm:"foreignKey:BankID"`
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type PAYMENT struct {
	gorm.Model
	MemberID       *uint
	Payment_TypeID *uint
	PackageID      *uint
	BankID         *uint
	////เป็นข้อมูล member ใช้เพื่อให้ join ง่ายขึ้น////////////
	Member       MEMBER
	Payment_Type PAYMENT_TYPE
	Package      PACKAGE
	Bank         BANK
	/////////////////////////////////////////////////
	Datetime     time.Time
	Price        uint
	Bank_Account string `gorm:"uniqueIndex"`
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type STATUS struct {
	gorm.Model
	Discribe   string         `gorm:"uniqueIndex"`
	CheckInOut []CHECK_IN_OUT `gorm:"foreignKey:StatusID"`
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type CHECK_IN_OUT struct {
	gorm.Model

	StaffID               *uint
	StatusID              *uint
	LocationReservationID *uint

	Status              STATUS
	Staff               STAFF
	LocationReservation LOCATION_RESERVATION
}
