import React from 'react'
import spinner from '../../img/loading.png'
import '../../styles/spinner.css'


export default function Spinner() {
    return (
        <div>
                <img 
                    src={spinner}
                    alt="Loading..."
                    className = "spinner" />    
            </div>
    )
}


// export default () => {
//         return (
//             <div>
//                 <img 
//                     src={spinner}
//                     alt="Loading..."
//                     className = "spinner" />    
//             </div>
//         )
// }
