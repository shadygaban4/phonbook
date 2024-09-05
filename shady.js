
const contactList = document.getElementById('contact-list'); 
//const add_button = document.getElementById('add_button'); 
const edit_h = document.getElementById('edit_div'); 

const title_h = document.getElementById('titel_edit');
const name_h = document.getElementById('name');
const email_h = document.getElementById('email');
const location_h = document.getElementById('location'); 
const phone_h = document.getElementById('phone'); 

const num_error = document.getElementById('num_error'); 
const name_error = document.getElementById('name_error'); 
// const titel_edit_h = document.getElementById('titel_edit');
const search_h = document.getElementById('search');


let contacts = [
    { name: 'shady', email: 'shadygadban4@gmail.com', location: 'New York', phone: '1234567890', img: 'images/star1.jpeg' },
    { name: 'belal', email: 'blahbl360@gmail.com', location: 'Los Angeles', phone: '0506547638', img: 'images/star2.jpeg' },
    { name: 'ayman', email: 'blal@gmail.com', location: 'Chicago', phone: '0509972306', img: 'images/star3.avif' }
];
let currentEditIndex = null;

renderContacts();

let add_edit_flag='';//פלאג שמשתמש במסך בזמן ADD  או EDIT
   function add() 
   {
    
    add_edit_flag='add';//פלאג שמשתמש במסך בזמן ADD  או EDIT
    
  name_h.value='';
   email_h.value='';
   location_h.value='';
   phone_h.value='';
   
    edit_h.style.display = "block";// 
    title_h.innerHTML = 'Add Contact';
   }


function compare(a, b)
{
    return a.name.localeCompare(b.name);
    
}


   function renderContacts() {
    contactList.innerHTML = ''; // נקה את רשימת אנשי הקשר מה html
   contacts.sort(compare);//!
    for(let i=0;i<contacts.length;i++) 
        {
        const contactDiv = document.createElement('div');//לקול אביקת הוא עוסה div//contactDiv
        contactDiv.innerHTML = `
            <img src="${contacts[i].img}" alt="${contacts[i].name}" style="width: 40px; height: 40px;">

            <div>
                <h2>${contacts[i].name}</h2>
                <p>Phone: ${contacts[i].phone}</p>
            </div>
            
            <div>

                <button onclick="contact_info( ${i})" class="info" ">i</button>
                
                <button onclick="edit_contact( ${i})">✎</button>

                <button onclick="dlete_contact( ${i})">🗑</button>
            </div>
        `;
        contactList.appendChild(contactDiv); // הוסף את האלמנט החדש לרשימת אנשי הקשר
    };
    edit_h.style.display = "none";//להסתיר חלון עריכה
            }

function contact_info(a)
{
    let st="";
    st=contacts[a].name +"     "+ contacts[a].phone +"     "+ contacts[a].email +"     "+ contacts[a].location ;
    alert(st);
   
}



let curr ;// index כדי לשמור את
function edit_contact(index)
{
    add_edit_flag='edit';//פלאג שמשתמש במסך בזמן ADD  או EDIT
   
    name_h.value=contacts[index].name;//בשביל לראות את הנתונים על המסאך
   email_h.value=contacts[index].email;
   location_h.value=contacts[index].location;
   phone_h.value=contacts[index].phone;

   edit_h.style.display = "block";//להציג חלון עריכה

   curr = index;

}

function dlete_contact(index)
{
      contacts.splice(index, 1); // הסר את איש הקשר מהמערך
      renderContacts(); // עדכן את רשימת אנשי הקשר
 }   


 
 function seve_c()
 {
    if ( add_edit_flag == 'edit')//פלאג שמשתמש במסך בזמן ADD  או EDIT
     {
    document.getElementById('titel_edit').textContent = 'edit Contact';//משנה את ה כותירת
    

    if (!/^\d{7,10}$/.test(phone_h.value))//בודקת את המספר
        {
       num_error.textContent = 'Phone number must be 7 to 10 digits.';
       phone_h.style.color = 'red';
       return;
     } 

     if (  //בודקים אם השם קיים במערך האובייקטים
      contacts.some(
        contact =>  contact.name === name_h.value && contact !== contacts[curr],//בודיק אים יש שמ אתו שם וגם שהו לא עצמו
      )
      ) {
      name_error.textContent = 'Sorry, a contact with that name already exists.';
      name_h.style.color = 'red';
      return;
    } 
    else {
      name_error.textContent = '';//מסתיר את הההודעה של האירור 
    }

    contacts[curr].name=name_h.value;//שומיר
    contacts[curr].email=email_h.value;
    contacts[curr].location=location_h.value;
    contacts[curr].phone=phone_h.value;

    renderContacts();
     } //סופ שמירת העיתקון


     if ( add_edit_flag == 'add')//פלאג שמשתמש במסך בזמן ADD  או EDIT
     {    
     document.getElementById('titel_edit').textContent = 'Add Contact'; //משנה את ה כותירת

     if (!/^\d{7,10}$/.test(phone_h.value))//פלאג שמשתמש במסך בזמן ADD  או EDIT
     {
    num_error.textContent = 'Phone number must be 7 to 10 digits.';
    phone_h.style.color = 'red';
    return;
  } 

     if (  //בודקים אם השם קיים במערך האובייקטים
        contacts.some(
          contact =>  contact.name === name_h.value && contact !== contacts[curr],//בודיק אים יש שמ אתו שם וגם שהו לא עצמו
        )
        ) {
        name_error.textContent = 'Sorry, a contact with that name already exists.';
        name_h.style.color = 'red';
        return;
      } 
      else {
        name_error.textContent = '';//מסתיר את הההודעה של האירור 
      }

     contacts.push({ name: name_h.value, email:email_h, location: location_h.value, phone: phone_h.value, img: 'images/dawali.jpg' });
     
     renderContacts();
     }


      
 }

 function clearContacts() 
 {
    contacts = []; 
    renderContacts(); // עדכן את רשימת אנשי הקשר
  }


  // even  ventListener//מאזין
  search_h.addEventListener('input', event => {
    const searchTerm = event.target.value.toLowerCase(); //משנה לסמול
    const filteredContacts = contacts.filter(     //מחזיר מעראך
      contact =>
        contact.name.toLowerCase().includes(searchTerm) ||
        contact.email.toLowerCase().includes(searchTerm) ||
        contact.location.toLowerCase().includes(searchTerm) ||
        contact.phone.includes(searchTerm),
        //משנה ואז בודיק
    );
    contactList.innerHTML = ''; // נקה את רשימת אנשי הקשר
    filteredContacts.forEach((contact, index) => {//עובירת על מעראך
      
      const contactDiv = document.createElement('div');
      contactDiv.className = 'contact';
      contactDiv.innerHTML = `
                <img src="${contact.img}" alt="${contact.name}" style="width: 40px; height: 40px;">

                <div>
                    <h2>${contact.name}</h2>
                    <p>Phone: ${contact.phone}</p>
                </div>

                <div >
                    <button  data-index="${index}">i</button>
                    <button  data-index="${index}">✎</button>
                    <button  data-index="${index}">🗑</button>
                </div>
            `;
      contactList.appendChild(contactDiv); // הוסף את האלמנט החדש לרשימה
    });
  });


  function x()
  {
  edit_h.style.display = "none";//להסתיר חלון עריכה
  }