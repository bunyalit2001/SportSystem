import { MemberInterface } from "./IMember";
import { LocationInterface } from "./ILocation";
import { SportTypeInterface } from "./ISport_Type";
export interface LocationReservationInterface {
    ID: number,
    MemberID?: number;
	LocationID?: number;
	Sport_TypeID?: number;
	Time_In:  Date | null;
	Time_Out: Date | null;

	Member?:     MemberInterface;
	Location?:   LocationInterface;
	Sport_Type?: SportTypeInterface;

}