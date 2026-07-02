package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"sport-center-management-system/entity"
)

// func ListStatus1(c *gin.Context) {
// 	var StatusCheck1 []entity.STATUS
// 	if err := entity.DB().Raw("SELECT * FROM statuses WHERE id = 1").Scan(&StatusCheck1).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": StatusCheck1})
// }
// func ListStatus2(c *gin.Context) {
// 	var StatusCheck2 []entity.STATUS
// 	if err := entity.DB().Raw("SELECT * FROM statuses WHERE id = 2").Scan(&StatusCheck2).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": StatusCheck2})
// }

// // GET /watch_videos
// func ListLocationReservation(c *gin.Context) {
// 	var locationReservation []entity.LOCATION_RESERVATION
// 	if err := entity.DB().Preload("Member").Preload("Location").Preload("Sport_Type").Raw("SELECT * FROM location_reservations").Scan(&locationReservation).Find(&locationReservation).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": locationReservation})
// }
// // GET /watchvideo/:id
// func GetLocationReservation(c *gin.Context) {
// 	var locationReservation entity.LOCATION_RESERVATION
// 	id := c.Param("id")
// 	if err := entity.DB().Preload("Member").Preload("Location").Preload("Sport_Type").Raw("SELECT * FROM location_reservations WHERE id = ?", id).Scan(&locationReservation).First(&locationReservation).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": locationReservation})
// }
// // GET /watchvideo/:id
// func GetLocationReservationIDEA(c *gin.Context) {
// 	var locationReservation []entity.LOCATION_RESERVATION
// 	id := c.Param("id")
// 	if err := entity.DB().Preload("Member").Preload("Location").Preload("Sport_Type").Raw("SELECT * FROM location_reservations WHERE id = ?", id).First(&locationReservation).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": locationReservation})
// }
// func ListCIO(c *gin.Context) {
// 	var listGetCio []entity.CHECK_IN_OUT
// 	if err := entity.DB().Preload("Member").Preload("Location").Preload("Sport_Type").Raw("SELECT * FROM check_in_outs").First(&listGetCio).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": listGetCio})
// }
// func CheckDoubleCIO(c *gin.Context){
// 	var listGetCio []entity.CHECK_IN_OUT
// 	id := c.Param("id")
// 	if err := entity.DB().Raw("SELECT status_id FROM check_in_outs WHERE location_reservation_id = ?",id).Find(&listGetCio).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": listGetCio})
// }

func CreateCheckInOut(c *gin.Context) {
	var Staff_ID entity.STAFF
	var Location_Reservation_ID entity.LOCATION_RESERVATION
	var Status_ID entity.STATUS
	var Check_IN_OUT entity.CHECK_IN_OUT

	if err := c.ShouldBindJSON(&Check_IN_OUT); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//8: ค้นหาข้อมูลรหัสการจอง (location_reservation)
	if tx := entity.DB().Where("id = ?", Check_IN_OUT.LocationReservationID).First(&Location_Reservation_ID); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Location Reservation not found"})
		return
	}

	//10: ค้นหาด้วย id ของ status (Status_ID)
	if tx := entity.DB().Where("id = ?", Check_IN_OUT.StatusID).First(&Status_ID); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Status ID not found"})
		return
	}

	//?? ค้นหาด้วย id ของ staff ต้องมีไม่งั้นเป็น null
	if tx := entity.DB().Where("id = ?", Check_IN_OUT.StaffID).First(&Staff_ID); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Staff ID not found"})
		return
	}

	//11: สร้าง(staff_ID,location_reservation_ID,status_ID)
	CreateCIO := entity.CHECK_IN_OUT{
		Staff:               Staff_ID,
		Status:              Status_ID,
		LocationReservation: Location_Reservation_ID,
	}

	//12: บันทึก
	if err := entity.DB().Create(&CreateCIO).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": CreateCIO})
}
