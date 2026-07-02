import {MemberInterface} from './IMember'
import {SportEuqipmentTypeInterface} from './ISport_Equipment_Type'
import {SportEquipmentInterface} from './ISport_Equipment'
export interface CreateBorrow_Sport_EquipmentInterface{
    ID?: number
    Time_Borrow:   Date | null
	Time_GiveBack: Date | null

	MemberID?               :number
	Sport_Equipment_TypeID? :number
	Sport_EquipmentID?      :number

	Member? :              MemberInterface
	Sport_Equipment_Type?: SportEuqipmentTypeInterface
	Sport_Equipment?:      SportEquipmentInterface
    
}