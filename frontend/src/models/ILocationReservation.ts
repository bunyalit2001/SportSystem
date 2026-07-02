import { LocationInterface } from "./ILocation"
import { SportTypeInterface } from "./ISport_Type"
import { MemberInterface } from "./IMember"

export interface LocationReservationInterface {
	ID?: number
	Time_In: Date | null
	Time_Out: Date | null

	MemberID?: number
	LocationID?: number
	Sport_TypeID?: number

	Member: MemberInterface
	Location: LocationInterface
	Sport_Type: SportTypeInterface
}