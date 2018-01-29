import { Component, OnInit } from '@angular/core';
import { MachineService } from '../../services/machine.service';
import { Machine } from '../../models/machine';
import { ViewService } from '../../services/view.service';

@Component({
  selector: 'app-machine-list',
  templateUrl: './machine-list.component.html',
  styleUrls: ['./machine-list.component.css']
})
export class MachineListComponent implements OnInit {

  machines: Machine[];
  results: Machine[];

  title: string;
  search: boolean;
  add: boolean;
  counter: number;
  editState: boolean;
  viewState: boolean;
  machineToEdit: Machine;
  machineToView: Machine;

  constructor(private machineService: MachineService, public viewService: ViewService) {
  }

  ngOnInit() {
    this.machineService.getMachines().subscribe(machines => {
      this.machines = machines;
      this.results = machines;
    });
    this.search = true;
    this.title = '';
    this.counter = 0;
    this.editState = false;
    this.viewState = false;
  }

  onKey(value) {
    this.refreshResults();
    for (let i = 0; i < this.results.length; i++) {
      this.counter = 0;
      const keys = Object.keys(this.results[i]);
      for (let j = 0; j < keys.length; j++) {
        if (keys[j].toLowerCase().indexOf(value.toLowerCase()) > 0) {
          this.counter++;
        }
      }
      if (this.counter === 0) {
        this.results.splice(i, 1);
      }
    }
  }

  refreshResults() {
    this.results = [];
    for (let i = 0; i < this.machines.length; i++) {
      this.results.push(Object.assign({}, this.machines[i]));
    }
  }

  showSearch() {
    this.add = false;
    this.search = true;
    this.title = '';
  }

  showAdd() {
    this.search = false;
    this.add = true;
    this.title = '';
  }

  editMachine(event, machine: Machine) {
    this.clearState();
    this.editState = true;
    this.machineToEdit = machine;
  }

  updateMachine(machine: Machine) {
    this.machineService.updateMachine(machine);
    this.clearState();
  }

  clearState() {
    this.viewState = false;
    this.editState = false;
    this.machineToEdit = null;
  }

  viewStatus(event, machine) {
    this.clearState();
    this.viewState = !this.viewState;
    this.machineToView = machine;
  }
}
