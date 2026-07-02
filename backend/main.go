package main

import (
	"os"

	"github.com/gin-gonic/gin"
	"sport-center-management-system/controller"
	"sport-center-management-system/entity"
	"sport-center-management-system/middlewares"
)

func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}

func main() {

	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())

	//combobox Location
	r.GET("/location", controller.ListLocation)
	//combobox sport type
	r.GET("/sport_type", controller.ListSport_Type)
	//ให้id
	r.GET("/member/:id", middlewares.Authorizes("member"), controller.GetMember)
	r.GET("/staff/:id", middlewares.Authorizes("staff"), controller.GetStaff)
	//แสดงข้อมูลการจอง
	r.GET("/Location_Reservations", controller.ListLocation_Reservation)

	//รับค่าเข้าตาราง
	r.POST("/Location_Reservation", middlewares.Authorizes("member"), controller.CreateLocation_Reservation)

	//combobox Location
	r.GET("/gender", controller.ListGender)
	//combobox sport type
	r.GET("/package", controller.ListPackage)
	//combobox  sport equipment type
	r.GET("/province", controller.ListProvine)
	r.GET("/member", controller.ListMember)
	r.POST("/createmember", controller.CreateMembers)

	//login
	r.POST("/Login", controller.Login)
	r.POST("/StaffLogin", controller.StaffLogin)

	//combobox  sport equipment type
	r.GET("/sport_equipment_type", controller.ListSport_Equipment_Type)
	r.POST("/report", controller.CreateReport)

	// แสดงข้อมูลอุปกรณ์ที่บันทึก
	r.GET("/sport_equipment_data", controller.ListSport_Equipment)
	// sport equipment
	r.POST("/Create_Sports_Equipment", middlewares.Authorizes("staff"), controller.CreateSport_Equipment)

	r.GET("/borrow-sport-eqiupments", controller.ListBorrow_Sport_Eqiupment)
	r.POST("/borrow-sport-eqiupment", middlewares.Authorizes("member"), controller.CreateBorrow_Sport_Eqiupment)

	//combobox payment_type
	r.GET("/payment_type", controller.ListPayment_Type)
	//combobox bank
	r.GET("/bank", controller.ListBank)
	///////////////////////////////////////////////////
	r.POST("/payment", middlewares.Authorizes("member"), controller.CreatePayment)

	r.GET("/statuscheck1", controller.ListStatus1)
	r.GET("/statuscheck2", controller.ListStatus2)

	r.GET("/locationReservation/", controller.ListLocationReservation)
	r.GET("/locationReservation/:id", controller.GetLocationReservation)
	r.GET("/locationReservationField/:id", controller.GetLocationReservationIDEA)

	//GET รับค่ามาแสดง POST ใช้ในการสร้าง (CREATE) จะมีการรับส่งค่า
	r.GET("/ciocheck", middlewares.Authorizes("staff"), controller.ListCIO)
	r.GET("/cioChStatus/:id", middlewares.Authorizes("staff"), controller.CheckDoubleCIO)
	r.POST("/createcio", middlewares.Authorizes("staff"), controller.CreateCheckInOut)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	r.Run(":" + port)
}
