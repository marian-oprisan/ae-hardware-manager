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
    value = value.replace(/\W/g, '');
    this.clearState();
    this.refreshResults();
    if (value === '') {
      return;
    } else {
      for (let i = this.results.length - 1; i >= 0; i--) {
        this.counter = 0;
        const keys = Object.keys(this.results[i]);
        for (let j = 0; j < keys.length; j++) {
          if (keys[j].toLowerCase().replace(/\W/g, '').indexOf(value.toLowerCase()) >= 0) {
            this.counter++;
            continue;
          } else if (this.results[i][keys[j]].toLowerCase().replace(/\W/g, '').indexOf(value.toLowerCase()) >= 0) {
            this.counter++;
            if (this.results[i][keys[j]].toLowerCase().replace(/\W/g, '') === value.toLowerCase()) {
              this.results[i].badge = (keys[j]);
              this.counter++;
              continue;
            }
            continue;
          }
        }
        if (this.counter === 0) {
          this.results.splice(i, 1);
        }
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
    this.viewState = !this.viewState;
    this.machineToView = machine;
  }

  deleteMachine(event, machine: Machine) {
    if (confirm('Really remove ' + machine.make + ' ' + machine.model + '?')) {
      this.clearState();
      this.machineService.deleteMAchine(machine);
    }
  }
}
