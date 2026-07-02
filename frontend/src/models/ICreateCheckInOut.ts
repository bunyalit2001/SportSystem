import {LocationReservationInterface} from './ILocationReservationID'
import { StaffInterface } from './IStaff'
import { StatusIDInterface } from './IStatusID'

export interface CreateCheckInOutInterface{
    ID? : number,
    StaffID?               :number,
	StatusID?              :number,
	LocationReservationID? :number,

	Status              :StatusIDInterface,
	Staff               :StaffInterface,
	LocationReservation :LocationReservationInterface,
}