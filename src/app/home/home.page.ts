import { CommonModule } from '@angular/common';
import { AlertController, ToastController, ActionSheetController } from '@ionic/angular';
import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tarefas: any[] = []; 

  constructor(private alertCtrl : AlertController, private toastCtrl: ToastController, 
    private actionSheetCtrl: ToastController){

      let tarefasJson = localStorage.getItem('tarefasDb');
      if(tarefasJson != null){
        this.tarefas = JSON.parse(tarefasJson); 
      }
  }

  async ExibeAdd(){
    const alert = await this.alertCtrl.create({
      header: "O que deseja fazer?", 
      inputs: [{
        name: 'tarefaToDo',
        type: 'text',
        placeholder: 'Insira uma tarefa aqui...'
      }],
      buttons : [{
        text: 'cancelar',
        role: 'cancel',
        cssClass: 'danger',
        handler: () => {
          console.log('Operação cancelada pelo usuário...'); 
        }
      }, 
        {
          text: 'Adicionar',
          handler: (form) => {
            console.log(form); 
            this.add(form.tarefaToDo); 
          } 
      }]
    }); 
    await alert.present(); 
  }

  async add(tarefaToDo : string){
    if (tarefaToDo.trim().length < 1){
      const toast = await this.toastCtrl.create({
        message: 'O campo tarefa não pode estar vazio...', 
        duration: 2000,
        position: 'top'
      });
      toast.present(); 
      return; 
    }
    let tarefa = {name: tarefaToDo, done: false}; 
    this.tarefas.push(tarefa); 
  }

  async abrirAcoes(tarefa : any){
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'O que deseja fazer?',
      buttons: [{
        text: tarefa.done ? 'Desmarcar' : 'Marcar',
        icon: tarefa.done ? 'radio-button-off' : 'checkmark-circle', 
        handler: ()=> {
          tarefa.done = !tarefa.done;
          this.updateLocalStorage(); 
        }
        },
        {
          text: "Cancelar",
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancelando ação...')
          }
      }]
    }); 
    await actionSheet.present(); 
  }

  updateLocalStorage(){
    localStorage.setItem('tarefaDb', JSON.stringify(this.tarefas));
  }

  apagar(tarefa : any){
    this.tarefas = this.tarefas.filter(tarefaArray => tarefa != tarefaArray);
    this.updateLocalStorage(); 
  }
}




