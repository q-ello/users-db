export interface IUser {
    id: string,
    firstName: string,
    lastName: string,
    age: number,
    email: string,
    department: string,
    company: string,
    jobTitle: string
  }

  export type UserCreatePayload = Omit<IUser, 'firstName' | 'lastName' | 'age' | 'email'>

 export enum EStatus {
    idle, 
    loading,
    success,
    failed
}