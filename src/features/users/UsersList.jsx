import { useGetUsersQuery } from "./usersApiSlice"
import { Link } from "react-router-dom"
import { ColorRing } from "react-loader-spinner"

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
    } = useGetUsersQuery()

    let content
    
    if(isLoading){
        content = <div className="spinner">
        <ColorRing
  visible={true}
  height="200"
  width="200"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
    </div>
    } else if (isSuccess){

        const{ids, entities} = users
       

    content = (
        <section className="users">
            <h1>USERS</h1>
            <span>--------------------------</span>
            <ul>
                {ids.map(userId =>{
                return <li key={userId}>
                    <h2>NAME: {entities[userId].name}</h2>
                    <h3>LASTNAME: {entities[userId].lastname}</h3>
                    <h3>ROLES: {JSON.stringify(entities[userId].roles)}</h3>
                    <span>--------------------------</span>
                </li>
                })}
            </ul>
            <Link to="/welcome">Back to Welcome</Link>
        </section>
        )
    }else if(isError){
        content = <p>{JSON.stringify(error)}</p>
    }
    return content
}

export default UsersList