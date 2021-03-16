const scriptName = "DB test";

/*------------------------------DataBase 세팅------------------------------*/



const SQLiteDatabase = android.database.sqlite.SQLiteDatabase;

let db = null;
let db2 = null;

function updateDB() {
    db = SQLiteDatabase.openDatabase("/data/data/com.kakao.sans/databases/KakaoTalk.db", null, SQLiteDatabase.CREATE_IF_NECESSARY);
    db2 = SQLiteDatabase.openDatabase("/data/data/com.kakao.sans/databases/KakaoTalk2.db", null, SQLiteDatabase.CREATE_IF_NECESSARY);
}
updateDB();
function decrypt(userId, enc, text) {
    try {
        let iv = toByteArray([15, 8, 1, 0, 25, 71, 37, -36, 21, -11, 23, -32, -31, 21, 12, 53]);
        let password = toCharArray([22, 8, 9, 111, 2, 23, 43, 8, 33, 33, 10, 16, 3, 3, 7, 6]);
        let prefixes = ["", "", "12", "24", "18", "30", "36", "12", "48", "7", "35", "40", "17", "23", "29", "isabel", "kale", "sulli", "van", "merry", "kyle", "james", "maddux", "tony", "hayden", "paul", "elijah", "dorothy", "sally", "bran"];
        let salt = new _String((prefixes[enc] + userId).slice(0, 16).padEnd(16, "\x00")).getBytes("UTF-8");
        let secretKeySpec = new SecretKeySpec(SecretKeyFactory.getInstance("PBEWITHSHAAND256BITAES-CBC-BC").generateSecret(new PBEKeySpec(password, salt, 2, 256)).getEncoded(), "AES");
        let ivParameterSpec = new IvParameterSpec(iv);
        let cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(2, secretKeySpec, ivParameterSpec);
        return String(new _String(cipher.doFinal(Base64.decode(text, 0)), "UTF-8"));
    } catch (e) {
        return ("");
    }
}

function toByteArray(bytes) {
    let res = _Array.newInstance(_Byte.TYPE, bytes.length);
    for (var i = 0; i < bytes.length; i++) {
        res[i] = new _Integer(bytes[i]).byteValue();
    }
    return res;
}

function toCharArray(chars) {
    return new _String(chars.map((e) => String.fromCharCode(e)).join("")).toCharArray();
}

const Context = android.content.Context;
const DatabaseUtils = android.database.DatabaseUtils;
const PowerManager = android.os.PowerManager;
const Base64 = android.util.Base64;
const _Array = java.lang.reflect.Array;
const _Byte = java.lang.Byte;
const _Integer = java.lang.Integer;
const Runtime = java.lang.Runtime;
const _String = java.lang.String;
const Timer = java.util.Timer;
const TimerTask = java.util.TimerTask;
const Cipher = javax.crypto.Cipher;
const IvParameterSpec = javax.crypto.spec.IvParameterSpec;
const PBEKeySpec = javax.crypto.spec.PBEKeySpec;
const SecretKeyFactory = javax.crypto.SecretKeyFactory;
const SecretKeySpec = javax.crypto.spec.SecretKeySpec;
const JSONObject = org.json.JSONObject;/*


/*------------------------------코트 시작------------------------------*/
const allsee = "\u200d".repeat (500);
const n = "\n";
const nn = "\n".repeat(2);


const getChatLink = (str) => {
    var d = db2.rawQuery("SELECT url FROM open_link WHERE name=?", [str]);
    d.moveToFirst();
    return d.getString(0);
};


function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  
  try {
    if (msg.startsWith(".방정보 ")) {
      var Room = msg.substr(5);
      if (Room == "여기") Room = getChatLink(room);
      
      let I = JSON.parse(org.jsoup.Jsoup.connect(
      "https://api.develope.kr/search/room?room=" + Room)
     .ignoreContentType(true).get().text()).result;
     
     replier.reply (
     "이름: " + I.name
     + "\n인원수: " + I.headcount
     + "\n방장: " + I.master
     + "\n좋아요: " + I.like + "개"
     + "\n링크: " + Room);
   }
   
  } catch (e) {
    replier.reply (e);
  }
   


}
