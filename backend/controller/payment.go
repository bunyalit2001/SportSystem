package controller

import (
	"sport-center-management-system/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST
func CreatePayment(c *gin.Context) {

	var Member entity.MEMBER
	var Payment_Type entity.PAYMENT_TYPE
	var Package entity.PACKAGE
	var Bank entity.BANK
	var Payment entity.PAYMENT

	if err := c.ShouldBindJSON(&Payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//9:ค้นหา package ด้วย id
	if tx := entity.DB().Where("id = ?", Payment.PackageID).First(&Package); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Package Eqipment not found"})
		return
	}

	// 10: ค้นหา Payment Type  ด้วย id
	if tx := entity.DB().Where("id = ?", Payment.Payment_TypeID).First(&Payment_Type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Payment Type Equipment Type not found"})
		return
	}

	// 11: ค้นหา Bank  ด้วย id
	if tx := entity.DB().Where("id = ?", Payment.BankID).First(&Bank); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bank Equipment Type not found"})
		return
	}
	// 12: สร้าง entity Payment
	lr := entity.PAYMENT{
		MemberID:     Payment.MemberID,
		Member:       Member,       // โยงความสัมพันธ์กับ Entity Member
		Payment_Type: Payment_Type, // โยงความสัมพันธ์กับ Entity Sport_Equipment_Type
		Package:      Package,      // โยงความสัมพันธ์กับ Entity Sport_Equipment
		Datetime:     Payment.Datetime,
		Price:        Payment.Price,
		Bank:         Bank,                 //รายละเอียด เวลาเข้า ที่กรอกเข้ามาใน Borrow_Sport_Eqiupment
		Bank_Account: Payment.Bank_Account, //รายละเอียด เวลาเข้า ที่กรอกเข้ามาใน Borrow_Sport_Eqiupment
	}

	// 13: บันทึก
	if err := entity.DB().Create(&lr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": lr})
}

// // 6: GET payment type เตรียมข้อมูลให้ combobox
// func ListPayment_Type(c *gin.Context) {
// 	var Payment_Type []entity.PAYMENT_TYPE

// 	if err := entity.DB().Raw("SELECT * FROM payment_types").Scan(&Payment_Type).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": Payment_Type})
// }

// // 7: GET bank เตรียมข้อมูลให้ combobox
// func ListBank(c *gin.Context) {
// 	var Bank []entity.BANK

// 	if err := entity.DB().Raw("SELECT * FROM banks").Scan(&Bank).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": Bank})
// }
