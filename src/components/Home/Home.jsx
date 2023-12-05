import React, { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Cookies from "js-cookie";  
import Header from './Header';
import { useEffect } from 'react';
import { MdPersonAddAlt1 } from "react-icons/md";
import { MdGroupAdd } from "react-icons/md";
// import InputBox from './InputBox';
import axios from 'axios';
import toast from 'react-hot-toast';
// const chatId = JSON.parse(localStorage.getItem("chatAppUserId")) ;
// toast.success(`chat id is : ${chatId}`)
// const name = Cookies.get('jwt_token');
// let token = Cookies.get("jwt_token");
const Home = () => {
  const [formData, setFormData] = useState({
    name : '',
    users: [],
  })
  const [fetchUsers, setFetchUsers] = useState([]);

  const [submitClick,setSubmitClick]=useState(false);
  const [addUser,setAddUser] = useState('');
  const [isModel,setIsModel] = useState(false);
  const [groupModel,setGroupModel] = useState(false);
  const [userModel,setUserModel] = useState(false);
  const [name, setName] = useState('')
  const [isUsers, setIsUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState('')
  const { id }= useParams();


  async function gettingUsers()
  {
    const customConfig = {
      headers: {
          "Content-Type": "application/json",
      },
    };
    const chatUsers = await axios("http://localhost:3005/users");
    console.log(' chat users : ',chatUsers.data.data);
    setFetchUsers(chatUsers.data.data)
    // chatUsers.data.data.forEach((user)=>console.log(user.email));
    console.log(' chat user id : ',chatUsers.data.data[0]['_id']);
  }

  useEffect(function(){
    gettingUsers();
  }, [])
  let myusers = [
    {name:'abdul',email:'ab1@gmail.com'},
    {name:'razzak',email:'ab2@gmail.com'},
    {name:'mohammed',email:'ab3@gmail.com'},
    {name:'qureshi',email:'ab4@gmail.com'},
    {name:'ghouse',email:'ab5@gmail.com'},
    {name:'azam',email:'ab6@gmail.com'},
    {name:'immu',email:'ab7@gmail.com'},
  ];

  myusers.map((user)=>console.log(user.name,user.email));
  

  let token = Cookies.get("jwt_token");
  const obj ={
    _id:'1234567890',
    '_id':'0987654321',
    id:'asdfghjkl',
  }
  // console.log("1",obj.id);
  // console.log("2",obj._id);
  // console.log("3",obj['_id']);
  // let arr = [];

  function onCancelModel()
  {
    console.log('on cancel name : ',name)
    setIsModel(false);
    setIsUsers([]);
    setName('');
    console.log('on cancel name : ',name)
  }


  async function onCreateGroup()
  {
    const customConfig = {
      headers: {
          "Content-Type": "application/json",
      },
    };
    setSubmitClick(true);
    if(name.length == 0 || isUsers.length == 0)
    {

      return;
    }
    let usersIds = '';
    fetchUsers.forEach((user)=>{
      isUsers.forEach((name,index)=>{
        if(name==user.name){
          if(isUsers.length-1==index)
          {
            usersIds+=user['_id'];
          }
          else{
            usersIds+=user['_id']+',';
          }
        }
      })
    });
    console.log('users ids of the selected users : ',usersIds);
    const createGroupPayload = {
      name : name,
      isPersonal : 0,
      admin : JSON.parse(localStorage.getItem("chatAppUserId")), 
      users : usersIds,
    };
    console.log('create group payload is : ',createGroupPayload);
    // const createdGroup = await axios.post('http://localhost:3005/groups',createGroupPayload,customConfig);
    // console.log('group created : ',createdGroup);

    setName('');
    setIsUsers([]);
    setIsModel(false);
    toast.success('Group created successfully !.')
  }

  function onSubmitFormData(event)
  {
    if(event.target.checked)
    {
      setIsUsers([...isUsers,event.target.id]);
      console.log('user selected :' ,event.target.checked);
      console.log('user name: ',event.target.id);
    }
    else{
      console.log('in false ',event.target.id, event.target.checked)
      setIsUsers([...isUsers.filter(ele=>event.target.id!=ele)])
    }
  }
  
  return (
    <>
      { !token ? (
        <Navigate to="/signin" replace={true} />
      ) : isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="container">
          <Header />
          <div className="btns">
            <div className="add-group-btn button" onClick={()=>{setGroupModel(true);setIsModel(true);setUserModel(false)}}>
              <MdGroupAdd />
              <span>Add Group</span>
              </div>
            <div className="add-user-btn button" onClick={()=>{setUserModel(true);setIsModel(true);setGroupModel(false)}}> 
              <MdPersonAddAlt1 />
              <span>Add User</span>
            </div>
          </div>
          <div className={`input-container ${isModel ? '': 'hide'}`}>
              <div className={`grp-box  ${groupModel ? '':'grp-model'}`}>
                <div className="field">
                  <div >Name* </div>
                  <input type="text" id="name" value={name} onChange={(event)=>setName(event.target.value)}  placeholder='Enter Group Name ...' required />
                  <div className={`${submitClick ? name.length ==0 ? 'error':'solve':'solve'} `}>Name* is required.</div>
                </div>
                <div className="field">
                  <div >members* </div>
                  <input type="text" id="users" value={`${isUsers.map((element,index)=>element)}`}   placeholder='select the users to add into group ...' required />
                  <div className={`${submitClick ? isUsers.length ==0 ? 'error':'solve':'solve'} `}>No Users* has been added</div>
                </div>
                <div className="list">
                  <ul>
                    {/* <li> <input type="checkbox"  name="check"  className="click" onClick={onSubmitFormData}   id="user1"/> <span>User1</span></li>
                    <li> <input type="checkbox"  name="check"  className="click" onClick={onSubmitFormData}   id="user2"/> <span>User2</span></li>
                    <li> <input type="checkbox"  name="check"  className="click" onClick={onSubmitFormData}   id="user3"/> <span>User3</span></li>
                    <li> <input type="checkbox"  name="check"  className="click" onClick={onSubmitFormData}   id="user4"/> <span>User4</span></li>
                    <li> <input type="checkbox"  name="check"  className="click" onClick={onSubmitFormData}   id="user5"/> <span>User5</span></li> */}
                    {/* <li> <input type="checkbox"  name="check"  className="click" onClick={onSubmitFormData}   id="user6"/> <span>User5</span></li>
                    <li> <input type="checkbox"  name="check"  className="click" onClick={onSubmitFormData}   id="user7"/> <span>User5</span></li>
                    <li> <input type="checkbox"  name="check"  className="click" onClick={onSubmitFormData}   id="user8"/> <span>User5</span></li>
                    <li> <input type="checkbox"  name="check"  className="click" onClick={onSubmitFormData}   id="user9"/> <span>User5</span></li>
                    <li> <input type="checkbox"  name="check"  className="click" onClick={onSubmitFormData}   id="user10"/> <span>User5</span></li> */}
                    {fetchUsers.map((user,index)=><li key={index}> <input type="checkbox"  name="check"  className="click" onClick={onSubmitFormData}   id={`${user.name}`}/> <span>{user.name}</span></li>
                    )}
                  </ul> 
                </div>
                <div className="create-grp-btns">
                  <button className='cancel' onClick={onCancelModel}>Cancel</button>
                  <button className='create' onClick={onCreateGroup}>Create Group</button>
                </div>
              </div>
              <div className={`user-box  ${userModel ? '':'user-model'}`}>
                <div className="field">
                  <div >members* </div>
                  <input type="text" id="users" value={`${selectedUser && selectedUser}`}   placeholder='select the user to start the chat ...' required />
                  <div className={`${submitClick ? selectedUser.length == 0 ? 'error':'solve':'solve'} `}>No User* has been selected</div>
                </div>
                <div className="list">
                  <ul>
                    {/* <li> <input type="radio" name="check" className="click" onClick={(e)=>setSelectedUser(e.target.id)}   id="user1"/> <span>User1</span></li>
                    <li> <input type="radio"  name="check" className="click" onClick={(e)=>setSelectedUser(e.target.id)}  id="user2"/> <span>User2</span></li>
                    <li> <input type="radio"  name="check" className="click" onClick={(e)=>setSelectedUser(e.target.id)}  id="user3"/> <span>User3</span></li>
                    <li> <input type="radio"  name="check" className="click" onClick={(e)=>setSelectedUser(e.target.id)}  id="user4"/> <span>User4</span></li>
                    <li> <input type="radio"  name="check"  className="click" onClick={(e)=>setSelectedUser(e.target.id)} id="user5"/> <span>User5</span></li> */}
                    {fetchUsers.map((user,index)=><li key={index}> <input type="radio"  name="check"  className="click" onClick={(e)=>setSelectedUser(e.target.id)}   id={user.name}/> <span>{user.name}</span></li>
                    )}
                  </ul> 
                </div>
                <div className="create-grp-btns">
                  <button className='cancel' onClick={onCancelModel}>Cancel</button>
                  <button className='create'>Start Chat</button>
                </div>
              </div>
          </div>
              
          <div className="list-container">
            <div className="group-list">group1</div>
            <div className="user-list">user1 Lorem, ipsum dolor sit amet consectetur adipisicing elit. A, perspiciatis vero labore nam aliquam dolore ducimus qui exercitationem nihil voluptate deleniti numquam ipsum quisquam rem dignissimos? Facilis delectus in sapiente.
            Non eaque, est, reprehenderit laboriosam minus dolore molestiae, eius unde impedit placeat quaerat at dolores dolor facere totam magnam suscipit in obcaecati nihil ratione autem modi quisquam labore doloremque! Voluptates.
            Veritatis corporis rerum reprehenderit quae pariatur eum, blanditiis dignissimos amet, dolor, tenetur beatae esse quos quibusdam debitis perspiciatis! Expedita perferendis sapiente fugit accusantium, aliquid voluptate nesciunt soluta provident velit ex!
            Debitis enim quaerat laboriosam molestias excepturi perspiciatis ab odio tempora consequatur labore quasi voluptatem reiciendis provident eos ratione nostrum necessitatibus repellendus, optio alias aperiam, pariatur neque? Consequatur beatae aspernatur quidem.
            Placeat nihil consequuntur ratione culpa maxime recusandae, obcaecati fugiat numquam voluptatibus sint rem error? Iste, esse ab recusandae mollitia accusamus reprehenderit repellat similique quibusdam officiis officia deleniti natus asperiores amet!
            Error facere laborum fugit. Exercitationem libero necessitatibus natus assumenda sint illo iste doloremque quas sed saepe quia officiis quaerat reprehenderit ad nisi distinctio modi voluptas aperiam error, nesciunt, quos earum.
            Perspiciatis quibusdam quia, at alias quod ipsum voluptatibus nulla maxime ea? Nisi, nobis. Ullam dicta ducimus ut magni dignissimos hic sunt vitae similique. Rerum autem ducimus, necessitatibus illum ea dolorum.
            Soluta recusandae dolore blanditiis sit ea nihil eaque esse. Aliquam, ad neque consectetur error voluptatem perferendis modi quis praesentium non quisquam aliquid beatae ducimus sit, ipsam nobis, eius iusto vel.
            Deleniti fugit quaerat iste soluta asperiores repellendus, nam amet! Consequuntur veniam est ab et corporis eius nihil aliquam sunt, blanditiis natus quisquam voluptatum, quae dicta nesciunt officia numquam vitae dolore?
            Eos nemo cum odit, magni hic sit enim error doloremque ipsa ducimus? Inventore eaque facilis, cupiditate quasi obcaecati quidem expedita ipsum natus impedit rem laborum, vero cumque mollitia quo magnam.
            Quasi repellendus doloribus quam, pariatur minus fugit vero exercitationem, aperiam distinctio iusto necessitatibus modi. Quas iste, enim repellendus facere sit eos earum temporibus molestiae in! Consectetur quaerat soluta voluptas dolores.
            Aliquam repudiandae magni aperiam nobis, repellat asperiores exercitationem! Voluptate ducimus ad voluptatum maxime sit mollitia molestias sint et laudantium iusto reprehenderit aut maiores itaque, placeat harum quo autem ipsa quas.
            Beatae laudantium veritatis quibusdam magni quae libero sapiente odit obcaecati dolore quisquam maxime, voluptates dolorum nihil eaque porro iure unde magnam culpa, reprehenderit quam numquam! Nulla sapiente veniam exercitationem vero?
            Eos unde, commodi eveniet adipisci molestiae et? Quas ipsa sunt magni praesentium odit, dolores vel illum hic veritatis incidunt aut, nesciunt at aliquid necessitatibus nobis dicta, suscipit a veniam eius!
            Laboriosam reiciendis ea vel, nisi exercitationem cum sunt eum itaque, autem dolores architecto dolore aut! Debitis cumque quasi culpa eos esse provident quia ex, excepturi, ipsam quas reprehenderit, nemo quos?
            Et, aspernatur deserunt illo amet quaerat rem unde? Voluptate animi exercitationem ipsum quo ea nobis culpa possimus quod facere sapiente praesentium voluptas et omnis fuga accusamus voluptatem, aspernatur sunt cupiditate.
            Sint sunt hic accusantium magnam consectetur praesentium, repellendus iste repudiandae consequuntur! Ullam molestias dignissimos repellendus non voluptatibus inventore nemo, quidem itaque sequi ab explicabo reprehenderit doloremque, consectetur quae officia sunt!
            Laboriosam quo non officiis natus deserunt modi! Sint quidem illo nulla quam rerum modi animi unde. Repellendus vel debitis nobis, distinctio cum magni inventore esse sed totam, dolorem, fugiat illum!
            Alias quibusdam earum asperiores dicta repellat delectus! Animi, obcaecati quis. Assumenda excepturi consectetur ratione est impedit veniam consequuntur sint cumque voluptatem, facere delectus, iste commodi incidunt, aliquid libero. Veritatis, expedita?
            Rem, facilis voluptates asperiores autem quia quaerat impedit illo iste nesciunt iusto explicabo adipisci aspernatur non nisi, quibusdam magni molestiae dolores! Provident voluptas distinctio unde optio sint, obcaecati ipsam consequatur?
            Aspernatur nam consequuntur veniam deleniti mollitia neque ullam similique cumque eaque nobis, quas odio minus ab iure iste obcaecati! Aspernatur excepturi sunt consequuntur dignissimos sed cum facere delectus voluptatibus nesciunt!
            Commodi vitae consequuntur quo a quia vel quae dicta tempore ullam soluta. Sequi tempore sed perspiciatis ipsa! Sequi expedita rem totam! Nobis quam, nisi officia et commodi recusandae temporibus rerum?
            Modi repudiandae officiis veritatis est at sint velit ex quod? Laboriosam nostrum natus, aperiam accusamus placeat, ad et neque vel veritatis minus enim quidem eaque ipsam, eos ullam repellendus molestiae.
            Maxime cum temporibus asperiores assumenda quam dolore rerum. Dolores quia modi nostrum tempora, natus magnam perferendis neque ullam animi architecto vero aut, molestiae accusantium eum debitis repellat, optio ipsum minima?
            Veniam placeat aperiam quidem quia soluta. Impedit dolore, dolores nam unde officia pariatur, ducimus iste est vitae vero enim fugit perferendis tenetur, ipsa maiores? Deleniti pariatur perferendis aut necessitatibus excepturi.
            Amet hic repudiandae, fugiat, consequuntur corporis fugit sed praesentium atque iusto assumenda blanditiis numquam cumque dolorum minus sint dolore autem ipsam tempora eveniet iure. Voluptates repellendus ipsa reprehenderit cumque aut?
            Eius sit animi sed quasi eveniet praesentium sunt officiis harum impedit, maxime, nihil unde exercitationem amet. Eligendi dolor deserunt non soluta dicta, quia consectetur numquam optio expedita, molestias facere minus.
            Iusto earum vitae soluta consectetur amet recusandae repudiandae sapiente, hic, laboriosam modi, assumenda at. Dolorum enim modi nam culpa consequuntur dolor sapiente atque amet, commodi eveniet error magni accusamus sequi?
            Quisquam sit sint esse dolore, architecto neque dolorem necessitatibus asperiores minus ab aperiam facere quam in ipsa ea magni qui. Eius facilis eaque magnam ad mollitia voluptate, ducimus similique earum?
            Quaerat autem itaque magnam sapiente voluptas molestiae cumque ratione vel quidem deleniti iste, excepturi, voluptatibus adipisci veritatis quos repellat consequuntur blanditiis rem nemo cum nulla molestias! Mollitia porro nihil possimus?
            Tempore expedita vitae est itaque distinctio ad id fuga eaque facilis illo, incidunt cumque quae. Voluptatum ullam eligendi, in consectetur officiis nisi perferendis eaque. Eveniet, voluptas. Reprehenderit corporis accusantium rerum.
            Minima, consequatur reiciendis! Omnis maxime rem iusto, quibusdam exercitationem ut corrupti, ex voluptatum similique a libero assumenda modi. Asperiores nisi sequi assumenda alias numquam ex sit aperiam soluta culpa tempore.
            Mollitia, fugit eius quis laudantium a repudiandae nihil voluptas numquam delectus nam, temporibus esse dolores totam sunt dicta aperiam voluptatum nulla expedita incidunt ut eligendi facilis enim alias. Voluptatibus, vitae?
            Qui minima, doloremque rerum sit hic nesciunt fuga obcaecati modi totam, velit voluptatem nam eveniet aspernatur cupiditate commodi illo in ipsum quaerat ratione! Delectus aliquam perferendis nemo ullam natus! Aspernatur?
            Facere fugiat, ea aut, hic distinctio est pariatur dolore harum corporis nisi voluptas sit placeat! Earum iure in deserunt aliquam molestias, dolorum voluptate labore soluta nobis possimus ab delectus sunt.
            Aut in laborum itaque ullam tempora odit aliquid! Est quos fuga in omnis, accusantium non deserunt vero aliquid aut perspiciatis voluptas, accusamus quasi veniam perferendis mollitia enim, rerum illo animi!
            Inventore nostrum suscipit, autem quae fugiat dolorum reprehenderit exercitationem dolorem facilis aliquid modi quam vitae cum, incidunt aperiam expedita id? Culpa corporis minus beatae quisquam quos magni dolorem vel obcaecati?
            Assumenda, soluta eligendi? Nulla incidunt itaque corporis esse maxime culpa consectetur repellendus eveniet vel. A libero, corrupti tempora dicta veniam dignissimos aliquid beatae, quo debitis quis labore facere dolorum accusamus.
            Veritatis eligendi quisquam dignissimos deleniti officiis itaque necessitatibus voluptate aperiam adipisci ad, provident dolore culpa corrupti fugit? Dolor suscipit quibusdam voluptate, id, nihil deleniti sunt dolore exercitationem ad qui nostrum.
            Nam eaque harum voluptas molestias. Officiis pariatur in praesentium, ullam fuga quisquam fugit, rem vitae aspernatur, incidunt excepturi harum. Suscipit quidem dolores ab provident repellendus rerum perferendis, pariatur error adipisci.
            Culpa assumenda soluta voluptas illum similique. Quasi illo nulla corrupti perferendis culpa in impedit harum, voluptatem, quas labore minus ipsa unde quo asperiores voluptatum magni autem possimus dolor explicabo ducimus.
            Voluptatem soluta ad similique quod nemo facilis temporibus iure consequatur pariatur recusandae veniam mollitia voluptates, officiis ipsa sed? Alias possimus sit iusto repellat quia, fugiat magnam sunt laborum maiores nesciunt?
            Consequatur maxime eos dolores iusto corporis architecto deserunt laboriosam, illo cumque quis expedita a. Ipsam nulla odio labore incidunt hic commodi aut culpa est sapiente sunt, omnis libero! Expedita, et?
            Laudantium officiis veritatis corrupti doloribus odio sed quo ducimus assumenda laboriosam labore eum mollitia cumque reiciendis perspiciatis repudiandae excepturi, facilis quis nulla maiores aliquid dicta esse qui. Perferendis, ullam iure?
            Perferendis necessitatibus totam dolor? Velit numquam omnis harum qui dolore facere! Vitae quos est maxime officiis eos repudiandae eligendi suscipit, saepe dignissimos voluptatibus laudantium sed perspiciatis inventore voluptas distinctio natus?
            Cum explicabo illum, omnis autem saepe accusamus necessitatibus eaque culpa distinctio mollitia corrupti fugiat officia laudantium. Ducimus iure architecto ut cum deleniti, consequatur aliquid nesciunt beatae. Odit aperiam officiis doloribus!
            Ea vel cupiditate aliquam numquam ut temporibus praesentium dolore, deleniti minus fuga quo eius, suscipit dolores ad. Aliquam iste iusto reprehenderit. Sed recusandae odio eaque vero voluptates eos ad corporis.
            Ad, quos. Iste at voluptatibus mollitia labore, error, quasi ab voluptates dolore sapiente ipsum nemo quaerat id voluptatem non eum suscipit provident. Fuga omnis earum exercitationem corporis vero eos illo?
            Modi ratione natus ullam iusto tenetur sit nemo molestias non voluptas officia minus pariatur quisquam a illum similique illo recusandae veniam omnis, saepe aliquam. Cupiditate nobis necessitatibus dignissimos libero sunt.
            Dolores natus, temporibus sint sequi cumque dolore animi laborum itaque omnis doloribus quod aperiam, cupiditate repellat ab expedita. Ipsam quisquam minima necessitatibus, voluptates iste repellat ex delectus obcaecati cumque consequuntur.
            Fugiat ad necessitatibus, tenetur, nam excepturi odio repudiandae magnam molestias atque accusantium blanditiis odit repellendus. Sed perspiciatis voluptatibus vitae, unde obcaecati sint minus illum deserunt a ea? Accusamus, autem eum.
            Possimus libero, dolor neque earum, nulla repudiandae iusto est iure saepe reprehenderit distinctio et tempora ut. Commodi pariatur iure aspernatur, quas numquam est, adipisci incidunt aut atque facilis perspiciatis doloribus?
            Distinctio necessitatibus cupiditate voluptatem quo quos nisi recusandae nobis assumenda cum, non nihil aliquid quae. Nemo cum suscipit, eaque tenetur quos aliquid nesciunt provident consequuntur dignissimos ad, architecto commodi deserunt.
            Itaque vero sit, magnam ipsa repudiandae quod alias reiciendis iure optio? Aliquid eaque reprehenderit distinctio iusto labore a fuga tempora adipisci repellendus earum voluptates est suscipit natus, hic itaque eum!
            Officiis voluptatem enim qui ipsum illo quis velit? Atque maiores possimus vel soluta ex! Repellendus provident blanditiis totam quos architecto, accusantium natus nam, perferendis similique atque excepturi dicta cum ea.
            Animi minima eos a quos vitae nesciunt amet deserunt velit quaerat officiis provident totam sit mollitia ea numquam delectus, cum unde nam, nostrum eveniet possimus. Veniam sapiente nihil earum architecto.
            Cum sequi est quod quae aut ipsa facere exercitationem, molestiae minus, voluptas dolores sint maxime? Saepe expedita inventore vero aperiam, iure assumenda reprehenderit culpa asperiores sed? Libero tempora temporibus ratione.
            Tempora blanditiis molestias veritatis esse exercitationem soluta, odit porro? Quo ipsam maiores, voluptatum ipsum suscipit odit est commodi, adipisci magnam doloribus nobis neque quam, veniam dolore saepe perferendis architecto harum?
            Quod eius porro qui perspiciatis enim iusto accusantium culpa deserunt illum dolores ipsa deleniti quam temporibus minus voluptatem corrupti odit architecto adipisci sit dolor, blanditiis provident aut corporis. Provident, laborum.
            Distinctio quibusdam earum praesentium iure eveniet, vel voluptatum temporibus ducimus. Dolorem ullam quasi odio et dolore, maxime repudiandae laudantium fugit, earum non facilis accusamus animi, molestias aliquid repellat sit. Dolorum?
            Libero consequatur consequuntur laborum nihil nisi temporibus iste, aut ratione asperiores unde quod et totam dolorum eos nulla enim quae aliquam ducimus laudantium. Eius perspiciatis animi quis repellat exercitationem molestias?
            Ab nihil tempore earum maiores sapiente exercitationem reiciendis cumque sunt vero quasi saepe incidunt rerum eos doloribus id fuga dolorem, assumenda minima nisi quae accusamus. Esse dolorum inventore explicabo cumque.
            Labore deleniti laudantium aut adipisci corporis architecto vero voluptates, nihil atque sed molestias alias fuga non eos unde neque velit odit mollitia aliquam pariatur. Quo blanditiis culpa eius dolore possimus!
            Reiciendis itaque dolore enim vel earum aut cum dolorem saepe maxime veniam libero suscipit officiis illum voluptatum repellendus, quo sunt iure labore ab temporibus? Distinctio magni placeat nihil cupiditate dolorum!
            Distinctio, recusandae odit ad sequi quo facilis labore molestiae nihil ipsam ut et dolores in. Neque amet, modi animi nisi magnam nesciunt eveniet, dolorum doloremque iure nostrum dicta temporibus ad.
            Nulla, atque provident? At minima vitae nesciunt, error vero velit, blanditiis nemo eum, accusantium facere provident veritatis? Culpa, enim architecto libero sunt quia sint nesciunt nemo neque dignissimos sapiente possimus.
            Sed laboriosam sequi repellendus quidem reprehenderit quo sint asperiores praesentium ipsa sapiente alias ut accusamus quis voluptate eveniet, aliquam enim consequatur adipisci tempora dignissimos vel? Nisi quidem mollitia molestias. Repellendus.
            Doloribus eius cum tempore molestias et at veniam error labore porro ipsa! Enim, possimus error. Laudantium eligendi quisquam unde quam recusandae expedita voluptates deleniti tempora, architecto magni. Neque, a iste?
            Exercitationem omnis debitis culpa nesciunt vero rerum voluptate maxime repellat aliquam. Ex eaque nisi repellendus architecto ducimus maxime, consectetur minus voluptatum sed cumque dicta ea pariatur saepe, voluptate blanditiis sunt.
            Dolores ad doloremque quam sapiente illo, fugiat laudantium sint eius quas. Veniam vitae doloribus ad blanditiis quae cumque. Beatae accusamus sapiente perferendis, earum expedita dolor maiores labore esse eveniet! Velit.
            At quas eos quia mollitia. Sunt vitae id voluptatem tenetur fuga nihil praesentium enim quisquam nostrum numquam sequi eius veniam, nam excepturi quod delectus voluptatibus animi reprehenderit rerum! Dignissimos, consequatur.
            Non, animi suscipit? Cupiditate illo laborum aliquid ipsum, similique error fugit, quis, quisquam quidem nam autem eum assumenda iure consequatur nostrum reprehenderit necessitatibus aspernatur? Laborum animi aut architecto sapiente sed!
            Nulla, magni. Autem a distinctio, numquam aut, illum necessitatibus tempore modi repellendus recusandae, amet voluptatum. Architecto alias aperiam velit tempora esse. Molestiae nostrum, cupiditate recusandae culpa totam eaque nemo maiores?
            Temporibus ullam maxime delectus itaque mollitia, repellat alias vero accusamus doloribus, et facere impedit ipsam repellendus consequuntur totam? Unde, soluta velit sed ipsam nulla repellendus placeat provident repellat odio a.
            Fuga error placeat laboriosam omnis soluta doloribus molestias pariatur eaque id vitae quasi et voluptate, accusantium delectus dignissimos expedita adipisci tempora itaque. Eveniet nam rerum sed libero adipisci quos soluta!
            Consequuntur exercitationem nostrum cum, nisi repellat sed obcaecati tempora aut qui ducimus. Iste, quam recusandae optio ratione similique possimus accusamus perspiciatis velit quibusdam nostrum. Voluptas, neque maiores! Nemo, earum rem?
            Ut pariatur modi sapiente delectus corporis fuga nihil molestias, accusamus omnis itaque harum vitae iure assumenda reiciendis quos quod aliquam esse quisquam corrupti sint odit tempore laborum accusantium facilis? Doloremque.
            Numquam maiores ab tenetur? Consequuntur eveniet unde eum quas facilis quidem modi corrupti hic voluptatum laborum necessitatibus mollitia provident doloribus molestiae sapiente, ad voluptate totam ab. Eius possimus quia quaerat!
            Facere vitae distinctio illum neque rem dolorem adipisci quas, praesentium, aliquam saepe non aut omnis commodi? Sequi, atque consectetur cupiditate cum eos provident ipsam, excepturi nobis incidunt ea quod quae!
            Temporibus, iure magnam amet quas placeat enim accusamus praesentium ea minus culpa, blanditiis a odit perferendis. Cupiditate ullam a placeat aspernatur totam blanditiis tenetur sapiente, ad perferendis vero explicabo ex!
            Fugit perferendis error, dolor consequatur alias quo? Tempora, laborum, exercitationem minima placeat numquam eaque vel, vero ratione quibusdam repudiandae voluptas! Mollitia soluta rerum cum repellat? Ut error veritatis iusto sequi?
            Corporis nulla a repellendus perferendis saepe nemo quos temporibus laudantium. Consectetur, ex in! Ex, consectetur veniam rerum eveniet iusto modi ullam illum voluptatibus asperiores quae dicta sit earum esse necessitatibus?
            Rem reprehenderit vel voluptate ea, architecto hic vitae voluptatem nulla, libero voluptas eaque nemo id nam facilis et repudiandae fugiat aspernatur. Eligendi facilis ipsum in doloribus quisquam cum possimus voluptates!
            Possimus, ea error est, natus eveniet neque magni illum enim hic at suscipit, blanditiis ipsam. Totam tempora ea sit quia, quasi, asperiores minima perferendis deleniti praesentium necessitatibus impedit nobis quam.
            Aspernatur eos sunt perferendis cum sequi commodi enim laboriosam culpa ipsum inventore! Non aperiam inventore laborum eos voluptatem fuga, unde soluta. Eligendi consequatur officiis eaque quasi quae, eos ut numquam!
            Corrupti suscipit dolor fugiat neque cum error eveniet qui quia corporis quis aliquid saepe consectetur aspernatur, cupiditate expedita ad placeat et? Earum optio eos ratione quas accusantium ullam id. Dolor.
            Nesciunt qui sequi neque! Tempora, expedita modi hic quam provident nostrum libero similique ipsum perspiciatis eum! Accusantium commodi, tempore consequuntur sint rem velit maxime, possimus enim qui eligendi non incidunt!
            Qui, incidunt inventore quos officia perferendis reiciendis atque quo. Quisquam ipsum reprehenderit perferendis ut vitae labore debitis perspiciatis non architecto mollitia aperiam asperiores nihil, excepturi repellendus quaerat repellat cum expedita.
            Accusantium quo obcaecati odit consectetur architecto quasi ipsum perspiciatis cumque blanditiis facere sit suscipit, laudantium assumenda beatae perferendis sint explicabo facilis provident deleniti officia autem nihil, harum amet! Libero, vel.
            Recusandae molestias sit perferendis voluptatibus explicabo nulla, maxime fugit saepe quo tenetur ratione asperiores fuga soluta nobis est deleniti illo! Consequatur dolore aperiam necessitatibus, ut molestiae quisquam eveniet aspernatur! Atque.
            Eius eum non voluptatem nobis! Eveniet, iste doloribus ea quasi accusamus recusandae quaerat sequi in ab corrupti eum beatae magni laboriosam dignissimos fugiat nobis, unde expedita consectetur! Velit, aut vero.
            Doloribus, quisquam voluptate? Rerum culpa esse fuga dolor nisi repellendus aliquam vel nostrum minima cumque aut tenetur porro, quidem exercitationem pariatur distinctio magnam accusantium iure ratione. Deserunt magni esse delectus!
            Minima, quisquam accusamus! Iure delectus sint tempore recusandae ratione quo aliquid iste ut sequi facilis. Magnam assumenda quam quia similique repellat numquam ullam nisi amet sint excepturi? Facilis, rem dolor.
            Earum, quam voluptatibus, ex ratione velit repellat rem consequuntur obcaecati officia nostrum aut voluptate. Ratione, dolore distinctio rem ullam, aperiam vero deserunt sunt at accusamus quis repudiandae voluptas cumque fugiat.
            Consequatur perspiciatis quibusdam saepe sapiente ex. Odit, incidunt! Adipisci maiores sequi totam ipsum nesciunt velit ratione autem modi ipsa, sed accusamus, iusto hic eum. Voluptatem atque dolore necessitatibus magni nulla!
            Sint, minima. Quasi voluptate reprehenderit culpa delectus. Inventore veritatis saepe deleniti eius ex nam cumque ratione laboriosam molestias, dolores alias voluptates nihil quisquam molestiae perferendis ipsa cum id vel minus!
            Cupiditate, quo? Odio commodi, quae, omnis laborum debitis repellendus voluptatum provident amet iure natus repellat suscipit inventore fugit ducimus! Quasi assumenda ut, odit facilis molestiae praesentium dolorum nulla cumque et.
            Molestiae eveniet illo, quia quasi laborum earum quas placeat harum dolor sed alias dignissimos voluptatem quis quod unde optio voluptate veritatis similique ullam itaque architecto possimus? Architecto et repellat beatae.
            Deserunt, nobis provident. Suscipit maiores dicta, tempore aut dolorum voluptate illum minus voluptas doloremque facere eveniet vel aspernatur quaerat optio fuga sunt ratione quas blanditiis ea possimus exercitationem eius. Quia?
            Omnis exercitationem tenetur fugit blanditiis repudiandae unde expedita possimus sequi perferendis alias, necessitatibus aperiam, temporibus ab neque excepturi aut sit, debitis pariatur aliquid deleniti illum cupiditate praesentium accusantium! Quos, qui?</div>
          </div>
          </div>
        </>
      )}
    </>
  )
}

export default Home 