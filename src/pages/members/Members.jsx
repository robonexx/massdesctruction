import { useIsDesktop } from '../../hooks/useMediaQuery'
import BGMEM from '../../assets/images/bg_members.png'
import BGMobile from '../../assets/images/bg_mobile.png'
import Loading from '../../components/loading/Loading'
import useFetch from '../../hooks/useFetch'
import MemberList from './MemberList'
//style 
import './Members.scss'

const Members = () => {

  const {
    data: members,
    isLoading,
    error,
  } = useFetch('https://my-json-server.typicode.com/xxrobone/db/members');

  const desktop = useIsDesktop()
  return (
    <>
       <img src={desktop ? BGMEM : BGMobile} alt="" className='bg_main' />
      <div className="content_wrapper members">
           <div className='members'>
          <h1>MEMBERS</h1>
          {error && <div>{error}</div>}
      {isLoading && (
        <div>
          <Loading />
        </div>
      )}
        {members && (
          <MemberList members={members} />
        )
        }
          {desktop ? <span className='passed'>(R.i.P 13 februari 1980. ✝ 14 december 2016)</span> : ''}
                       
           </div>
    </div>
    </>
  )
}

export default Members
