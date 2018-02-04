import { Component, OnInit } from '@angular/core';
import { MachineService } from '../../services/machine.service';
import { Machine } from '../../models/machine';
import { ViewService } from '../../services/view.service';
import { NgClass } from '@angular/common';

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
  afClass: string;
  atClass: string;
  bwClass: string;
  clrClass: string;
  sizeFilter: string;
  colourFilter: string;

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
    this.afClass = 'btn-flat';
    this.atClass = 'btn-flat';
    this.bwClass = 'btn-flat';
    this.clrClass = 'btn-flat';
    this.sizeFilter = '';
    this.colourFilter = '';
  }

  setFilterSize(size) {
    if (size === 'A4') {
      this.afClass = 'btn';
      this.atClass = 'btn-flat';
    } else {
      this.atClass = 'btn';
      this.afClass = 'btn-flat';
    }

    if (this.sizeFilter === size) {
      this.sizeFilter = '';
      this.atClass = 'btn-flat';
      this.afClass = 'btn-flat';
    } else {
      this.sizeFilter = size;
    }

    this.filterSizeColour();
  }

  setFilterColour(colour) {
    if (colour === 'Colour') {
      this.clrClass = 'btn';
      this.bwClass = 'btn-flat';
    } else {
      this.bwClass = 'btn';
      this.clrClass = 'btn-flat';
    }

    if (this.colourFilter === colour) {
      this.colourFilter = '';
      this.bwClass = 'btn-flat';
      this.clrClass = 'btn-flat';
    } else {
      this.colourFilter = colour;
    }

    this.filterSizeColour();
  }

  filterSizeColour() {
    this.refreshResults();
    // alternate styling for buttons of same category
    if (this.sizeFilter !== '') {
      this.results = this.results.filter(result => result.size === this.sizeFilter);
    }

    if (this.colourFilter !== '') {
      this.results = this.results.filter(result => result.colour === this.colourFilter);
    }
  }

  filterMachinesColour(colour) {
    this.refreshResults();

    if (colour === 'Colour') {
      this.clrClass = 'btn';
      this.bwClass = 'btn-flat';
    } else {
      this.bwClass = 'btn';
      this.clrClass = 'btn-flat';
    }

    this.results = this.results.filter(result => result.colour === colour);
  }


  onKey(value) {
    value = value.replace(/\W/g, '');
    this.clearState();
    this.refreshResults();
    this.refreshFilters();
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

  refreshFilters () {
    this.afClass = 'btn-flat';
    this.atClass = 'btn-flat';
    this.bwClass = 'btn-flat';
    this.clrClass = 'btn-flat';
  }

  refreshResults() {
    this.results = [];
    for (let i = 0; i < this.machines.length; i++) {
      this.results.push(Object.assign({}, this.machines[i]));
    }
  }

  showSearch() {
    this.clearState();
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
