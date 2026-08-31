import { Link } from "react-router-dom";

// styles
import './MemberList.scss'

const MemberList = ({ members, name }) => {
    
   
    return ( 
        <div className="member_list">
            <h2>{ name }</h2>
            {members.map((member) => ( 
                // need to add a key attribute on this to blog.id
                <div key={member.id}>
                    <Link to={`/members/${member.id}`}>
                        <h2><span></span>{ member.name}</h2>                    
                    </Link>
                </div>
            ))}
        </div>
     );
}
 
export default MemberList;

 /*   */
