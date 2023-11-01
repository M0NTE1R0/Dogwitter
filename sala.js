// ADICIONE SUS LINKS FIREBASE AQUI
const firebaseConfig = {
  apiKey: "AIzaSyB3VQegzVqhleGtxBaRwJ0xR_JTuyYe1sI",
  authDomain: "dogwitter-2156b.firebaseapp.com",
  databaseURL:"https://dogwitter-2156b-default-rtdb.firebaseio.com/",
  projectId: "dogwitter-2156b",
  storageBucket: "dogwitter-2156b.appspot.com",
  messagingSenderId: "1080681192733",
  appId: "1:1080681192733:web:a2401e519241922d0115f4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const nomeUsuario = localStorage.getItem('nomeUsuario')

document.getElementById('nomeUsuario').innerHTML = 'Olá, ' + nomeUsuario + '!'

getData()

function addSala() {
  const sala = document.getElementById('nomeSala').value

  firebase.database().ref('/').child(sala).set({
    purpose: 'sala criada',
  })

  loadRoom(sala)
}

function getData() {
  firebase
    .database()
    .ref('/')
    .on('value', snapshot => {
      let salas = []
      console.log('Keys Changed')
      snapshot.forEach(function (childSnapshot) {
        const childKey = childSnapshot.key
        const row =
          "<div class='nomeSala' id='" +
          childKey +
          "' onclick='loadRoom(this.id)'> #" +
          childKey +
          '</div>'
        salas.push(row)
      })
      console.log(salas)
      const output = salas.join('')
      document.getElementById('output').innerHTML = output
    })
}

function loadRoom(room) {
  localStorage.setItem('nomeSala', room)
  location = 'chat.html'
}
