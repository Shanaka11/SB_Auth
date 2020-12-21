// React Imports
import React from 'react'
// Additiona React Imports
// Local Imports
import {InfoCardAdmin} from '../components'
import {MetaProvider} from '../context'
// CSS Imports

const Admin = () => {
    // Context
    // States
    // Handle State Change

    return (
        <div className="container">        
            <h1>Admin Console</h1>
            <MetaProvider>
                <InfoCardAdmin list/>
            </MetaProvider>
        </div>
    )
}

export default Admin
