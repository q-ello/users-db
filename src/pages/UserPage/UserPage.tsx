import { Link, useParams } from 'react-router-dom'
import UsersList from '../../components/UsersList/UsersList'
import { usersSelector } from '../../redux/hooks'
import { store } from '../../redux/store'
import UserProfile from '../../components/UserProfile/UserProfile'

const UserPage = () => {
    const {id} = useParams()
    const user = usersSelector.selectById(store.getState(), id)

    if (user)
        return (
        <div>
            <UsersList/>
            {user && <UserProfile {...user}/>}
        </div>
    ) 

    else return (
        <div>
            User with id {id} not found. Please return to the main <Link to={'/'}>page</Link>
        </div>
    )
    
}

export default UserPage