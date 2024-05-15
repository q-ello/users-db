import { errorSelector, pageSelector, statusSelector, useAppDispatch, useAppSelector, usersSelector } from '../../redux/hooks'
import { store } from '../../redux/store'
import { Link } from 'react-router-dom'
import { EStatus } from '../../types'
import st from './UsersList.module.css'
import { getUsers } from '../../api/api'

const UsersList = () => {
    const users = usersSelector.selectAll(store.getState())
    const status = useAppSelector(statusSelector)
    const error = useAppSelector(errorSelector)
    const page = useAppSelector(pageSelector)
    const dispatch = useAppDispatch()

    const handleClick = () => {
        dispatch(getUsers(page))
    }

  return (
    <div className={st.container}>
        <ul className={st.users}>
            {users?.map((user, index) => 
                <li className={st.user} key={user.id}><Link to={`/${user.id}`}>User {index + 1}</Link></li>
            )}

            {status === EStatus.loading 
                ? <div>Loading...</div>
                : status === EStatus.failed 
                    ? <div>{error}</div>
                    : ""
            }
        </ul>
        <button onClick={handleClick}>Load more</button>
    </div>
  )
}

export default UsersList