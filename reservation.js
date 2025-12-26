
    const scriptURL =  "https://script.google.com/macros/s/AKfycbxyk54UTxMehWUltlxDQv7L5dL4MavAygoH5bttxSZd3BQ_q4JmCONTUToyhcAoyfzDmA/exec"

    let originalText = ""

    function showToast(message) {
      const toast = document.getElementById('toast');
      toast.textContent = message;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 4000);
    }


/** Call to action **/
const sheet = document.getElementById("actionSheet");
const backdrop = document.getElementById("actionSheetBackdrop");

const openButton = document.getElementById("openSheet");
const cancelBtn = document.getElementById("cancelSheet");

    function openSheet() {
  backdrop.classList.remove("hidden");
  sheet.classList.remove("hidden");

  setTimeout(() => {
    backdrop.classList.add("show-backdrop");
    sheet.classList.add("show-sheet");
  }, 10);
}

function closeSheet() {
  backdrop.classList.remove("show-backdrop");
  sheet.classList.remove("show-sheet");

  submitBtn.disabled = false;
  submitBtn.innerHTML = originalText;


  setTimeout(() => {
    backdrop.classList.add("hidden");
    sheet.classList.add("hidden");
  }, 300);
}
/*** FIN ***/




addEventListener("submit", (event) => {

     event.preventDefault();
     submitBtn.disabled = true;
     originalText = submitBtn.textContent;
     submitBtn.innerHTML = 'Envoi en cours <span class="spinner"></span>';

     openSheet()


   name = document.querySelector('#get_name').value
   email = document.querySelector('#get_email').value
   phone = document.querySelector('#get_phone').value

   pickup = document.querySelector('#get_pickup').value
   dropoff = document.querySelector('#get_dropoff').value
   date = document.querySelector('#get_date').value
   time = document.querySelector('#get_time').value
   vehicle = document.querySelector('#get_vehicle').value || "Standard"
   message = document.querySelector('#get_message').value || ""

   autres_info = JSON.stringify({
     passengers : document.querySelector('#passengers').value || 0,
     bagages : document.querySelector('#bagages').value || 0,
     rehausseurs : document.querySelector('#rehausseurs').value || 0,
     eau : document.querySelector('#eau').value || 0,
   })


      get_distance = "10"
      get_duration = "5"
      get_price = "30,00"



 })



function stripePay(moyen){
   console.log(moyen);

   document.getElementById('wait-screen').style.display = 'flex';

   if(moyen == "espèce"){
     storeData(moyen, 'newOrder')
   } else {
     storeData(moyen, 'newOrder_byStripe')
   }



 }




function storeData(moyen, order_type) {

    const get_new_date = Date.now()
      const data = new URLSearchParams();
            data.append('id', get_new_date);
            data.append('name', name);
            data.append('email', email);
            data.append('phone', phone);
            data.append('pickup', pickup);
            data.append('dropoff', dropoff);
            data.append('date', date);
            data.append('time', time);
            data.append('vehicle', vehicle);
            data.append('message', message);
            data.append('distance', get_distance);
            data.append('duration', get_duration);
            data.append('price', get_price);
            data.append('moyen', moyen);
            data.append('originURL', window.location.origin);
            data.append('autres_info', autres_info);
            data.append('action', order_type);


            let data_String = data.toString()

            const raw = "";

            const requestOptions = {
              method: "POST",
              body: raw,
              redirect: "follow"
            };


                   fetch(`${scriptURL}?${data_String}`, requestOptions )
                   .then((response) => response.json())
                .then((result) => {
                     //showToast("✅ Votre réservation a été enregistrée !");

                     console.log(result)
                     console.log(result.url)

                     if (order_type == "newOrder") {
                       window.location.href = `/success.html?id=${get_new_date}&name=${name}&amount=${get_price}`
                     } else if (order_type == "newOrder_byStripe") {
                        window.location.href = result.pay.url
                      }

                })
                .catch(err => console.error('Erreur lors de l’envoi vers Google Sheet :', err));


}















