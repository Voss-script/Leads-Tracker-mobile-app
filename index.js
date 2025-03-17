import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js"
import { getDatabase,
         ref,
         push,
         onValue,
         remove } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js"


const firebaseConfig = {
  databaseURL: "https://leads-tracker-app-2b706-default-rtdb.europe-west1.firebasedatabase.app/"
  
  }

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const refernceInDB = ref(database, "leads")


console.log(database)
    
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")


function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

onValue(refernceInDB, function(snapshot){
    const snapshotDoesExist = snapshot.exists()
    if(snapshotDoesExist){
         const snapshotValues = snapshot.val()
         const leads = Object.values(snapshotValues)
         render(leads)  
    }
    
})

deleteBtn.addEventListener("dblclick", function() {
    remove(refernceInDB)
    ulEl.innerHTML = ""
})

inputBtn.addEventListener("click", function() {
    push(refernceInDB, inputEl.value)
    inputEl.value = ""
})