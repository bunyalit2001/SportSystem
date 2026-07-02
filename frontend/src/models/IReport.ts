import {LocationInterface} from "./ILocation"
import {SportEuqipmentTypeInterface} from "./ISport_Equipment_Type"
import {SportTypeInterface} from "./ISport_Type"

export interface ReportInterface {
    ID? : number
    Detail: string | null 

	LocationID? : number
	Location : LocationInterface

	Sport_Equipment_TypeID? : number 
	Sport_Equipment_Type  : SportEuqipmentTypeInterface

	Sport_TypeID? : number
	Sport_Type : SportTypeInterface 

}