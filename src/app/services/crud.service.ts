import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private firestore: AngularFirestore
  ) { }


  create_NewStudent(record:any) {
    return this.firestore.collection('Students').add(record);
  }

  read_Students() {
    return this.firestore.collection('Students').snapshotChanges();
  }

  update_Student(recordID:any,record:any){
    this.firestore.doc('Students/' + recordID).update(record);
  }

  delete_Student(record_id:any) {
    this.firestore.doc('Students/' + record_id).delete();
  }
}





