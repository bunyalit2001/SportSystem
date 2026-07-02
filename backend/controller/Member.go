package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"sport-center-management-system/entity"
)

// POST member
func CreateMembers(c *gin.Context) {

	var Gender entity.GENDER
	var Package entity.PACKAGE
	var Province entity.PROVINCE
	var Member entity.MEMBER

	if err := c.ShouldBindJSON(&Member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//9: ค้นหาด้วย id ของ gender
	if tx := entity.DB().Where("id = ?", Member.GenderID).First(&Gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Location not found"})
		return
	}

	//10: ค้นหาด้วย id ของ package
	if tx := entity.DB().Where("id = ?", Member.PackageID).First(&Package); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Package not found"})
		return
	}

	//11: ค้นหาด้วย id ของ province
	if tx := entity.DB().Where("id = ?", Member.ProvinceID).First(&Province); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Province not found"})
		return
	}

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(Member.Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}

	//12: สร้าง entity member
	mb := entity.MEMBER{
		Email:       Member.Email,         // รายลละเอียดของ email ที่กรอกเข้ามา
		Password:    string(hashPassword), // รายลละเอียดของ password ที่กรอกเข้ามา
		Member_Name: Member.Member_Name,   // รายลละเอียดของ member_name ที่กรอกเข้ามา
		BirthDay:    Member.BirthDay,      // รายละเอียดของ DOB ที่กรอกเข้ามา
		Gender:      Gender,               // โยงความสัมพันธ์กับ Entity GENDER
		Age:         Member.Age,           // รายลละเอียดของ age ที่กรอกเข้ามา
		Weight:      Member.Weight,        // รายลละเอียดของ weight ที่กรอกเข้ามา
		Height:      Member.Height,        // รายลละเอียดของ height ที่กรอกเข้ามา
		Tel:         Member.Tel,           // รายลละเอียดของ Tel ที่กรอกเข้ามา
		Package:     Package,              // โยงความสัมพันธ์กับ Entity PACKAGE
		Province:    Province,             // โยงความสัมพันธ์กับ Entity PROVINCE
	}

	//13: บันทึก
	if err := entity.DB().Create(&mb).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": mb})

}

// // GET gender เตรียมข้อมูลให้ combobox
// func ListGender(c *gin.Context) {
// 	var gender []entity.GENDER

// 	if err := entity.DB().Raw("SELECT * FROM Genders").Scan(&gender).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": gender})
// }

// // GET package เตรียมข้อมูลให้ combobox
// func ListPackage(c *gin.Context) {
// 	var packages []entity.PACKAGE

// 	if err := entity.DB().Raw("SELECT * FROM packages").Scan(&packages).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": packages})
// }

// // GET province เตรียมข้อมูลให้ combobox
// func ListProvine(c *gin.Context) {
// 	var province []entity.PROVINCE

// 	if err := entity.DB().Raw("SELECT * FROM provinces").Scan(&province).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": province})
// }

// func ListMember(c *gin.Context) {
// 	var member []entity.MEMBER
// 	if err := entity.DB().Raw("SELECT * FROM members").Scan(&member).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": member})
// }
