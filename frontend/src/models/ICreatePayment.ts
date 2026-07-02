import {PackageInterface} from './IPackage'
import {Payment_TypeInterface} from './IPayment_Type'
import {MemberInterface} from './IMember'
import {BankInterface} from './IBank'
export interface CreatePaymentInterface{
    ID? : number,
    MemberID?       :number,
	Payment_TypeID? :number,
	PackageID?      :number,
	BankID?         :number,

	////เป็นข้อมูล member ใช้เพื่อให้ join ง่ายขึ้น////////////
	Member       :MemberInterface,
	Payment_Type :Payment_TypeInterface,
	Package      :PackageInterface,
	Bank         :BankInterface,

	/////////////////////////////////////////////////
	Datetime     :Date|null,
	Price        :number,
	Bank_Account :string,
}