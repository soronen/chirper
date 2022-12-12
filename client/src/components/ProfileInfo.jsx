import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { useAuthContext } from '../hooks/useAuthContext'
const apiUrl = process.env.REACT_APP_API_URL


const person = {
    name: "PeteBoi",
    description: "My amazing description",
    pfpLink: "https://www.w3schools.com/images/w3schools_green.jpg",
    followers: [],
    follows: [],
    verified: true

}
function ShowFollowers({followers}){
   
    const followerButtons = followers.map((follower, index) =>
        <Link key={index} to={'/user/' + follower} className='followerName'>
            <h3>{follower}</h3>
            <span className="tooltiptext">{follower}</span>
        </Link>
    )
    
    return(
        followerButtons
    )
}
function ShowFollowed({followed}){
 
    const followedButtons = followed.map((followed, index) =>
        <Link key={index} to={'/user/' + followed} className='followerName'>
          <h3>{followed}</h3>
          <span className="tooltiptext">{followed}</span>
        </Link>
    )
    
    return(
        followedButtons
    )
}

function ProfileInfo() {
    
    const { user } = useAuthContext()
    let username = "null"
    if (user) {
        username = jwtDecode(user.jwt).username
        
    }
   
    
    
    const [followers, setFollowers] = useState(person.followers)
    const [followed, setFollowed] = useState(person.follows)
    const [picture, setPicture] = useState("")
    const [verified, setVerified] = useState(false)
    const [desc, setDesc] = useState("")
    const [followersShown, setFollowersShown] = useState(false)
    const [followedShown, setFollowedShown] = useState(false)
    const [descIsChanged, setDescIsChanged] = useState(false)
    const [isLoading, setIsLoading] = useState(null)
    useEffect(() => {
        const fetchUser = async() => {
            if(username !== 'null'){
                let response = null
                response = await fetch(apiUrl + '/user/' + username)
                const json = await response.json()
                setVerified(json.verified)
                setPicture(json.pfpUrl)
                setDesc(json.description)
                setFollowed(json.follows)
                setFollowers(json.followers)
            }

           
        }  
            fetchUser()
    }, [username])
   
    const saveDescription = async () => {
        setIsLoading(true)
        const body = {
          jwt: user.jwt,
          description: desc,
          pfpUrl: null
        }
        console.log(body)
    
        const response = await fetch(apiUrl + '/user/editProfile/', {
          method: 'PATCH',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
            setIsLoading(false)
          console.log('not okay', response)
        }
        if (response.ok) {
            setIsLoading(false)
          console.log('okay', response)
          
        }
      }
    

    const handleSubmit = (e) => {
      e.preventDefault()
      
      console.log(desc)
      
        
      if (desc.length > 280) {
        alert('Description must be fewer than 280 characters!')
      }
      else{
        setDescIsChanged(false)
        saveDescription()
      }
    }
    const toggleVerified = (e) => {
        verified ? setVerified(false) : setVerified(true)
        
    }
    const toggleFollowersShown = (e) => {
        followersShown ? setFollowersShown(false) : setFollowersShown(true)
        if(followedShown){
            setFollowedShown(false)
        }
    }
    const toggleFollowedShown = (e) => {
        followedShown ? setFollowedShown(false) : setFollowedShown(true)
        if(followersShown){
            setFollowersShown(false)
        }
    }
    return (
        <div className='profileContainer'>
            <div className='topProfile'>
            <img src={picture} alt="Profile Picture" />
            <h2>{username} {verified ? "✓" : ""}</h2>
            
            <div className='dropdownsContainer'>
            <div className='followersSet'>
            <button
            onClick={toggleFollowersShown}
            >Followers {followers.length} {followersShown ? "▲" : "▼"}</button>
            <div 
            className='followersContainer'
            style={{ visibility: followersShown ? 'visible' : 'hidden' }}
            >
            <ShowFollowers followers={followers}></ShowFollowers>
            </div>
            </div>
            <div className='followedSet'>
            <button
            onClick={toggleFollowedShown}
            >Following {followed.length} {followedShown ? "▲" : "▼"}</button>
            <div 
            className='followedContainer'
            style={{ visibility: followedShown ? 'visible' : 'hidden' }}
            >
            <ShowFollowed followed={followed}></ShowFollowed>
            </div>
            </div>
            <button
            onClick={toggleVerified}
            >{verified ? "Unverify Me!" : "Verify Me!"}</button>
            </div>
            
            </div>
            <div className='bottomProfile'>
            <h3>Description</h3>
            <form
            onSubmit={handleSubmit}
            >
                
                <textarea
                    disabled={isLoading}
                    type='text'
                    onChange={e => { setDesc(e.target.value); setDescIsChanged(true) }}
                    
                    value={desc}
                />
                 <button type='submit' disabled={!descIsChanged}>Save Changes</button>
            </form>
            </div>
            
        </div>
    )

}
export default ProfileInfo
