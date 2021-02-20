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
      },
    };
  },
  
  methods: {
    createUser: function() {
      axios.post('https://wt430li74i.execute-api.ap-northeast-1.amazonaws.com/kintonectrlAPI/kintonectrl',
                 {"LINE_ID_value": "testIDjijiji",
                 "LINE_NAME_value": "Yano hiroki",
                 "obnizID_value": "2222222"
                 })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
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

