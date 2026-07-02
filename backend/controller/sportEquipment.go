package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"sport-center-management-system/entity"
)

func CreateSport_Equipment(c *gin.Context) {

	var Staff entity.STAFF
	var Sport_Type entity.SPORT_TYPE
	var Sport_Equipment_Type entity.SPORT_EQUIPMENT_TYPE
	var Sport_Equipment entity.SPORT_EQUIPMENT

	//7: เช็คข้อมูลที่รับเข้ามาจากหน้าui มาเช็คกับตารางหลักในฐานข้อมูล
	if err := c.ShouldBindJSON(&Sport_Equipment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// แก้ที่นี่ลองเทียบกับโค้ดเดิม
	// 8: ค้นหา sport equipment type ด้วย id
	if tx := entity.DB().Where("id = ?", Sport_Equipment.Sport_Equipment_TypeID).First(&Sport_Equipment_Type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Sport Equipment Type not found"})
		return
	}

	// 9: ค้นหา Sport Type  ด้วย id
	if tx := entity.DB().Where("id = ?", Sport_Equipment.Sport_TypeID).First(&Sport_Type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Sport Type not found"})
		return
	}
	//10: สร้าง SportEquiment
	saveSportEquiment := entity.SPORT_EQUIPMENT{
		StaffID:                Sport_Equipment.StaffID, // เพิ่มตรงนี้
		Staff:                  Staff,                   // โยงความสัมพันธ์กับ Entity staff
		Sport_type:             Sport_Type,              // โยงความสัมพันธ์กับ Entity sport_type
		Sport_equipment_type:   Sport_Equipment_Type,    // โยงความสัมพันธ์กับ Entity Sport_Equipment_Type
		Sport_Equipment_Name:   Sport_Equipment.Sport_Equipment_Name,
		Sport_Equipment_Amount: Sport_Equipment.Sport_Equipment_Amount,
	}

	// 11: บันทึก
	if err := entity.DB().Create(&saveSportEquiment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": saveSportEquiment})
}

// // ดึงข้อมูลบันทึกอุปกรณ์มาแสดง /sport_equipment_data
// func ListSport_Equipment(c *gin.Context) {

// 	var Sport_Equipment []entity.SPORT_EQUIPMENT

// 	if err := entity.DB().Preload("Staff").Preload("Sport_type").Preload("Sport_equipment_type").Raw("SELECT * FROM sport_eq_ui_pments").Scan(&Sport_Equipment).Find(&Sport_Equipment).Error; err != nil {

// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

// 		return

// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": Sport_Equipment})

// }
