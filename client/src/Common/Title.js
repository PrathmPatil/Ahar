import { InfoCircleOutlined } from '@ant-design/icons'
import React from 'react'
import "./common.scss"
function Title({isRequired,title,info}) {
  return (
    <div className='common_title'>
      <h6>{title}</h6> 
      {isRequired && <p className='isRequired'>*</p>}
      {info && <InfoCircleOutlined title={info}/>}
    </div>
  )
}

export default Title
