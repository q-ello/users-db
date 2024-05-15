import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { IUser } from '../../types'
import st from './UserProfile.module.css'
import { saveStatusSelector, useAppDispatch, useAppSelector } from '../../redux/hooks'
import { updateUser } from '../../api/api'
import { clearSaveStatus } from '../../redux/usersSlice'

const UserProfile = (user: IUser) => {
  const { id, firstName, lastName, age, email, company, department, jobTitle } = user
  const [companyValue, setCompanyValue] = useState<string>(company)
  const [departmentValue, setDepartmentValue] = useState<string>(department)
  const [jobTitleValue, setJobTitleValue] = useState<string>(jobTitle)
  const saveStatus = useAppSelector(saveStatusSelector)

  const dispatch = useAppDispatch()


  useEffect(() => {
    setCompanyValue(company)
    setDepartmentValue(department)
    setJobTitleValue(jobTitle)
    dispatch(clearSaveStatus())
  }, [id])


  const handleCompanyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCompanyValue(e.target.value)
  }

  const handleDepartmentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDepartmentValue(e.target.value)
  }

  const handlejobTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setJobTitleValue(e.target.value)
  }

  const saveData = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(updateUser({ id, company: companyValue, department: departmentValue, jobTitle: jobTitleValue }))
  }

  return (
    <div className={st.container}>
      <div>{firstName} {lastName}</div>
      <div>Age: {age}</div>
      <div>Email: {email}</div>
      <form onSubmit={saveData}> 
        <div>
          Company: <input type='text' value={companyValue} onChange={handleCompanyChange} />
        </div>
        <div>
          Department: <input type='text' value={departmentValue} onChange={handleDepartmentChange} />
        </div>
        <div>
          Job Title: <input type='text' value={jobTitleValue} onChange={handlejobTitleChange} />
        </div>
        <button type='submit'>Save</button>
      </form>
      {saveStatus !== null && <div>{saveStatus ? 'Saved successfully' : 'Failed to save'}</div>}
    </div>
  )
}

export default UserProfile