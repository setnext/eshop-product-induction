import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StepModel } from '../interfaces/steps';
import { ConfigService } from '../services/cofigServices/config.service';
import { FileUploadService } from '../services/MediaService/fileupload.service'; 
declare var window: any;
@Component({
  selector: 'app-product-media',
  templateUrl: './product-media.component.html',
  styleUrls: ['./product-media.component.css']
})
export class ProductMediaComponent implements OnInit {
SaveandContinue() {
this.step.isComplete=true;
}

  @Input()
  step!: StepModel;

  isLocalDataExist=false;

  formModal: any;
  currentImageModal?:string;


  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';
  loading=false;

  imageInfos?: any;
  imageSourceUrl:any;

  constructor(private uploadService: FileUploadService,private config:ConfigService) { 
    this.imageSourceUrl = config.config.imageSourceUrl;
    console.log(this.imageSourceUrl);
  }

  ngOnInit(): void {
    console.log("NGINIT Called");
   
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('quoteForm')
    );
    this.imageInfos = this.uploadService.getFiles();
    console.log("lenght is",this.imageInfos.length);

    if(this.imageInfos.length >0){
      this.isLocalDataExist=true;
    }

  }

  onCompleteStep() {
    this.step.isComplete = true;
  }

  

  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;
  
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
  
      if (file) {
        this.preview = '';
        this.currentFile = file;
        console.log("file is ",this.currentFile.name);
  
        const reader = new FileReader();
  
        reader.onload = (e: any) => {
          // console.log(e.target.result);
          this.preview = e.target.result;
        };
  
        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  upload(): void {
    this.progress = 0;
    this.loading = true;
  
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
  
      if (file) {
        this.currentFile = file;
  
        this.uploadService.upload(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.uploadService.saveUploadedFileName(this.currentFile?.name);
              this.imageInfos = this.uploadService.getFiles();
              this.loading = false;
              this.step.isComplete = true;
              console.log(this.imageInfos);
            }
          },
          error: (err: any) => {
            this.loading = false;
            console.log("error found while uploading",err);
            this.progress = 0;
  
            if (err.error && err.error.message) {
              this.message = err.error.message;
              
            } else {

              this.message = 'Could not upload the image!, Please check the file Size';
            }
  
            this.currentFile = undefined;
          },
        });
      }
  
      this.selectedFiles = undefined;
    }
  }

  openFormModal(imageName:string) {
    this.currentImageModal=imageName;
    this.formModal.show();
  }
  closeModal() {
    // confirm or save something
    this.formModal.hide();
  }
  clearData() {
    
    console.log("clear Data");
    this.uploadService.clearLocalData();
    this.isLocalDataExist=false;
    this.imageInfos=[];
    this.step.isComplete=false;
  }

}
