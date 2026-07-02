package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"sport-center-management-system/entity"
)

// POST report
func CreateReport(c *gin.Context) {

	var Location entity.LOCATION
	var Sport_Equipment_Type entity.SPORT_EQUIPMENT_TYPE
	var Sport_Type entity.SPORT_TYPE
	var Report entity.REPORT

	if err := c.ShouldBindJSON(&Report); err != nil { //เช็คข้อมูลที่รับเข้ามาจากหน้าui มาเช็คกับตารางหลักในฐานข้อมูล
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 7: ค้นหา location ด้วย id
	if tx := entity.DB().Where("id = ?", Report.LocationID).First(&Location); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Location not found"})
		return
	}

	// 8: ค้นหา Sport type ด้วย id
	if tx := entity.DB().Where("id = ?", Report.Sport_TypeID).First(&Sport_Type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "sport type not found"})
		return
	}

	// 9: ค้นหา Sport equipment type  ด้วย id
	if tx := entity.DB().Where("id = ?", Report.Sport_Equipment_TypeID).First(&Sport_Equipment_Type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Sport Equipment Type not found"})
		return
	}
	// 10: สร้าง entity report
	rp := entity.REPORT{
		Location:             Location,             // โยงความสัมพันธ์กับ Entity LOCATION
		Sport_Equipment_Type: Sport_Equipment_Type, // โยงความสัมพันธ์กับ Entity Sport_Equipment_Type
		Sport_Type:           Sport_Type,           // โยงความสัมพันธ์กับ Entity Sport Type
		Detail:               Report.Detail,        //รายลละเอียดที่กรอกเข้ามา
	}

	// 13: บันทึก
	if err := entity.DB().Create(&rp).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": rp})
}

// func ListSport_Equipment_Type(c *gin.Context) {
// 	var Sport_Equipment_Type []entity.SPORT_EQUIPMENT_TYPE

// 	if err := entity.DB().Raw("SELECT * FROM sport_eq_ui_pment_types").Scan(&Sport_Equipment_Type).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": Sport_Equipment_Type})
// }
