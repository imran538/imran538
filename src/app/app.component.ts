import { CrudService } from './services/crud.service';
import { Component, OnInit } from '@angular/core';
declare const JSBridge:any;
declare const window:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'Firestore CRUD Operations Students App';

  students: any='';
  studentName: string='';
  studentAge: number=0;
  studentAddress: string='';
  constructor(private crudService: CrudService) { }
  
  isPaytmmini(){
    const ua = window.navigator.userAgent;
    return/AppContainer/i.test(ua);
  }
  ngOnInit() {
	var _this = this;

  if(this.isPaytmmini()){
   alert(this.isPaytmmini());
      function ready(callback:any) {
        alert("callBack")
      // call if jsbridge is injected
          if (window.JSBridge) {
          callback && callback();
          } else {
          // listen to jsbridge ready event
          document.addEventListener('JSBridgeReady', callback, false);
          }
      }

      ready(function () {
        //alert("call")
        JSBridge.call('paytmFetchAuthCode',{
        clientId:"2b8ec1ece1a54345b8a27ffcfecd84d2"},
        function(result:any) {
       // alert(JSON.stringify(result))
              	var authId = result.data.authId;
              	var openId = result.data.openId;
                const url = "https://accounts.paytm.com/oauth2/v2/token"
				const data = {
					"grant_type": "authorization_code",
					"code": authId,
					"client_id": "2b8ec1ece1a54345b8a27ffcfecd84d2",
					"scope": "basic"
				};
              	let formBody = [];
				let entries = Object.entries(data);
				for(const [prop, val] of entries) {
				var encodedKey = encodeURIComponent(prop);
				var encodedValue = encodeURIComponent(val);
					console.log(prop, val);
					formBody.push(encodedKey + "=" + encodedValue);
				}
				const requestBody = formBody.join("&");
				var auth = window.btoa("2b8ec1ece1a54345b8a27ffcfecd84d2:T9JRxN8ckEluP11x0Jp5JVmuwiNDiJRn");
				const otherParams = {
					headers: {
						// "Content-Type": 'application/x-www-form-urlencoded',
						"Content-Type": 'x-www-form-urlencoded',
						"Authorization": 'Basic '+auth,
					},
					body: requestBody,
					method: "POST"
				};
				fetch(url, otherParams)
				.then((res) => {
					alert(JSON.stringify(res));
					res.json()
					})
				.then((res) => {
						alert(JSON.stringify(res));
						console.log(res)
					}
            	)
				.catch((err) => {
					console.log(err);
					alert(JSON.stringify(err));
				})
				let record :any = {};
				record['Name'] = openId;
				record['Age'] = 15;
				record['Address'] = authId;
				_this.crudService.create_NewStudent(record).then((resp :any)=> {
				
				})
				.catch((error:any) => {
					console.log(error);
				});
        });
      });

    
  }
  
    // document.addEventListener("JSBridgeReady", function(){
    //   JSBridge.call('paytmFetchAuthCode',{
    //     clientId:"2b8ec1ece1a54345b8a27ffcfecd84d2"},
    //     function(result:any) {
    //       var authId = result.data.authId;
    //       alert(authId)
    //       const url = "https://accounts.paytm.com/oauth2/v2/token"
    //       const data = {
    //           "grant_type": "authorization_code",
    //           "code": authId,
    //           "client_id": "2b8ec1ece1a54345b8a27ffcfecd84d2",
    //           "scope": "basic"
    //       };
    //       let formBody = [];
    //       let entries = Object.entries(data);
    //         for(const [prop, val] of entries) {
    //           var encodedKey = encodeURIComponent(prop);
    //           var encodedValue = encodeURIComponent(val);
    //             console.log(prop, val);
    //             formBody.push(encodedKey + "=" + encodedValue);
    //         }
    //         const requestBody = formBody.join("&");
		// 	var auth = window.btoa("2b8ec1ece1a54345b8a27ffcfecd84d2:T9JRxN8ckEluP11x0Jp5JVmuwiNDiJRn");
    //         const otherParams = {
    //           headers: {
    //               "Content-Type": 'application/x-www-form-urlencoded',
    //               // "Content-Type": 'x-www-form-urlencoded',
    //               "Authorization": 'Basic '+auth,
    //           },
    //           body: requestBody,
    //           method: "POST"
    //       };
    //       fetch(url, otherParams)
		//   .then((res) => {
		// 	  alert(JSON.stringify(res));
		// 	  res.json()
		// 	})
    //       .then((res) => {
		// 		alert(JSON.stringify(res));
		// 		console.log(res)
		//   	}
    //         )
    //         .catch((err) => {
		// 		console.log(err);
		// 		alert(JSON.stringify(err));
		// 	})
		// 	let record :any = {};
		// 	record['Name'] = 'Test';
		// 	record['Age'] = 15;
		// 	record['Address'] = authId;
		// 	_this.crudService.create_NewStudent(record).then((resp :any)=> {
			 
		// 	})
		// 	  .catch((error:any) => {
		// 		console.log(error);
		// 	  });
    //     });
    // },false);
    this.crudService.read_Students().subscribe((data:any) => {

      this.students = data.map((e:any) => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          Age: e.payload.doc.data()['Age'],
          Address: e.payload.doc.data()['Address'],
        };
      })
      console.log(this.students);

    });
  }

  CreateRecord() {
        var user = {
          name : "John",
          age  : 25
      }
      let entries = Object.entries(user);
      for(const [prop, val] of entries) {
          console.log(prop, val);
      }

    let record :any = {};
    record['Name'] = this.studentName;
    record['Age'] = this.studentAge;
    record['Address'] = this.studentAddress;
    this.crudService.create_NewStudent(record).then((resp :any)=> {
      this.studentName = "";
      this.studentAge = 0;
      this.studentAddress = "";
      console.log(resp);
    })
      .catch((error:any) => {
        console.log(error);
      });
  }

  RemoveRecord(rowID:any) {
    this.crudService.delete_Student(rowID);
  }

  EditRecord(record:any) {
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditAge = record.Age;
    record.EditAddress = record.Address;
  }

  UpdateRecord(recordRow:any) {
    let record:any = {};
    record['Name'] = recordRow.EditName;
    record['Age'] = recordRow.EditAge;
    record['Address'] = recordRow.EditAddress;
    this.crudService.update_Student(recordRow.id, record);
    recordRow.isEdit = false;
  }

}
