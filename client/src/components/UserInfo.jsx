import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { useAuthContext } from '../hooks/useAuthContext'
const apiUrl = process.env.REACT_APP_API_URL

function ShowFollowers({followers}){
    const { user } = useAuthContext()
    let loggedUser = "null"
    if (user) {
        loggedUser = jwtDecode(user.jwt).username
        
    }
   
    const followerButtons = followers.map((follower, index) =>
    
        <Link key={index} to={follower === loggedUser ? '/profile' : '/user/' + follower } className='followerName'>
            <h3>{follower}</h3>
            <span className="tooltiptext">{follower}</span>
        </Link>
    )
    
    return(
        followerButtons
    )
}
function ShowFollowed({followeds}){
    const { user } = useAuthContext()
    let loggedUser = "null"
    if (user) {
        loggedUser = jwtDecode(user.jwt).username
        
    }
   
 const followedButtons = followeds.map((followed, index) =>
        <Link key={index} to={followed === loggedUser ? '/profile' : '/user/' + followed} className='followerName'>
          <h3>{followed}</h3>
          <span className="tooltiptext">{followed}</span>
        </Link>
    )
    
    return(
        followedButtons
    )
}
function UserInfo({nameOfUser}) {
    const { user } = useAuthContext()
    let loggedUser = "null"
    if (user) {
        loggedUser = jwtDecode(user.jwt).username
        
    }
    if(nameOfUser === loggedUser){
        window.location.href = "/profile#/profile"
    }
    const person = {
        name: nameOfUser,
        description: "My amazing description",
        pfpLink: "https://www.w3schools.com/images/w3schools_green.jpg",
        followers: ["SomeDude", "BestDude", "WorstDude"],
        follows: ["TheBestOfAllDudes", "AverageDude"],
        verified: true,
        followed: true
    
    }
    
  
    

    const [followers, setFollowers] = useState(person.followers)
    const [followeds, setFolloweds] = useState(person.follows)
    const [picture, setPicture] = useState("")
    const [verified, setVerified] = useState(false)
    const [followed, setFollowed] = useState(false)
    const [desc, setDesc] = useState(person.description)
    const [followersShown, setFollowersShown] = useState(false)
    const [followedShown, setFollowedShown] = useState(false)
    const [isLoading, setIsLoading] = useState(null)
    
    const fetchUser = async() => {
            
        let response = null
        response = await fetch(apiUrl + '/user/' + nameOfUser)
        const json = await response.json()
       
        if(json.followers.includes(loggedUser)){
            setFollowed(true)
        }
        else{
            setFollowed(false)
        }
        setVerified(json.verified)
        setPicture(json.pfpUrl)
        setDesc(json.description)
        setFolloweds(json.follows)
        setFollowers(json.followers)
       
    }  
    useEffect(() => {
            
            fetchUser()
            setFollowedShown(false)
            setFollowersShown(false)

    }, [nameOfUser])
   
    const follow = async () => {
        setIsLoading(true)
        const body = {
          jwt: user.jwt,
          username: nameOfUser
        }
        console.log(body)
    
        const response = await fetch(apiUrl + '/user/follow/', {
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
          if (followers.includes(loggedUser)) {
            const newFollowers = followers.filter((element) => element !== loggedUser)
            setFollowers(newFollowers)
          }
          if (!followers.includes(loggedUser)) {
            setFollowers([...followers, loggedUser])
          }
          
        }
      }

    const toggleFollowed = (e) => {
        followed ? setFollowed(false) : setFollowed(true)
        follow()
        
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
            <h2>{nameOfUser} {verified ? "✓" : ""}</h2>
            
            <div className='dropdownsContainer'>
            <div className='followersSet'>
            <button
            onClick={toggleFollowersShown}
            >Followers {followers.length} {followersShown ? "▲" : "▼"}</button>
            <div 
            className='followersContainer'
            style={{ visibility: followersShown ? 'visible' : 'hidden' }}
            >
            <ShowFollowers followers={followers} username={nameOfUser}></ShowFollowers>
            </div>
            </div>
            <div className='followedSet'>
            <button
            onClick={toggleFollowedShown}
            >Following {followeds.length} {followedShown ? "▲" : "▼"}</button>
            <div 
            className='followedContainer'
            style={{ visibility: followedShown ? 'visible' : 'hidden' }}
            >
            <ShowFollowed followeds={followeds} username={nameOfUser}></ShowFollowed>
            </div>
            </div>
            <button
            disabled={isLoading}
            onClick={toggleFollowed}
            >{followed ? "Followed" : "Follow"}</button>
            </div>
            
            </div>
            <div className='bottomUserProfile'>
            <h3>Description</h3>
            
                
                <textarea 
                    type='text'
                    
                    readOnly
                    value={desc}
                />
                 
            
            </div>
            
        </div>
    )

}
export default UserInfo
