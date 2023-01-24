import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalService } from '../storage/local.service';
import { ObjectType } from 'src/app/interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl = 'http://localhost:8082';
  uploadedFiles:any =[];

  constructor(private http: HttpClient, private localStorageService:LocalService) {}

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    
    formData.append('file', file);
    formData.append('fileName', file.name);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }
  clearLocalData(){

    this.localStorageService.removeData("uploadedFiles");
    this.uploadedFiles = [];
  }


  getFiles(){
    let data = this.localStorageService.getData("uploadedFiles",ObjectType.json,false);
    console.log("retrevied from local store",data);
    if(data ==null){
      this.uploadedFiles = [];
    }
    else
    {
    
    this.uploadedFiles = JSON.parse(data);
    }
    return this.uploadedFiles;
  }
  saveUploadedFileName(fileName?:string){
    this.uploadedFiles.push(fileName);

    this.localStorageService.saveData("uploadedFiles",JSON.stringify(this.uploadedFiles),ObjectType.json,false);

  }

}