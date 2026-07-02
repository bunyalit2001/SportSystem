package controller

import (
	// "fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"sport-center-management-system/entity"
)

func CreateLocation_Reservation(c *gin.Context) {

	var Member entity.MEMBER
	var Location entity.LOCATION
	var Sport_Type entity.SPORT_TYPE
	var Location_Reservation entity.LOCATION_RESERVATION

	//7: เช็คข้อมูลที่รับเข้ามาจากหน้าui มาเช็คกับตารางหลักในฐานข้อมูล
	if err := c.ShouldBindJSON(&Location_Reservation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 8: ค้นหา Location ด้วย id
	if tx := entity.DB().Where("id = ?", Location_Reservation.LocationID).First(&Location); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Location not found"})
		return
	}

	// 9: ค้นหา Sport Type  ด้วย id
	if tx := entity.DB().Where("id = ?", Location_Reservation.Sport_TypeID).First(&Sport_Type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Sport Type not found"})
		return
	}
	// 10: สร้าง entity Location_Reservation
	lr := entity.LOCATION_RESERVATION{
		MemberID:   Location_Reservation.MemberID,
		Member:     Member,                        // โยงความสัมพันธ์กับ Entity Member
		Location:   Location,                      // โยงความสัมพันธ์กับ Entity Location
		Sport_Type: Sport_Type,                    // โยงความสัมพันธ์กับ Entity Sport_Type
		Time_In:    Location_Reservation.Time_In,  //รายลละเอียด เวลาเข้า ที่กรอกเข้ามาใน Location_Reservation
		Time_Out:   Location_Reservation.Time_Out, //รายลละเอียด เวลาออก ที่กรอกเข้ามาใน Location_Reservation
	}

	// 11: บันทึก
	if err := entity.DB().Create(&lr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": lr})
}

// // 5: GET location เตรียมข้อมูลให้ combobox
// func ListLocation(c *gin.Context) {
// 	var location []entity.LOCATION

// 	if err := entity.DB().Raw("SELECT * FROM locations").Scan(&location).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": location})
// }

// // 6: GET sport type เตรียมข้อมูลให้ sport type
// func ListSport_Type(c *gin.Context) {
// 	var Sport_Type []entity.SPORT_TYPE

// 	if err := entity.DB().Raw("SELECT * FROM sport_types").Scan(&Sport_Type).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": Sport_Type})
// }

// // ดึงข้อมูลการจองมาแสดง
// func ListLocation_Reservation(c *gin.Context) {

// 	var Location_Reservation []entity.LOCATION_RESERVATION

// 	if err := entity.DB().Preload("Member").Preload("Location").Preload("Sport_Type").Raw("SELECT * FROM location_reservations").Scan(&Location_Reservation).Find(&Location_Reservation).Error; err != nil {

// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

// 		return

// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": Location_Reservation})

// }

// // GET /member/:id
// func GetMember(c *gin.Context) {
// 	var member entity.MEMBER
// 	id := c.Param("id")

// 	if err := entity.DB().Raw("SELECT * FROM members WHERE id = ?", id).Scan(&member).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": member})
// }

// // GET /staff/:id
// func GetStaff(c *gin.Context) {
// 	var staff entity.STAFF
// 	id := c.Param("id")

// 	if err := entity.DB().Raw("SELECT * FROM staffs WHERE id = ?", id).Scan(&staff).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	fmt.Println()

// 	c.JSON(http.StatusOK, gin.H{"data": staff})
// }
