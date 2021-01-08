function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    try {
       
   if (msg.startsWith(".방정보 ")) {
     //replier.reply (msg.substr (5));
     let a = org.jsoup.Jsoup.connect (
     "https://api.develope.kr/search/room?room=" + msg.substr (5))
     .ignoreContentType(true).get ().text ();
     //a = JSON.stringify (a);{}
     a = JSON.parse (a);
     
     replier.reply (
     "이름: " + a["result"]["name"]
     + "\n인원수: " + a["result"]["headcount"]
     + "\n방장: " + a["result"]["master"]
     + "\n좋아요: " + a["result"]["like"] + "개");
   }
   
   
   } catch (e) {
     replier.reply (e);
   }
}
