const url = 'https://wt430li74i.execute-api.ap-northeast-1.amazonaws.com/kintonectrlAPI/kintonectrl'
const conf = {
  headers: {'Content-Type': 'application/json'}
}
const obj = {
    "LINE_ID_value": "hujikohujiko",
    "LINE_NAME_value": "tukituki",
    "obnizID_value": "12344567",
    "Start_value": "17:00",
    "End_value": "19:00"
 }

var g_res;
var g_error;

var app = new Vue({
  el: "#app",
  data() {
    return {
      form: {
        displayName: "",
        userId: "",
        statusMessage: "",
        pictureUrl: "",
        obnizId: "",
        startTime: "",
        endTime: "",
      },
    };
  },

  methods: {
    //プロフィール取得関数
    getProfile: async function () {
      const accessToken = liff.getAccessToken();
      const profile = await liff.getProfile();
      this.form.displayName = profile.displayName; //LINEの名前
      this.form.userId = profile.userId; //LINEのID
      this.form.pictureUrl = profile.pictureUrl; //LINEのアイコン画像
      this.form.statusMessage = profile.statusMessage; //LINEのステータスメッセージ
    },
    createUser: function() {
      const obj = {
          "LINE_ID_value": this.form.userId,
          "LINE_NAME_value": this.form.displayName,
          "obnizID_value": this.form.obnizId,
          "Start_value": this.form.startTime,
          "End_value": this.form.endTime
       }
      axios.post(url,obj)
      .then(function (response) {
        g_res = response;
        console.log(response);
      })
      .catch(function (error) {
        g_error = error;
        console.log(error);
      });
    }
  },

  //ページを開いた時に実行される
  mounted: async function () {
    await liff.init({
      liffId: "1655673745-xPEXoDJP", 
    });

    //LINE内のブラウザかどうか
    if (liff.isInClient()) {
      this.getProfile(); //LINE内で開いた場合は特にログイン処理なしで大丈夫
    } else {
      //外部ブラウザかどうか
      if (liff.isLoggedIn()) {
        this.getProfile();
      } else {
        liff.login();
      }
    }
  },

  computed: {
    validation() {
      const form = this.form;
      return {
        displayName: !!form.displayName,
        obnizId: !!form.obnizId,
      };
    },
    isValid() {
      var validation = this.validation;
      return Object.keys(validation).every(function (key) {
        return validation[key];
      });
    },
  },
});

