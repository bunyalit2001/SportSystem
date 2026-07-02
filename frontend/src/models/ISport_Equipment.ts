import { SportEuqipmentTypeInterface } from "./ISport_Equipment_Type"
import { SportTypeInterface } from "./ISport_Type"
import { StaffInterface } from "./IStaff"


export interface SportEquipmentInterface{
    ID? : number
    StaffID? : number
    Sport_TypeID? : number
    Sport_Equipment_TypeID? : number

    Sport_Equipment_Name : string
	Sport_Equipment_Amount : number

	Sport_equipment_type? : SportEuqipmentTypeInterface
    Sport_type? : SportTypeInterface
    Staff? : StaffInterface
}