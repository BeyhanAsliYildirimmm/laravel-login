
var url = "http://egitim-api.sercanozen.com.tr";
var loginRoute = "/api/login";
var newTaskRoute = "/api/add-task";
var editTaskRoute = "/api/edit-task/";
var deleteTaskRoute = "/api/delete-task/";
var completedTaskRoute ="/api/completed-task";
var undoCompletedTaskRoute="/api/undo-completed-task";
var clearListRoute ="/api/clear-task-list";
var listRoute ="/api/list";
var warningObject = {
  icon: 'warning',
  title: 'Uyarı',
  text: 'Geçerli Bir E-mail Adresi Giriniz!',
  confirmButtonText: 'Tamam',
  confirmButtonColor: 'red'
};
//regex yazıyoruz
/* sembolle başlar ve biter.
 belittiğimiz parantezler içinde işlem yaparız.

*/
function emailControl(email) {

  /* bu regex ile e-mail için girilen değere koşul belirliyoruz @ işaret girilene kadar a-z,A-Z,0-9,.+- ifadeleri kullanıla bilir.
   
   \ ----- ters sılaş sembölü kaçma  işlemi sağalar
 
   regex ifasesinde geçen \. nokta ise .com , .tr gibi de bulana nokta sombölüdür
 
    2,4 --- nokta sembolünden sonra minimum 2 karakter ,maksimum 4 karakter olabilir o anlama geliyor.
 
  */

  var regex = /([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  //regexleri text ederiz bu genel bir kullanımdır

  return regex.test(email);
};

$(document).ready(function () {
  (function () {
    let token = localStorage.getItem("token");
    let lastLoginDate = JSON.parse(localStorage.getItem("lastLoginDate"));
    let now = new Date() //şuanki zaman
    let lastDate = new Date(lastLoginDate);
    let resultDate = now - lastDate;
    resultDate /= 1000; //mlsn 'den sn'e çevirdik.
    resultDate /= 60; //sn'den dk'a çevirdik.

    if (lastLoginDate == null) {
      resultDate = 121;
    }

    let patName = window.location.pathname;
    let isContains = patName.indexOf("login.html");
    if (isContains > -1) {
      //login.html içindeyiz
      if (token !== null && resultDate < 120) {

        window.location.href = "index.html";

      }
    }
    else {
      if (token === null) {
        //eğer token null ise lastLoginDate varsa siliyoruz
        localStorage.removeItem("lastLoginDate");
        warningObject.text = "Daha önce giriş yapılmamışsınız lütfen giriş yapınız!"
        Swal.fire(warningObject).then(function () {
          //Uyarı mesaj'ı verdikten sonra login sayfasına yönlendirsin
          window.location.href = "login.html";
        });
        //Uyarı mesaj'ı verdikten sonra login sayfasına yönlendirsin
        window.location.href = "login.html";

      }
      /*eğer benim token'ım var ise bu token'in geçerlilik süresi halen devam ediyor mu onu kontrol ediyoruz.
      */
      else {


        if (resultDate > 120) {
          localStorage.removeItem("lastLoginDate");
          localStorage.removeItem("token");
          window.location.href = "login.html";

        }
      }
    }
  })()

});    