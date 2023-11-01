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
const nomeSala = localStorage.getItem('nomeSala')
var chatTags = []
const output = document.getElementById('output')

getData()
function getData() {
  firebase
    .database()
    .ref('/' + nomeSala)
    .on('value', snapshot => {
      chatTags = []
      console.log('Keys Changed')
      snapshot.forEach(function (childSnapshot) {
        const childKey = childSnapshot.key
        const childData = childSnapshot.val()
        if (childKey != 'purpose') {
          const firebaseMsgId = childKey
          const msgData = childData
          // Inicio do código
          // console.log(msgData);
          const nome = msgData['name']
          const msg = msgData['message']
          const likes = msgData['like']
          console.log(nome + ': ' + msg + ' (' + likes + ' likes)')

          const nomeTag =
            "<div class='chatCard'><h4 class='chatNome'>" + nome + ':</h4>'
          const msgTag =
            "<div class='row'>" +
            "<div class='col'>" +
            "<h5 class='chatMsg'>" +
            msg +
            '</h5>' +
            '</div>' +
            "<div class='col-auto'>" +
            "<button class='btn btn-info' id='" +
            firebaseMsgId +
            "' value='" +
            likes +
            "' onclick='likeMsg(this.id)' >" +
            "<i class='fa-regular fa-thumbs-up'></i>" +
            ' ' +
            likes +
            '</button>' +
            '</div>' +
            '</div></div>'

          const row = nomeTag + msgTag
          chatTags.push(row)
          output.innerHTML = chatTags.join('')
          // Fim do código
        }
      })
    })
}

function likeMsg(btnId) {
  let likes = Number(document.getElementById(btnId).value)
  likes++
  console.log('Botão: ' + btnId + ' | Likes: ' + likes)
  firebase
    .database()
    .ref('/' + nomeSala)
    .child(btnId)
    .update({
      like: likes,
    })
}

function send() {
  const msg = document.getElementById('msg').value
  firebase.database().ref(nomeSala).push({
    name: nomeUsuario,
    message: msg,
    like: 0,
  })
  console.log('Mensagem enviada: ' + msg)

  document.getElementById('msg').value = ''
}
