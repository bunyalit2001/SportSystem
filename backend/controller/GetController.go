package controller

import (
	"sport-center-management-system/entity"

	"github.com/gin-gonic/gin"

	"net/http"

	"fmt"
)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ดึงข้อมูลบันทึกอุปกรณ์มาแสดง /borrow-sport-eqiupments
func ListBorrow_Sport_Eqiupment(c *gin.Context) {

	var borrowsporteq []entity.BORROW_SPORT_EQUIPMENT

	if err := entity.DB().Preload("Member").Preload("Sport_Equipment_Type").Preload("Sport_Equipment").Raw("SELECT * FROM borrow_sport_eq_ui_pments").Scan(&borrowsporteq).Find(&borrowsporteq).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": borrowsporteq})

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

func ListStatus1(c *gin.Context) {
	var StatusCheck1 []entity.STATUS
	if err := entity.DB().Raw("SELECT * FROM statuses WHERE id = 1").Scan(&StatusCheck1).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": StatusCheck1})
}
func ListStatus2(c *gin.Context) {
	var StatusCheck2 []entity.STATUS
	if err := entity.DB().Raw("SELECT * FROM statuses WHERE id = 2").Scan(&StatusCheck2).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": StatusCheck2})
}

func ListLocationReservation(c *gin.Context) {
	var locationReservation []entity.LOCATION_RESERVATION
	if err := entity.DB().Preload("Member").Preload("Location").Preload("Sport_Type").Raw("SELECT * FROM location_reservations").Scan(&locationReservation).Find(&locationReservation).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": locationReservation})
}

func GetLocationReservation(c *gin.Context) {
	var locationReservation entity.LOCATION_RESERVATION
	id := c.Param("id")
	if err := entity.DB().Preload("Member").Preload("Location").Preload("Sport_Type").Raw("SELECT * FROM location_reservations WHERE id = ?", id).Scan(&locationReservation).First(&locationReservation).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": locationReservation})
}

func GetLocationReservationIDEA(c *gin.Context) {
	var locationReservation []entity.LOCATION_RESERVATION
	id := c.Param("id")
	if err := entity.DB().Preload("Member").Preload("Location").Preload("Sport_Type").Raw("SELECT * FROM location_reservations WHERE id = ?", id).First(&locationReservation).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": locationReservation})
}
func ListCIO(c *gin.Context) {
	var listGetCio []entity.CHECK_IN_OUT
	if err := entity.DB().Preload("Member").Preload("Location").Preload("Sport_Type").Raw("SELECT * FROM check_in_outs").First(&listGetCio).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": listGetCio})
}
func CheckDoubleCIO(c *gin.Context) {
	var listGetCio []entity.CHECK_IN_OUT
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT status_id FROM check_in_outs WHERE location_reservation_id = ?", id).Find(&listGetCio).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": listGetCio})
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 5: GET location เตรียมข้อมูลให้ combobox
func ListLocation(c *gin.Context) {
	var location []entity.LOCATION

	if err := entity.DB().Raw("SELECT * FROM locations").Scan(&location).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": location})
}

// 6: GET sport type เตรียมข้อมูลให้ sport type
func ListSport_Type(c *gin.Context) {
	var Sport_Type []entity.SPORT_TYPE

	if err := entity.DB().Raw("SELECT * FROM sport_types").Scan(&Sport_Type).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Sport_Type})
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ดึงข้อมูลการจองมาแสดง
func ListLocation_Reservation(c *gin.Context) {

	var Location_Reservation []entity.LOCATION_RESERVATION

	if err := entity.DB().Preload("Member").Preload("Location").Preload("Sport_Type").Raw("SELECT * FROM location_reservations").Scan(&Location_Reservation).Find(&Location_Reservation).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Location_Reservation})

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// GET /member/:id
func GetMember(c *gin.Context) {
	var member entity.MEMBER
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM members WHERE id = ?", id).Scan(&member).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": member})
}

// GET /staff/:id
func GetStaff(c *gin.Context) {
	var staff entity.STAFF
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM staffs WHERE id = ?", id).Scan(&staff).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	fmt.Println()

	c.JSON(http.StatusOK, gin.H{"data": staff})
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// GET gender เตรียมข้อมูลให้ combobox
func ListGender(c *gin.Context) {
	var gender []entity.GENDER

	if err := entity.DB().Raw("SELECT * FROM Genders").Scan(&gender).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": gender})
}

// GET package เตรียมข้อมูลให้ combobox
func ListPackage(c *gin.Context) {
	var packages []entity.PACKAGE

	if err := entity.DB().Raw("SELECT * FROM packages").Scan(&packages).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": packages})
}

// GET province เตรียมข้อมูลให้ combobox
func ListProvine(c *gin.Context) {
	var province []entity.PROVINCE

	if err := entity.DB().Raw("SELECT * FROM provinces").Scan(&province).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": province})
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

func ListMember(c *gin.Context) {
	var member []entity.MEMBER
	if err := entity.DB().Raw("SELECT * FROM members").Scan(&member).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": member})
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 6: GET payment type เตรียมข้อมูลให้ combobox
func ListPayment_Type(c *gin.Context) {
	var Payment_Type []entity.PAYMENT_TYPE

	if err := entity.DB().Raw("SELECT * FROM payment_types").Scan(&Payment_Type).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Payment_Type})
}

// 7: GET bank เตรียมข้อมูลให้ combobox
func ListBank(c *gin.Context) {
	var Bank []entity.BANK

	if err := entity.DB().Raw("SELECT * FROM banks").Scan(&Bank).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Bank})
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

func ListSport_Equipment_Type(c *gin.Context) {
	var Sport_Equipment_Type []entity.SPORT_EQUIPMENT_TYPE

	if err := entity.DB().Raw("SELECT * FROM sport_eq_ui_pment_types").Scan(&Sport_Equipment_Type).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Sport_Equipment_Type})
}

// ดึงข้อมูลบันทึกอุปกรณ์มาแสดง /sport_equipment_data
func ListSport_Equipment(c *gin.Context) {

	var Sport_Equipment []entity.SPORT_EQUIPMENT

	if err := entity.DB().Preload("Staff").Preload("Sport_type").Preload("Sport_equipment_type").Raw("SELECT * FROM sport_eq_ui_pments").Scan(&Sport_Equipment).Find(&Sport_Equipment).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Sport_Equipment})

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
