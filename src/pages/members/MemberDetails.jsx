import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch'
import { useIsDesktop } from '../../hooks/useMediaQuery'
import Loading from '../../components/loading/Loading'
import BGMEM from '../../assets/images/bg_members2.png'
import BGMobile from '../../assets/images/bg_mobile.png'

// styles
import './MemberDetails.scss'

const MemberDetails = () => {
  const { id } = useParams();
  const {
    data: member,
    error,
    isLoading,
  } = useFetch(`https://my-json-server.typicode.com/xxrobone/db/members/${id}`);

  const desktop = useIsDesktop();

  return (
    <>
       <img src={desktop ? BGMEM : BGMobile} alt="" className='bg_main' />
    <div className='member_details'>     
    {error && <div>{error}</div>}
      {isLoading && (
        <div>
          <Loading />
        </div>
      )}
      {member && (
        <article key={member.name}>
          <h2>{member.name}</h2>
                  <p>{member.desc}</p>
                  <img src={`${member.image}`} alt={member.name} />
        </article>
      )}
    </div>
    
    </>
  );
};

export default MemberDetails;
