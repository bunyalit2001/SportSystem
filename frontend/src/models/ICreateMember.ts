import { PackageInterface } from './IPackage'
import { ProvinceInterface } from './IProvince'
import { GenderInterface } from './IGender'

export interface CreateMemberInterface {
    ID?: number
    Member_Name: string,
    Email: string,
    Password: string,
    Age: number,
    Height: number,
    Weight: number,
    Tel: string,
    BirthDay: Date | null,

    GenderID?: number,
    ProvinceID?: number,
    PackageID?: number,

    Gender: GenderInterface,
    Province: ProvinceInterface,
    Package: PackageInterface,

}