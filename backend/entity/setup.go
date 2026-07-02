package entity

import (
	"net/url"
	"os"
	"strings"
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/postgres"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	///////////ทดลองให้เวลาเกิดเป็นเวลาปัจุบัน///////////
	t := time.Now()
	//////////////////////////////////////////////

	var dialector gorm.Dialector = sqlite.Open("sport-center-management.db")
	if databaseURL := databaseURL(); databaseURL != "" {
		dialector = postgres.Open(databaseURL)
	}

	database, err := gorm.Open(dialector, &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	database.AutoMigrate(
		&GENDER{},   //เพิ่มค่าเข้าไป
		&PACKAGE{},  //เพิ่มค่าเข้าไป
		&PROVINCE{}, //เพิ่มค่าเข้าไป
		&MEMBER{},
		&LOCATION{},   //เพิ่มค่าเข้าไป
		&SPORT_TYPE{}, //เพิ่มค่าเข้าไป
		&LOCATION_RESERVATION{},
		&STAFF{},                //เพิ่มค่าเข้าไป
		&SPORT_EQUIPMENT_TYPE{}, //เพิ่มค่าเข้าไป
		&REPORT{},
		&SPORT_EQUIPMENT{},
		&BORROW_SPORT_EQUIPMENT{},
		&PAYMENT_TYPE{}, //เพิ่มค่าเข้าไป
		&BANK{},         //เพิ่มค่าเข้าไป
		&PAYMENT{},
		&STATUS{}, //เพิ่มค่าเข้าไป
		&CHECK_IN_OUT{},
	)

	db = database

	///////////////ข้อมูลใน entity GENDER///////////
	GenderMale := GENDER{
		Gender_Type: "ชาย",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&GenderMale)

	GenderFemale := GENDER{
		Gender_Type: "หญิง",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&GenderFemale)

	GenderOther := GENDER{
		Gender_Type: "อื่นๆ",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&GenderOther)

	///////////////ข้อมูลใน entity PACKAGE//////////
	Package1 := PACKAGE{
		Package_Type:  "Year (25000 THB)",
		Package_Price: 25000,
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Package1)

	Package2 := PACKAGE{
		Package_Type:  "Month (2000 THB)",
		Package_Price: 2000,
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Package2)

	Package3 := PACKAGE{
		Package_Type:  "daily (80 THB)",
		Package_Price: 80,
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Package3)

	///////////////ข้อมูลใน entity PROVINCE/////////
	Province1 := PROVINCE{
		Province_Type: "กระบี่",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province1)

	Province2 := PROVINCE{
		Province_Type: "กรุงเทพมหานคร",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province2)

	Province3 := PROVINCE{
		Province_Type: "กาญจนบุรี",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province3)

	Province4 := PROVINCE{
		Province_Type: "กาฬสินธุ์",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province4)

	Province5 := PROVINCE{
		Province_Type: "กำแพงเพชร",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province5)

	Province6 := PROVINCE{
		Province_Type: "ขอนแก่น",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province6)

	Province7 := PROVINCE{
		Province_Type: "จันทบุรี",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province7)

	Province8 := PROVINCE{
		Province_Type: "ฉะเชิงเทรา",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province8)

	Province9 := PROVINCE{
		Province_Type: "ชลบุรี",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province9)

	Province10 := PROVINCE{
		Province_Type: "ชัยนาท",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province10)

	Province11 := PROVINCE{
		Province_Type: "ชัยภูมิ",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province11)

	Province12 := PROVINCE{
		Province_Type: "ชุมพร",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province12)

	Province13 := PROVINCE{
		Province_Type: "เชียงราย",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province13)

	Province14 := PROVINCE{
		Province_Type: "เชียงใหม่",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province14)

	Province15 := PROVINCE{
		Province_Type: "ตรัง",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province15)

	Province16 := PROVINCE{
		Province_Type: "ตราด",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province16)

	Province17 := PROVINCE{
		Province_Type: "ตาก",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province17)

	Province18 := PROVINCE{
		Province_Type: "นครนายก",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province18)

	Province19 := PROVINCE{
		Province_Type: "นครปฐม",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province19)

	Province20 := PROVINCE{
		Province_Type: "นครพนม",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province20)

	Province21 := PROVINCE{
		Province_Type: "นครราชสีมา",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province21)

	Province22 := PROVINCE{
		Province_Type: "นครศรีธรรมราช",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province22)

	Province23 := PROVINCE{
		Province_Type: "นครสวรรค์",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province23)

	Province24 := PROVINCE{
		Province_Type: "นนทบุรี",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province24)

	Province25 := PROVINCE{
		Province_Type: "นราธิวาส",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province25)

	Province26 := PROVINCE{
		Province_Type: "น่าน",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province26)

	Province27 := PROVINCE{
		Province_Type: "บึงกาฬ",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province27)

	Province28 := PROVINCE{
		Province_Type: "บุรีรัมย์",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province28)

	Province29 := PROVINCE{
		Province_Type: "ปทุมธานี",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province29)

	Province30 := PROVINCE{
		Province_Type: "ประจวบคีรีขันธ์",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province30)

	Province31 := PROVINCE{
		Province_Type: "ปราจีนบุรี",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province31)

	Province32 := PROVINCE{
		Province_Type: "ปัตตานี",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province32)

	Province33 := PROVINCE{
		Province_Type: "พะเยา",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province33)

	Province34 := PROVINCE{
		Province_Type: "พระนครศรีอยุธยา",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province34)

	Province35 := PROVINCE{
		Province_Type: "พังงา",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province35)

	Province36 := PROVINCE{
		Province_Type: "พัทลุง",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province36)

	Province37 := PROVINCE{
		Province_Type: "พิจิตร",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province37)

	Province38 := PROVINCE{
		Province_Type: "พิษณุโลก",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province38)

	Province39 := PROVINCE{
		Province_Type: "เพชรบุรี",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province39)

	Province40 := PROVINCE{
		Province_Type: "เพชรบูรณ์",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province40)

	Province41 := PROVINCE{
		Province_Type: "แพร่",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province41)

	Province42 := PROVINCE{
		Province_Type: "ภูเก็ต",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province42)

	Province43 := PROVINCE{
		Province_Type: "มหาสารคาม",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province43)

	Province44 := PROVINCE{
		Province_Type: "มุกดาหาร",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province44)

	Province45 := PROVINCE{
		Province_Type: "แม่ฮ่องสอน",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province45)

	Province46 := PROVINCE{
		Province_Type: "ยโสธร",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province46)

	Province47 := PROVINCE{
		Province_Type: "ยะลา",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province47)

	Province48 := PROVINCE{
		Province_Type: "ร้อยเอ็ด",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province48)

	Province49 := PROVINCE{
		Province_Type: "ระนอง",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province49)

	Province50 := PROVINCE{
		Province_Type: "ระยอง",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province50)

	Province51 := PROVINCE{
		Province_Type: "ราชบุรี",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province51)

	Province52 := PROVINCE{
		Province_Type: "ลพบุรี",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province52)

	Province53 := PROVINCE{
		Province_Type: "ลำปาง",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province53)

	Province54 := PROVINCE{
		Province_Type: "ลำพูน",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province54)

	Province55 := PROVINCE{
		Province_Type: "เลย",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province55)

	Province56 := PROVINCE{
		Province_Type: "ศรีสะเกษ",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province56)

	Province57 := PROVINCE{
		Province_Type: "สกลนคร",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province57)

	Province58 := PROVINCE{
		Province_Type: "สงขลา",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province58)

	Province59 := PROVINCE{
		Province_Type: "สตูล",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province59)

	Province60 := PROVINCE{
		Province_Type: "สมุทรปราการ",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province60)

	Province61 := PROVINCE{
		Province_Type: "สมุทรสงคราม",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province61)

	Province62 := PROVINCE{
		Province_Type: "สมุทรสาคร",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province62)

	Province63 := PROVINCE{
		Province_Type: "สระแก้ว",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province63)

	Province64 := PROVINCE{
		Province_Type: "สระบุรี",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province64)

	Province65 := PROVINCE{
		Province_Type: "สิงห์บุรี",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province65)

	Province66 := PROVINCE{
		Province_Type: "สุโขทัย",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province66)

	Province67 := PROVINCE{
		Province_Type: "สุพรรณบุรี",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province67)

	Province68 := PROVINCE{
		Province_Type: "สุราษฎร์ธานี",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province68)

	Province69 := PROVINCE{
		Province_Type: "สุรินทร์",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province69)

	Province70 := PROVINCE{
		Province_Type: "หนองคาย",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province70)

	Province71 := PROVINCE{
		Province_Type: "หนองบัวลำภู",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province71)

	Province72 := PROVINCE{
		Province_Type: "อ่างทอง",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province72)

	Province73 := PROVINCE{
		Province_Type: "อำนาจเจริญ",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province73)

	Province74 := PROVINCE{
		Province_Type: "อุดรธานี",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province74)

	Province75 := PROVINCE{
		Province_Type: "อุตรดิตถ์",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province75)

	Province76 := PROVINCE{
		Province_Type: "อุทัยธานี",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province76)

	Province77 := PROVINCE{
		Province_Type: "อุบลราชธานี",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Province77)

	/////////////ข้อมูลใน entity LOCATION///////////
	Location1 := LOCATION{
		Location_Name: "สนาม ฟุตบอล 1",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Location1)

	Location2 := LOCATION{
		Location_Name: "สนาม ฟุตบอล 2",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Location2)

	Location3 := LOCATION{
		Location_Name: "สระว่ายน้ำ",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Location3)

	Location4 := LOCATION{
		Location_Name: "สนาม เทนนิส 1",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Location4)

	Location5 := LOCATION{
		Location_Name: "สนาม เทนนิส 2",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Location5)

	Location6 := LOCATION{
		Location_Name: "สนาม วอลเลย์บอล 1",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Location6)

	Location7 := LOCATION{
		Location_Name: "สนาม วอลเลย์บอล 2",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Location7)

	Location8 := LOCATION{
		Location_Name: "สนาม เปตอง 1",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Location8)

	Location9 := LOCATION{
		Location_Name: "สนาม เปตอง 2",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Location9)

	Location10 := LOCATION{
		Location_Name: "สนาม บาสเกตบอล 1",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Location10)

	Location11 := LOCATION{
		Location_Name: "สนาม บาสเกตบอล 2",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Location11)

	Location12 := LOCATION{
		Location_Name: "สนาม มวย",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Location12)

	Location13 := LOCATION{
		Location_Name: "สนาม ฟุตซอล 1",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Location13)

	Location14 := LOCATION{
		Location_Name: "สนาม ฟุตซอล 2",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Location14)

	Location15 := LOCATION{
		Location_Name: "โรงยิม (คอร์ดแบดมินตัน1)",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Location15)

	Location16 := LOCATION{
		Location_Name: "โรงยิม (คอร์ดแบดมินตัน2)",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Location16)

	Location17 := LOCATION{
		Location_Name: "โรงยิม (คอร์ดแบดมินตัน3)",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Location17)

	Location18 := LOCATION{
		Location_Name: "โรงยิม (คอร์ดแบดมินตัน4)",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Location18)

	Location19 := LOCATION{
		Location_Name: "โรงยิม (คอร์ดแบดมินตัน5)",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Location19)

	Location20 := LOCATION{
		Location_Name: "โรงยิม (คอร์ดแบดมินตัน6)",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Location20)

	////////////ข้อมูลใน entity SPORT_TYPE/////////
	Sport_type1 := SPORT_TYPE{
		Sport_Type_Name: "ฟุตบอล",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Sport_type1)

	Sport_type2 := SPORT_TYPE{
		Sport_Type_Name: "ว่ายน้ำ",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Sport_type2)

	Sport_type3 := SPORT_TYPE{
		Sport_Type_Name: "เทนนิส",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Sport_type3)

	Sport_type4 := SPORT_TYPE{
		Sport_Type_Name: "วอลเลย์บอล",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Sport_type4)

	Sport_type5 := SPORT_TYPE{
		Sport_Type_Name: "เปตอง",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Sport_type5)

	Sport_type6 := SPORT_TYPE{
		Sport_Type_Name: "บาสเกตบอล",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Sport_type6)

	Sport_type7 := SPORT_TYPE{
		Sport_Type_Name: "มวย",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Sport_type7)

	Sport_type8 := SPORT_TYPE{
		Sport_Type_Name: "ฟุตซอล",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Sport_type8)

	password1, err := bcrypt.GenerateFromPassword([]byte("Demo@123456"), 14)
	password2, err := bcrypt.GenerateFromPassword([]byte("Demo@123456"), 14)
	password3, err := bcrypt.GenerateFromPassword([]byte("Demo@123456"), 14)

	Staff1 := STAFF{
		Staff_name:     "System Administrator",
		Staff_email:    "staff.admin@sportcenter.test",
		Staff_password: string(password1),
		Staff_address:  "114 ม.10 ต.ในเมือง จ.สุรินทร์",
		Staff_tel:      "0954101589",
		Staff_BOD:      t,
		Gender:         GenderFemale,
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Staff1)

	Staff2 := STAFF{
		Staff_name:     "Operations Staff",
		Staff_email:    "staff.operations@sportcenter.test",
		Staff_password: string(password2),
		Staff_address:  "555 ม.1 ต.ในเมือง จ.ขอนแก่น",
		Staff_tel:      "0973340404",
		Staff_BOD:      t,
		Gender:         GenderMale,
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Staff2)

	Staff3 := STAFF{
		Staff_name:     "Service Staff",
		Staff_email:    "staff.service@sportcenter.test",
		Staff_password: string(password3),
		Staff_address:  "561 ม.1 ต.ในเมือง จ.ขอนแก่น",
		Staff_tel:      "0983380848",
		Staff_BOD:      t,
		Gender:         GenderOther,
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Staff3)

	//ข้อมํูลในตาราง sport epuipment tpye
	Sport_Equipment_Type1 := SPORT_EQUIPMENT_TYPE{
		SPORT_EQUIPMENT_TYPE_Name: "ประเภท รองเท้า",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Sport_Equipment_Type1)

	Sport_Equipment_Type2 := SPORT_EQUIPMENT_TYPE{
		SPORT_EQUIPMENT_TYPE_Name: "ประเภท ไม้",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Sport_Equipment_Type2)

	Sport_Equipment_Type3 := SPORT_EQUIPMENT_TYPE{
		SPORT_EQUIPMENT_TYPE_Name: "ประเภท ลูก",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Sport_Equipment_Type3)

	Sport_Equipment_Type4 := SPORT_EQUIPMENT_TYPE{
		SPORT_EQUIPMENT_TYPE_Name: "เสื้อวอร์ม",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Sport_Equipment_Type4)

	Sport_Equipment_Type5 := SPORT_EQUIPMENT_TYPE{
		SPORT_EQUIPMENT_TYPE_Name: "อุปกรณ์อื่นๆ",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Sport_Equipment_Type5)

	//PAYMENT_TYPE
	payment_type1 := PAYMENT_TYPE{
		Payment_Type_Name: "Mobile banking",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&payment_type1)

	//BANK
	bank1 := BANK{
		Bank_Name: "ธนาคารไทยพาณิชย์",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&bank1)

	bank2 := BANK{
		Bank_Name: "ธนาคารกสิกรไทย",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&bank2)

	bank3 := BANK{
		Bank_Name: "ธนาคารกรุงไทย",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&bank3)

	bank4 := BANK{
		Bank_Name: "ธนาคารกรุุงเทพ",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&bank4)

	bank5 := BANK{
		Bank_Name: "ธนาคารทีทีบี (TTB)",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&bank5)

	bank6 := BANK{
		Bank_Name: "ธนาคารออมสิน",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&bank6)

	bank7 := BANK{
		Bank_Name: "ธนาคารกรุงศรี",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&bank7)

	bank8 := BANK{
		Bank_Name: "ธ.ก.ส",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&bank8)

	bank9 := BANK{
		Bank_Name: "ธนาคารยูบีโอ (UBO)",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&bank9)

	bank10 := BANK{
		Bank_Name: "ธนาคารอาคารสงเคราะห์",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&bank10)

	bank11 := BANK{
		Bank_Name: "ธนาคารซีไอเอ็มบี (ICBM)",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&bank11)

	bank12 := BANK{
		Bank_Name: "ซิตี้แบงก์",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&bank12)

	bank13 := BANK{
		Bank_Name: "ดอยซ์แบงก์",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&bank13)

	bank14 := BANK{
		Bank_Name: "ธนาคารเอชเอสบีซี (HSBC)",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&bank14)

	bank15 := BANK{
		Bank_Name: "ธนาคารไอซีบีซี (ICBC)",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&bank15)

	bank16 := BANK{
		Bank_Name: "ธนาคารอิสลาม",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&bank16)

	bank17 := BANK{
		Bank_Name: "ธนาคารเกียรตินาคินภัทร",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&bank17)

	bank18 := BANK{
		Bank_Name: "ธนาคารแลนด์ แอนด์ เฮ้าส์ (LH)",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&bank18)

	bank19 := BANK{
		Bank_Name: "ธนาคารมิซูโฮ (MIZUHO)",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&bank19)

	bank20 := BANK{
		Bank_Name: "ธนาคารสแตนดาร์ดชาร์เตอร์ด (standardchartered)",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&bank20)

	bank21 := BANK{
		Bank_Name: "ธนาคารซูมิโตโม (SMBC)",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&bank21)

	bank22 := BANK{
		Bank_Name: "ธนาคารไทยเครดิต",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&bank22)

	bank23 := BANK{
		Bank_Name: "ธนาคารทิสโก้ (TISCO)",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&bank23)

	///////////////ข้อมูลใน entity STATUS///////////
	Status1 := STATUS{
		Discribe: "Check-in",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Status1)
	Status2 := STATUS{
		Discribe: "Check-out",
	}
	db.Clauses(clause.OnConflict{DoNothing: true}).Create(&Status2)

}

func databaseURL() string {
	if value := strings.TrimSpace(os.Getenv("DATABASE_URL")); value != "" {
		return normalizeNeonURL(value)
	}

	for _, path := range []string{"neon.md", "../neon.md"} {
		content, err := os.ReadFile(path)
		if err == nil {
			return normalizeNeonURL(strings.TrimSpace(string(content)))
		}
	}

	return ""
}

func normalizeNeonURL(databaseURL string) string {
	parsed, err := url.Parse(databaseURL)
	if err != nil || !strings.Contains(parsed.Hostname(), ".neon.tech") {
		return databaseURL
	}

	query := parsed.Query()
	if query.Get("options") != "" {
		return databaseURL
	}

	endpointID := strings.Split(parsed.Hostname(), ".")[0]
	endpointID = strings.TrimSuffix(endpointID, "-pooler")
	if endpointID == "" {
		return databaseURL
	}

	query.Set("options", "endpoint="+endpointID)
	parsed.RawQuery = query.Encode()
	return parsed.String()
}
