import React from 'react'
import { footerText } from 'configs/config'

const footer = {
    height: '48px',
    lineHeight: '48px',
    textAlign: 'center',
    fontSize: '12px',
    color: '#999',
    background: '#fff',
    boxShadow: '4px 4px 40px 0 rgba(0, 0, 0, 0.05)',
    width: '100%',
}

class FooterComp extends React.Component {
    render() {
        return (
            <div style={footer}>
                {footerText}
            </div>
        )
    }
}

export default FooterComp
