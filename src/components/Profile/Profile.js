import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Bar } from '..'
import './Profile.css'

const Profile = ({ imgSrc, name, email, website, role, say }) => (
  <div className='profile__container'>
    <img className='profile__img' src={imgSrc} />
    <div className='profile__name'>{name}</div>
    <div className='profile__email'>{email}</div>
    {website ? <div className='profile__website' onClick={() => { window.open(website) }}><span>{website}</span></div> : undefined}
    <div className='profile__role'>{role}</div>
    <div className='profile__say'>{say}</div>
    <Bar />
  </div>
)
export default Profile
